'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { materialCategories } from '@/data/project';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Materials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextMaterial = () => {
    setActiveIndex((prev) => (prev + 1) % materialCategories.length);
  };

  const prevMaterial = () => {
    setActiveIndex((prev) => (prev - 1 + materialCategories.length) % materialCategories.length);
  };

  const activeMaterial = materialCategories[activeIndex];

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0E0D0C] text-[#FBF9F5] overflow-hidden border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
              TACTILE EXPRESSION
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5]">
              THE MATERIAL <br />
              <span className="italic font-light text-[#F4EFE6]/80">STORY</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <button
              onClick={prevMaterial}
              className="p-3 border border-[#F4EFE6]/20 text-[#FBF9F5] hover:border-[#C49A6C] hover:text-[#C49A6C] transition-colors rounded-sm"
              aria-label="Previous Material"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-sans tracking-widest text-[#F4EFE6]/50">
              0{activeIndex + 1} / 0{materialCategories.length}
            </span>
            <button
              onClick={nextMaterial}
              className="p-3 border border-[#F4EFE6]/20 text-[#FBF9F5] hover:border-[#C49A6C] hover:text-[#C49A6C] transition-colors rounded-sm"
              aria-label="Next Material"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Active Material Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Image Showcase */}
          <div className="lg:col-span-7 relative h-[380px] md:h-[500px] w-full overflow-hidden rounded-sm bg-[#1C1C1A]" data-cursor="view">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeMaterial.id}
                src={activeMaterial.image}
                alt={activeMaterial.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-xs font-sans tracking-[0.25em] text-[#C49A6C] font-semibold uppercase">
              CROP FROM RESIDENCE FRAME
            </div>
          </div>

          {/* Text Description & Material Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] font-bold">
                  CATEGORY 0{activeIndex + 1}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-[#FBF9F5]">
                  {activeMaterial.name}
                </h3>
                <p className="text-sm font-sans text-[#F4EFE6]/70 leading-relaxed font-light">
                  {activeMaterial.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Category Quick Selector Tabs */}
            <div className="pt-6 border-t border-[#F4EFE6]/10 grid grid-cols-5 gap-2">
              {materialCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`py-2 text-[10px] font-sans tracking-widest text-center transition-all border-b-2 ${
                    idx === activeIndex
                      ? 'border-[#C49A6C] text-[#FBF9F5] font-semibold'
                      : 'border-transparent text-[#F4EFE6]/40 hover:text-[#F4EFE6]/80'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
