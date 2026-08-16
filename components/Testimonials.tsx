'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#121211] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-3 mb-6"
        >
          <Quote className="w-6 h-6 text-[#C49A6C]" />
          <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold">
            CLIENT EXPERIENCE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#FBF9F5] leading-relaxed max-w-4xl mx-auto font-light"
        >
          &ldquo;Architecture becomes truly meaningful when it turns daily routines into moments of quiet luxury. Square9 brought order, warmth, and structural elegance to our home.&rdquo;
        </motion.h2>

        <div className="mt-8 text-xs font-sans tracking-[0.2em] text-[#F4EFE6]/60 uppercase">
          RESIDENTIAL CLIENT • NAGPUR RESIDENCE
        </div>
      </div>
    </section>
  );
}
