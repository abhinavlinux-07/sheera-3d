'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROJECT', href: '#project' },
    { label: 'STUDIO', href: '#studio' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0E0D0C]/85 backdrop-blur-md border-b border-[#F4EFE6]/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Studio Brand */}
          <Link
            href="#"
            className="flex flex-col group cursor-pointer"
            data-cursor="explore"
          >
            <span className="text-sm font-sans tracking-[0.25em] font-semibold text-[#FBF9F5] group-hover:text-[#C49A6C] transition-colors">
              SQUARE9 DESIGNS
            </span>
            <span className="text-[9px] tracking-widest text-[#F4EFE6]/50 uppercase font-sans mt-0.5">
              Architecture + Interior
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-sans tracking-[0.2em] text-[#F4EFE6]/70 hover:text-[#FBF9F5] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C49A6C] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              data-cursor="explore"
              className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.15em] px-5 py-2.5 border border-[#C49A6C]/50 text-[#FBF9F5] hover:bg-[#C49A6C] hover:text-[#0E0D0C] transition-all duration-300 rounded-sm"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FBF9F5] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0E0D0C] z-30 flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 + 0.1 }}
                  className="text-2xl font-serif tracking-wider text-[#FBF9F5] hover:text-[#C49A6C] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-[#F4EFE6]/10 flex flex-col space-y-4">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 bg-[#C49A6C] text-[#0E0D0C] font-sans text-xs tracking-[0.2em] font-semibold"
              >
                START A PROJECT
              </a>
              <div className="text-[10px] tracking-widest text-[#F4EFE6]/40 text-center font-sans">
                SQUARE9 DESIGNS © NAGPUR, INDIA
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
