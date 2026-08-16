'use client';

import { motion } from 'framer-motion';
import { detailItems } from '@/data/project';

export default function DetailGallery() {
  return (
    <section className="relative w-full py-28 md:py-40 bg-[#121211] text-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
              ARCHITECTURAL CURATION
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5]">
              THE DETAILS ARE <br />
              <span className="italic font-light text-[#F4EFE6]/80">THE DESIGN.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans tracking-widest text-[#F4EFE6]/50 max-w-xs mt-4 md:mt-0 uppercase">
            A close-up examination of proportion, texture, and joinery.
          </p>
        </div>

        {/* Asymmetrical Editorial Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {detailItems.slice(0, 8).map((item, idx) => {
            // Asymmetrical grid column spanning strategy for magazine look
            const colSpan =
              idx % 5 === 0
                ? 'md:col-span-8 h-[450px]'
                : idx % 5 === 1
                ? 'md:col-span-4 h-[450px]'
                : idx % 5 === 2
                ? 'md:col-span-4 h-[380px]'
                : idx % 5 === 3
                ? 'md:col-span-4 h-[380px]'
                : 'md:col-span-4 h-[380px]';

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (idx % 4) * 0.15 }}
                className={`relative group overflow-hidden rounded-sm bg-[#1C1C1A] ${colSpan}`}
                data-cursor="view"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C]/90 via-[#0E0D0C]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.25em] text-[#C49A6C] uppercase font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-serif text-[#FBF9F5] group-hover:text-[#C49A6C] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs font-sans tracking-widest text-[#F4EFE6]/40 group-hover:text-[#FBF9F5] transition-colors">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
