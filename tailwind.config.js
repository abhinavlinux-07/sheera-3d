/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        arch: {
          ivory: '#FBF9F5',
          cream: '#F4EFE6',
          beige: '#E5DFD5',
          stone: '#D2C7B8',
          wood: '#C49A6C',
          woodDark: '#8B5E3C',
          brown: '#2C1F18',
          charcoal: '#1C1C1A',
          dark: '#0E0D0C',
          olive: '#5C6B57',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        mega: '0.3em',
      }
    },
  },
  plugins: [],
}
