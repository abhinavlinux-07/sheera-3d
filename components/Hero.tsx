'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  scrollProgress: number;
}

export default function Hero({ scrollProgress }: HeroProps) {
  // Fade out hero content within the first 3% of global scroll
  const opacity = Math.max(0, 1 - scrollProgress * 30);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-16 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top Metadata */}
      <div className="pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
          <span className="text-[11px] font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold">
            SQUARE9 DESIGNS
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xs font-sans tracking-[0.2em] text-[#F4EFE6]/60 mt-1 uppercase"
        >
          RESIDENTIAL ARCHITECTURE + INTERIOR DESIGN
        </motion.p>
      </div>

      {/* Hero Headline */}
      <div className="max-w-3xl my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl lg:text-8xl font-serif text-[#FBF9F5] leading-[1.05] tracking-tight"
        >
          A HOME, <br />
          <span className="italic font-light text-[#F4EFE6]/90">DESIGNED WITH INTENT.</span>
        </motion.h1>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="pb-4 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-sans tracking-[0.25em] text-[#F4EFE6]/50 uppercase">
            CHAPTER 01 / ARCHITECTURAL WALKTHROUGH
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs font-sans tracking-[0.2em] text-[#C49A6C] animate-bounce">
          <span>SCROLL TO ENTER</span>
          <span>↓</span>
        </div>
      </motion.div>
    </div>
  );
}
