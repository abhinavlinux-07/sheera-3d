'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studioInfo } from '@/data/studio';

export default function Portfolio() {
  const { portfolioCategories, portfolioProjects } = studioInfo;
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects =
    activeCategory === 'ALL'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative w-full py-28 md:py-40 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
              SELECTED WORKS
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5]">
              DISCOVER THE <br />
              <span className="italic font-light text-[#F4EFE6]/80">CHARM OF SPACES</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-sans tracking-[0.2em] uppercase transition-all rounded-sm ${
                  activeCategory === cat
                    ? 'bg-[#C49A6C] text-[#0E0D0C] font-semibold'
                    : 'bg-[#1C1C1A] text-[#F4EFE6]/60 hover:text-[#FBF9F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((prj) => (
              <motion.div
                key={prj.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative bg-[#1C1C1A] rounded-sm overflow-hidden border border-[#F4EFE6]/10"
                data-cursor="view"
              >
                <div className="h-[360px] w-full overflow-hidden">
                  <img
                    src={prj.image}
                    alt={prj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 bg-[#121211] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[#C49A6C] uppercase font-semibold block mb-1">
                      {prj.category} • {prj.location}
                    </span>
                    <h3 className="text-xl font-serif text-[#FBF9F5] group-hover:text-[#C49A6C] transition-colors">
                      {prj.title}
                    </h3>
                  </div>
                  <span className="text-xs font-sans tracking-widest text-[#F4EFE6]/40">
                    {prj.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
