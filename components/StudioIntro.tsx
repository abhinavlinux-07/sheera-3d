'use client';

import { motion } from 'framer-motion';

export default function StudioIntro() {
  return (
    <section id="studio" className="relative w-full py-28 md:py-40 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 mb-8"
        >
          <div className="w-8 h-[1px] bg-[#C49A6C]" />
          <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold">
            THE PRACTICE
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FBF9F5] leading-tight mb-8">
              THE STUDIO <br />
              <span className="italic font-light text-[#F4EFE6]/80">BEHIND THE RESIDENCE</span>
            </h2>

            <p className="text-base md:text-lg font-sans tracking-wide text-[#F4EFE6]/70 leading-relaxed font-light mb-6">
              Square9 Designs is an established architecture and interior design studio committed to crafting original, unconventional, and sustainable spatial environments.
            </p>

            <p className="text-xs md:text-sm font-sans text-[#F4EFE6]/60 leading-relaxed font-light">
              Our work merges technical precision with creative exploration. In interiors, we emphasize order, coherence, practicality, and emotional harmony—creating environments that reflect the unique lifestyle and identity of every client.
            </p>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-5 bg-[#1C1C1A]/80 p-8 md:p-10 border border-[#F4EFE6]/10 rounded-sm space-y-6">
            <h3 className="text-xs font-sans tracking-[0.25em] text-[#C49A6C] font-semibold uppercase">
              STUDIO CORE POSITIONING
            </h3>

            <div className="space-y-4 text-xs md:text-sm font-sans text-[#F4EFE6]/80 divide-y divide-[#F4EFE6]/10">
              <div className="pt-3">
                <span className="font-semibold text-[#FBF9F5]">SUSTAINABLE RIGOR:</span> Cost-effective, ecologically conscious architectural solutions.
              </div>
              <div className="pt-3">
                <span className="font-semibold text-[#FBF9F5]">SPATIAL ORDER:</span> Coherence and structural clarity across every floor plan.
              </div>
              <div className="pt-3">
                <span className="font-semibold text-[#FBF9F5]">CHARACTER DRIVEN:</span> Tailored environments built around human habits.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
