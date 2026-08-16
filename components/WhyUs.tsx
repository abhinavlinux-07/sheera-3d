'use client';

import { motion } from 'framer-motion';
import { studioInfo } from '@/data/studio';

export default function WhyUs() {
  const { whyUs } = studioInfo;

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
              COMMITMENT TO QUALITY
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5]">
              WHY SQUARE9
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans tracking-widest text-[#F4EFE6]/50 max-w-xs mt-4 md:mt-0 uppercase">
            Quantifiable assurances backing structural and execution excellence.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="p-8 bg-[#1C1C1A]/40 border border-[#F4EFE6]/10 hover:border-[#C49A6C]/50 transition-all duration-300 rounded-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl md:text-5xl font-serif text-[#C49A6C] font-semibold block mb-4">
                  {item.value}
                </span>
                <h3 className="text-sm font-sans tracking-[0.15em] text-[#FBF9F5] font-semibold mb-2 uppercase">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs font-sans text-[#F4EFE6]/60 leading-relaxed font-light mt-4">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
