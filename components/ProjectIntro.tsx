'use client';

import { motion } from 'framer-motion';

export default function ProjectIntro() {
  return (
    <section className="relative w-full py-32 md:py-48 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Subtle Architectural Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-3 mb-8"
        >
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
          <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold">
            PROJECT ESSENCE
          </span>
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-6xl lg:text-7xl font-serif text-[#FBF9F5] leading-tight mb-8"
        >
          A HOME IS MORE THAN <br />
          <span className="italic font-light text-[#F4EFE6]/80">A STRUCTURE.</span>
        </motion.h2>

        {/* Narrative Body */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-xl font-sans tracking-wide text-[#F4EFE6]/70 leading-relaxed max-w-3xl mx-auto font-light"
        >
          It is a collection of spaces, materials, light and moments designed around the way people live. Every room transitions with intention, balancing structural character with intimate comfort.
        </motion.p>
      </div>
    </section>
  );
}
