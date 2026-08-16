'use client';

import { motion } from 'framer-motion';
import { studioInfo } from '@/data/studio';

export default function SheraSection() {
  const { founder } = studioInfo;

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#121211] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Portrait Graphics Card */}
          <div className="lg:col-span-5 relative" data-cursor="view">
            <div className="relative h-[480px] md:h-[580px] w-full rounded-sm overflow-hidden bg-[#1C1C1A] border border-[#F4EFE6]/10">
              <img
                src="/images/details/four_poster_bed.jpg"
                alt="Square9 Design Studio Ambience"
                className="w-full h-full object-cover grayscale contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#C49A6C] uppercase font-semibold block mb-2">
                  DIRECTOR & INTERIOR ARCHITECT
                </span>
                <h3 className="text-3xl font-serif text-[#FBF9F5]">{founder.name}</h3>
                <p className="text-xs font-sans tracking-widest text-[#F4EFE6]/60 mt-1 uppercase">
                  SQUARE9 DESIGNS
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
                LEADERSHIP INTENT
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5] leading-tight">
                DESIGNING WITH <br />
                <span className="italic font-light text-[#F4EFE6]/80">INTENT & RIGOR</span>
              </h2>
            </motion.div>

            <p className="text-base font-sans text-[#F4EFE6]/70 leading-relaxed font-light">
              {founder.bio}
            </p>

            {/* Three Pillars */}
            <div className="pt-6 border-t border-[#F4EFE6]/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {founder.pillars.map((pillar, idx) => (
                <div key={pillar} className="space-y-1">
                  <span className="text-xs font-sans tracking-widest text-[#C49A6C] font-semibold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-sans tracking-wider text-[#FBF9F5] font-semibold uppercase">
                    {pillar}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
