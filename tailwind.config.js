/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        nexus: {
          bg: '#0d1117',
          surface: '#161c26',
          indigo: '#3b82f6',
          brass: '#d4af37',
          chalk: '#f8fafc',
          slate: '#94a3b8'
        }
      },
      backgroundImage: {
        'technical-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)'
      }
    },
  },
  plugins: [],
};
