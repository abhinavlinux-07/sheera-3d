'use client';

import { motion } from 'framer-motion';
import { designPrinciples } from '@/data/project';

export default function DesignPhilosophy() {
  const images = [
    '/images/details/entrance_door.jpg',
    '/images/details/coral_curtains.jpg',
    '/images/details/living_chandelier.jpg',
    '/images/details/four_poster_bed.jpg',
  ];

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#121211] text-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-[#F4EFE6]/10">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5]">
              THE THINKING <br />
              <span className="italic font-light text-[#F4EFE6]/80">BEHIND THE SPACE</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans tracking-widest text-[#F4EFE6]/50 max-w-xs mt-4 md:mt-0 uppercase">
            Four foundational pillars guiding every spatial decision.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {designPrinciples.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group flex flex-col justify-between p-8 bg-[#1C1C1A]/60 border border-[#F4EFE6]/5 hover:border-[#C49A6C]/40 transition-all duration-500 rounded-sm"
              data-cursor="view"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif text-[#C49A6C]">{item.number}</span>
                  <div className="w-12 h-16 overflow-hidden rounded-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    <img
                      src={images[idx]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-sans tracking-[0.15em] text-[#FBF9F5] font-semibold mb-3">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs font-sans text-[#F4EFE6]/60 leading-relaxed font-light mt-4">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
