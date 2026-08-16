'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative w-full py-36 md:py-52 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10 overflow-hidden">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-radial from-[#C49A6C]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
          <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold">
            START YOUR JOURNEY
          </span>
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl lg:text-8xl font-serif text-[#FBF9F5] leading-tight mb-8"
        >
          LET&apos;S CREATE A SPACE <br />
          <span className="italic font-light text-[#C49A6C]">THAT FEELS LIKE YOU.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-xl font-sans tracking-wide text-[#F4EFE6]/70 max-w-2xl mx-auto mb-12 font-light"
        >
          Architecture and interiors shaped around the people who inhabit them.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#contact"
            data-cursor="explore"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#C49A6C] text-[#0E0D0C] font-sans text-xs tracking-[0.2em] font-semibold hover:bg-[#FBF9F5] transition-colors rounded-sm"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[#F4EFE6]/20 text-[#FBF9F5] font-sans text-xs tracking-[0.2em] font-medium hover:border-[#C49A6C] hover:text-[#C49A6C] transition-colors rounded-sm"
          >
            EXPLORE OUR WORK
          </a>
        </motion.div>
      </div>
    </section>
  );
}
