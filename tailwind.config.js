/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        academic: {
          950: '#030712', // Deep void
          900: '#060d1d', // Rich dark navy
          850: '#0a142c', // Elevated dark navy
          800: '#0f1f3d', // Card background
          700: '#172e56', // Card border / highlight
          600: '#23447d',
        },
        cyan: {
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'scientific-grid': 'linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
        'hero-radial': 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.15), transparent 70%)',
      },
      boxShadow: {
        'glass-edge': '0 0 0 1px rgba(255, 255, 255, 0.07), 0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
