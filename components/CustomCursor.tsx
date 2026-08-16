'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch screens or small viewports
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Target hover detection
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        const type = interactiveEl.getAttribute('data-cursor');
        setIsHovered(true);
        if (type === 'view') setCursorText('VIEW');
        else if (type === 'explore') setCursorText('EXPLORE →');
        else if (type === 'drag') setCursorText('DRAG');
        else setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full mix-blend-difference"
      animate={{
        x: position.x - (isHovered ? 40 : 8),
        y: position.y - (isHovered ? 40 : 8),
        width: isHovered ? 80 : 16,
        height: isHovered ? 80 : 16,
        backgroundColor: isHovered ? 'rgba(251, 249, 245, 0.95)' : 'rgba(196, 154, 108, 0.9)',
      }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 350,
        mass: 0.5,
      }}
    >
      {isHovered && cursorText && (
        <span className="text-[10px] tracking-widest font-sans font-semibold text-black uppercase">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
