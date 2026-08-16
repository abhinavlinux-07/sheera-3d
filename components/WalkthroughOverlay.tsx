'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { walkthroughSections } from '@/data/project';

interface WalkthroughOverlayProps {
  currentChapterIndex: number;
  chapterProgress: number; // 0.0 to 1.0 inside current chapter
  globalProgress: number;  // 0.0 to 1.0 global scroll progress
}

export default function WalkthroughOverlay({
  currentChapterIndex,
  chapterProgress,
  globalProgress
}: WalkthroughOverlayProps) {
  // Hide overlay during Hero state (first 3% of global scroll)
  if (globalProgress < 0.03) return null;

  const currentChapter = walkthroughSections[currentChapterIndex] || walkthroughSections[0];

  // Calculate dynamic sub-text for Chapter 03 (Living / Lounge / Bedroom)
  let activeSubPhaseText = '';
  if (currentChapter.id === 'living' && currentChapter.subPhases) {
    const sub = currentChapter.subPhases.find(
      (sp) => chapterProgress >= sp.minProgress && chapterProgress <= sp.maxProgress
    );
    if (sub) {
      activeSubPhaseText = sub.text;
    }
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-16 flex flex-col justify-between">
      {/* Top Architectural Annotation Grid */}
      <div className="flex items-center justify-between text-[10px] font-sans tracking-[0.25em] text-[#F4EFE6]/40 uppercase">
        <div className="flex items-center space-x-3">
          <span className="text-[#C49A6C] font-semibold">SECTION {currentChapter.number}</span>
          <span>/</span>
          <span>{currentChapter.metadata}</span>
        </div>
        <div className="hidden sm:block">
          <span>COORDINATES: 21.1458° N, 79.0882° E</span>
        </div>
      </div>

      {/* Main Chapter Text Overlay (Positioned in negative space, bottom-left) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentChapter.id}-${activeSubPhaseText}`}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl pb-12 md:pb-16"
        >
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] font-bold">
              {currentChapter.title}
            </span>
            {activeSubPhaseText && (
              <>
                <span className="text-[#F4EFE6]/30">•</span>
                <span className="text-xs font-sans tracking-[0.2em] text-[#F4EFE6]/80 font-medium">
                  {activeSubPhaseText}
                </span>
              </>
            )}
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5] leading-tight mb-4">
            {currentChapter.primaryCopy}
          </h2>

          <p className="text-xs md:text-sm font-sans tracking-wide text-[#F4EFE6]/70 leading-relaxed max-w-md">
            {currentChapter.secondaryCopy}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
