'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { walkthroughSections } from '@/data/project';
import Hero from './Hero';
import WalkthroughOverlay from './WalkthroughOverlay';
import WalkthroughNavigation from './WalkthroughNavigation';

export default function ArchitecturalWalkthrough() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [globalProgress, setGlobalProgress] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [isLoadedInitial, setIsLoadedInitial] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);

  // In-memory HTMLImageElement cache and active in-flight promises
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const inFlightRef = useRef<Map<string, Promise<HTMLImageElement>>>(new Map());
  const lastRenderedImgRef = useRef<HTMLImageElement | null>(null);
  const activeFrameRef = useRef<{ chapterIdx: number; frameIdx: number }>({ chapterIdx: 0, frameIdx: 0 });
  const currentChapterIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Helper to format frame filename e.g. /walkthrough/01-arrival/001.jpg
  const getFramePath = useCallback((chapterPath: string, frameNumber: number) => {
    const padded = String(frameNumber).padStart(3, '0');
    return `${chapterPath}/${padded}.jpg`;
  }, []);

  // Ref to hold current draw function for async image onload callback
  const drawCurrentFrameRef = useRef<() => void>(() => {});

  // Robust image loader with fetchPriority support & automatic redraw
  const loadSingleFrame = useCallback(
    (path: string, priority: 'high' | 'auto' | 'low' = 'auto'): Promise<HTMLImageElement> => {
      // 1. Return immediately if cached
      if (imageCacheRef.current.has(path)) {
        return Promise.resolve(imageCacheRef.current.get(path)!);
      }

      // 2. Return in-flight request if loading
      if (inFlightRef.current.has(path)) {
        return inFlightRef.current.get(path)!;
      }

      // 3. Initiate new image request
      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        if ('fetchPriority' in img) {
          (img as any).fetchPriority = priority;
        }
        img.src = path;
        img.onload = () => {
          imageCacheRef.current.set(path, img);
          inFlightRef.current.delete(path);
          if (drawCurrentFrameRef.current) {
            drawCurrentFrameRef.current();
          }
          resolve(img);
        };
        img.onerror = (err) => {
          inFlightRef.current.delete(path);
          reject(err);
        };
      });

      inFlightRef.current.set(path, promise);
      return promise;
    },
    []
  );

  // High performance Canvas Renderer
  const renderFrameOnCanvas = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      if (!img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const naturalW = img.naturalWidth || 1280;
      const naturalH = img.naturalHeight || 720;
      const imgAspect = naturalW / naturalH;
      const canvasAspect = width / height;

      let drawW: number;
      let drawH: number;

      if (canvasAspect > imgAspect) {
        drawW = width;
        drawH = width / imgAspect;
      } else {
        drawH = height;
        drawW = height * imgAspect;
      }

      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();

      lastRenderedImgRef.current = img;
    },
    []
  );

  // Chapter-Aware Frame Resolver & Canvas Renderer
  const drawCurrentFrame = useCallback(() => {
    const { chapterIdx, frameIdx } = activeFrameRef.current;
    const currentSec = walkthroughSections[chapterIdx];
    if (!currentSec) return;

    const frameNum = Math.max(1, Math.min(currentSec.frameCount, frameIdx + 1));
    const targetPath = getFramePath(currentSec.path, frameNum);

    let imgToDraw = imageCacheRef.current.get(targetPath);

    if (!imgToDraw) {
      // Trigger eager high-priority load for target frame
      loadSingleFrame(targetPath, 'high').catch(() => {});

      // Preload immediate surrounding frames in direction of scroll
      for (let offset = 1; offset <= 6; offset++) {
        const ahead = Math.min(currentSec.frameCount, frameNum + offset);
        const aheadPath = getFramePath(currentSec.path, ahead);
        if (!imageCacheRef.current.has(aheadPath)) {
          loadSingleFrame(aheadPath, 'high').catch(() => {});
        }
        const behind = Math.max(1, frameNum - offset);
        const behindPath = getFramePath(currentSec.path, behind);
        if (!imageCacheRef.current.has(behindPath)) {
          loadSingleFrame(behindPath, 'auto').catch(() => {});
        }
      }

      // Find CLOSEST loaded frame in current chapter
      let minDistance = Infinity;
      for (let f = 1; f <= currentSec.frameCount; f++) {
        const p = getFramePath(currentSec.path, f);
        if (imageCacheRef.current.has(p)) {
          const dist = Math.abs(f - frameNum);
          if (dist < minDistance) {
            minDistance = dist;
            imgToDraw = imageCacheRef.current.get(p);
          }
        }
      }

      // Fallback to Frame 001 of current chapter
      if (!imgToDraw) {
        const firstFramePath = getFramePath(currentSec.path, 1);
        imgToDraw = imageCacheRef.current.get(firstFramePath);
      }

      // Fallback to Frame 001 of ANY loaded chapter
      if (!imgToDraw) {
        for (const sec of walkthroughSections) {
          const secAnchorPath = getFramePath(sec.path, 1);
          if (imageCacheRef.current.has(secAnchorPath)) {
            imgToDraw = imageCacheRef.current.get(secAnchorPath);
            break;
          }
        }
      }
    }

    const finalImg = imgToDraw || lastRenderedImgRef.current;
    if (finalImg) {
      renderFrameOnCanvas(finalImg);
    }
  }, [getFramePath, loadSingleFrame, renderFrameOnCanvas]);

  useEffect(() => {
    drawCurrentFrameRef.current = drawCurrentFrame;
  }, [drawCurrentFrame]);

  // Priority Preloader & Uniform Keyframe Pipeline
  useEffect(() => {
    let isMounted = true;

    async function startPreloadPipeline() {
      // Step 1: Preload Frame 001 for ALL 5 chapters with HIGH priority
      const anchorPaths = walkthroughSections.map((sec) => getFramePath(sec.path, 1));
      let loadedAnchors = 0;

      await Promise.all(
        anchorPaths.map(async (path) => {
          try {
            await loadSingleFrame(path, 'high');
            loadedAnchors++;
            if (isMounted) {
              setLoadingPercent(Math.round((loadedAnchors / anchorPaths.length) * 50));
            }
          } catch (e) {
            console.warn('Anchor load error:', path);
          }
        })
      );

      // Force initial render of Chapter 1 anchor frame immediately
      drawCurrentFrame();

      if (isMounted) {
        setIsLoadedInitial(true);
        setLoadingPercent(100);
      }

      // Step 2: Interleaved Keyframe Preloading across ALL chapters (every 10th frame first, then 5th, then 2nd)
      // Interleaving ensures EVERY chapter has distributed keyframes ready immediately!
      const keyframeSteps = [10, 5, 2];
      for (const step of keyframeSteps) {
        for (let secIdx = 0; secIdx < walkthroughSections.length; secIdx++) {
          if (!isMounted) return;
          const sec = walkthroughSections[secIdx];
          const isCurrentSec = secIdx === currentChapterIndexRef.current;

          for (let f = 1; f <= sec.frameCount; f += step) {
            if (!isMounted) return;
            const path = getFramePath(sec.path, f);
            if (!imageCacheRef.current.has(path)) {
              loadSingleFrame(path, isCurrentSec ? 'high' : 'auto').catch(() => {});
            }
          }
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      // Step 3: Complete remaining frame buffer in background
      for (let secIdx = 0; secIdx < walkthroughSections.length; secIdx++) {
        const sec = walkthroughSections[secIdx];
        for (let frameNum = 1; frameNum <= sec.frameCount; frameNum++) {
          if (!isMounted) return;
          const path = getFramePath(sec.path, frameNum);
          if (!imageCacheRef.current.has(path)) {
            loadSingleFrame(path, 'low').catch(() => {});
            if (frameNum % 15 === 0) {
              await new Promise((r) => setTimeout(r, 10));
            }
          }
        }
      }
    }

    startPreloadPipeline();

    return () => {
      isMounted = false;
    };
  }, [getFramePath, loadSingleFrame, drawCurrentFrame]);

  // On Active Chapter Change, High-Priority Fetch for Active & Adjacent Chapters
  useEffect(() => {
    currentChapterIndexRef.current = currentChapterIndex;
    const sec = walkthroughSections[currentChapterIndex];
    if (!sec) return;

    // Immediately high-priority load keyframes for active chapter
    for (let i = 1; i <= sec.frameCount; i += 2) {
      const path = getFramePath(sec.path, i);
      if (!imageCacheRef.current.has(path)) {
        loadSingleFrame(path, 'high').catch(() => {});
      }
    }

    // High-priority load keyframes for next chapter
    const nextSec = walkthroughSections[currentChapterIndex + 1];
    if (nextSec) {
      for (let i = 1; i <= nextSec.frameCount; i += 4) {
        const path = getFramePath(nextSec.path, i);
        if (!imageCacheRef.current.has(path)) {
          loadSingleFrame(path, 'high').catch(() => {});
        }
      }
    }

    // High-priority load keyframes for previous chapter
    const prevSec = walkthroughSections[currentChapterIndex - 1];
    if (prevSec) {
      for (let i = 1; i <= prevSec.frameCount; i += 4) {
        const path = getFramePath(prevSec.path, i);
        if (!imageCacheRef.current.has(path)) {
          loadSingleFrame(path, 'auto').catch(() => {});
        }
      }
    }

    // Trigger immediate canvas redraw for chapter change
    drawCurrentFrame();
  }, [currentChapterIndex, getFramePath, loadSingleFrame, drawCurrentFrame]);

  // Handle Scroll Progress & Sync Active Frame
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollableHeight = rect.height - window.innerHeight;

    if (totalScrollableHeight <= 0) return;

    const currentScrollY = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScrollY / totalScrollableHeight));

    setGlobalProgress(progress);

    // 5 chapters mapping: 0.00-0.20, 0.20-0.40, 0.40-0.60, 0.60-0.80, 0.80-1.00
    const numChapters = walkthroughSections.length;
    const chapterPortion = 1 / numChapters;

    let rawChapterIdx = Math.floor(progress / chapterPortion);
    if (rawChapterIdx >= numChapters) rawChapterIdx = numChapters - 1;

    const cStart = rawChapterIdx * chapterPortion;
    const cProgress = Math.max(0, Math.min(1, (progress - cStart) / chapterPortion));

    setCurrentChapterIndex(rawChapterIdx);
    setChapterProgress(cProgress);

    const chapterObj = walkthroughSections[rawChapterIdx];
    const computedFrameIdx = Math.floor(cProgress * (chapterObj.frameCount - 1));

    activeFrameRef.current = {
      chapterIdx: rawChapterIdx,
      frameIdx: Math.max(0, Math.min(chapterObj.frameCount - 1, computedFrameIdx)),
    };

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(drawCurrentFrame);
  }, [drawCurrentFrame]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', drawCurrentFrame);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', drawCurrentFrame);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll, drawCurrentFrame]);

  // Direct Chapter Jump Handler for Side Navigation
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollableHeight = rect.height - window.innerHeight;

    const targetProgress = index / walkthroughSections.length + 0.01;
    const targetScrollY = containerTop + targetProgress * totalScrollableHeight;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section
      id="project"
      ref={containerRef}
      className="relative w-full bg-[#0E0D0C]"
      style={{ height: '500vh' }}
    >
      {/* Sticky Full-Bleed Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10 bg-[#0E0D0C]">
        {/* Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block select-none pointer-events-none"
        />

        {/* Initial Loading Overlay */}
        {!isLoadedInitial && (
          <div className="absolute inset-0 z-40 bg-[#0E0D0C] flex flex-col items-center justify-center p-6">
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] font-semibold mb-4 uppercase">
              SQUARE9 DESIGNS
            </span>
            <div className="w-48 h-[1px] bg-[#F4EFE6]/10 overflow-hidden mb-3">
              <div
                className="h-full bg-[#C49A6C] transition-all duration-300"
                style={{ width: `${loadingPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-sans tracking-widest text-[#F4EFE6]/50">
              PRELOADING ARCHITECTURAL EXPERIENCE {loadingPercent}%
            </span>
          </div>
        )}

        {/* Minimal Hero (Over Frame 001) */}
        <Hero scrollProgress={globalProgress} />

        {/* Dynamic Architectural Overlay */}
        <WalkthroughOverlay
          currentChapterIndex={currentChapterIndex}
          chapterProgress={chapterProgress}
          globalProgress={globalProgress}
        />

        {/* Walkthrough Navigation */}
        <WalkthroughNavigation
          currentChapterIndex={currentChapterIndex}
          globalProgress={globalProgress}
          onSelectChapter={scrollToChapter}
        />
      </div>
    </section>
  );
}
