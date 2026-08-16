'use client';

import { motion } from 'framer-motion';

export default function StudioHistory() {
  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
          <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold">
            ESTABLISHED HERITAGE
          </span>
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
        </motion.div>

        {/* Large Architectural 1995 Display */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[140px] lg:text-[180px] font-serif text-[#FBF9F5] leading-none tracking-tighter my-4 select-none opacity-95"
        >
          1995
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-xl font-sans tracking-[0.15em] text-[#F4EFE6]/70 uppercase font-light max-w-xl mx-auto"
        >
          Three decades of evolving architecture, interiors and design execution.
        </motion.p>
      </div>
    </section>
  );
}
