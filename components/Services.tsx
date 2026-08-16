'use client';

import { motion } from 'framer-motion';
import { studioInfo } from '@/data/studio';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  const { services } = studioInfo;

  return (
    <section id="services" className="relative w-full py-28 md:py-40 bg-[#121211] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] text-[#C49A6C] uppercase font-semibold block mb-3">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FBF9F5]">
              DISCIPLINES & <br />
              <span className="italic font-light text-[#F4EFE6]/80">SERVICES</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans tracking-widest text-[#F4EFE6]/50 max-w-xs mt-4 md:mt-0 uppercase">
            Comprehensive architectural and spatial delivery.
          </p>
        </div>

        {/* 4 Full-Width Editorial Service Panels */}
        <div className="space-y-12">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative bg-[#1C1C1A]/60 border border-[#F4EFE6]/10 hover:border-[#C49A6C]/50 transition-all duration-500 p-8 md:p-12 rounded-sm overflow-hidden"
              data-cursor="explore"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Number & Service Name */}
                <div className="lg:col-span-5 flex items-baseline space-x-6">
                  <span className="text-3xl md:text-5xl font-serif text-[#C49A6C]">
                    {srv.number}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-serif text-[#FBF9F5] group-hover:text-[#C49A6C] transition-colors">
                    {srv.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <p className="text-xs md:text-sm font-sans text-[#F4EFE6]/70 leading-relaxed font-light">
                    {srv.description}
                  </p>
                </div>

                {/* Thumbnail & Arrow Action */}
                <div className="lg:col-span-3 flex items-center justify-between lg:justify-end space-x-6">
                  <div className="w-24 h-16 overflow-hidden rounded-sm hidden sm:block">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-[#F4EFE6]/20 flex items-center justify-center text-[#FBF9F5] group-hover:bg-[#C49A6C] group-hover:border-[#C49A6C] group-hover:text-[#0E0D0C] transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
