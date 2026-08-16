import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Square9 Designs | Architecture & Interior Design',
  description:
    'Square9 Designs creates thoughtful architectural and interior environments through purposeful design, materiality, functionality and execution.',
  keywords: [
    'Square9 Designs',
    'Architectural Walkthrough',
    'Interior Design Nagpur',
    'Residential Architecture',
    'Luxury Real Estate Portfolio',
  ],
  openGraph: {
    title: 'Square9 Designs | Architecture & Interior Design',
    description:
      'Experience a cinematic architectural walkthrough of luxury residential design by Square9 Designs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#0E0D0C] text-[#FBF9F5] antialiased selection:bg-[#C49A6C] selection:text-[#0E0D0C]">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
