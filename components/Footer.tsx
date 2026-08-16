'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-[#0E0D0C] text-[#FBF9F5] border-t border-[#F4EFE6]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start space-y-1">
          <span className="text-sm font-sans tracking-[0.25em] font-semibold text-[#FBF9F5]">
            SQUARE9 DESIGNS
          </span>
          <span className="text-[10px] tracking-widest text-[#F4EFE6]/50 uppercase font-sans">
            Residential Architecture & Interior Design • Nagpur, MH
          </span>
        </div>

        <div className="flex items-center space-x-8 text-xs font-sans tracking-widest text-[#F4EFE6]/60">
          <a href="#project" className="hover:text-[#C49A6C] transition-colors">PROJECT</a>
          <a href="#studio" className="hover:text-[#C49A6C] transition-colors">STUDIO</a>
          <a href="#services" className="hover:text-[#C49A6C] transition-colors">SERVICES</a>
          <a href="#portfolio" className="hover:text-[#C49A6C] transition-colors">PORTFOLIO</a>
          <a href="#contact" className="hover:text-[#C49A6C] transition-colors">CONTACT</a>
        </div>

        <div className="text-[10px] font-sans tracking-widest text-[#F4EFE6]/40 text-center md:text-right">
          © {new Date().getFullYear()} SQUARE9 DESIGNS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
