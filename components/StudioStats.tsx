'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { studioInfo } from '@/data/studio';

function CounterNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StudioStats() {
  const { stats } = studioInfo;

  return (
    <section className="relative w-full py-28 md:py-36 bg-[#121211] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#F4EFE6]/10">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-2">
              SQUARE9 DESIGNS / STUDIO SCALE
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#FBF9F5]">
              MEASURED IN IMPACT & RIGOR
            </h2>
          </div>
          <span className="text-[10px] font-sans tracking-widest text-[#F4EFE6]/40 uppercase mt-2 md:mt-0">
            VERIFIED STUDIO TRACK RECORD
          </span>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="p-8 bg-[#1C1C1A]/50 border border-[#F4EFE6]/5 hover:border-[#C49A6C]/30 transition-colors rounded-sm"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl text-[#C49A6C] mb-4">
                <CounterNumber value={st.value} suffix={st.suffix} />
              </div>
              <p className="text-xs font-sans tracking-[0.2em] text-[#FBF9F5] font-semibold uppercase">
                {st.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
