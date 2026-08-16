'use client';

import { motion } from 'framer-motion';
import { walkthroughSections } from '@/data/project';

interface WalkthroughNavigationProps {
  currentChapterIndex: number;
  globalProgress: number;
  onSelectChapter: (index: number) => void;
}

export default function WalkthroughNavigation({
  currentChapterIndex,
  globalProgress,
  onSelectChapter,
}: WalkthroughNavigationProps) {
  // Hide indicator when past walkthrough section
  if (globalProgress > 0.98) return null;

  const currentChapter = walkthroughSections[currentChapterIndex] || walkthroughSections[0];

  return (
    <>
      {/* Desktop Right-Side Minimalist Chapter Navigator */}
      <div className="hidden lg:flex fixed right-12 top-1/2 -translate-y-1/2 z-30 flex-col items-end space-y-6 pointer-events-auto">
        {walkthroughSections.map((sec, index) => {
          const isActive = index === currentChapterIndex;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectChapter(index)}
              className="group flex items-center space-x-4 cursor-pointer focus:outline-none"
              data-cursor="explore"
            >
              <span
                className={`text-[10px] font-sans tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#C49A6C] opacity-100 translate-x-0 font-bold'
                    : 'text-[#F4EFE6]/40 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {sec.title}
              </span>
              <span
                className={`text-xs font-sans tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-[#FBF9F5] font-semibold' : 'text-[#F4EFE6]/30 group-hover:text-[#F4EFE6]/70'
                }`}
              >
                {sec.number}
              </span>
              <motion.div
                className="h-[1px] bg-[#C49A6C]"
                animate={{
                  width: isActive ? 32 : 12,
                  opacity: isActive ? 1 : 0.25,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile Bottom Chapter Progress Indicator */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-30 pointer-events-none flex flex-col space-y-2">
        <div className="flex items-center justify-between text-[11px] font-sans tracking-[0.2em] text-[#FBF9F5]">
          <div className="flex items-center space-x-2">
            <span className="text-[#C49A6C] font-semibold">{currentChapter.number}</span>
            <span className="text-[#F4EFE6]/40">—</span>
            <span className="font-medium text-[#FBF9F5]">{currentChapter.title}</span>
          </div>
          <span className="text-[10px] text-[#F4EFE6]/50">
            {Math.round(globalProgress * 100)}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-[#F4EFE6]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C49A6C]"
            style={{ width: `${Math.min(100, Math.max(0, globalProgress * 100))}%` }}
          />
        </div>
      </div>
    </>
  );
}
