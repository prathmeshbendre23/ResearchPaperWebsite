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
        // ─── Legacy dark tokens (kept for footer / dark panels) ───────────
        academic: {
          950: '#030712',
          900: '#060d1d',
          850: '#0a142c',
          800: '#0f1f3d',
          700: '#172e56',
          600: '#23447d',
        },
        // ─── Premium light-theme tokens ────────────────────────────────────
        pearl: {
          DEFAULT: '#F8F9FF',
          50:  '#FFFFFF',
          100: '#F8F9FF',
          200: '#EFF1FB',
          300: '#E4E7F7',
        },
        lavender: {
          DEFAULT: '#EDE9FF',
          50:  '#F5F3FF',
          100: '#EDE9FF',
          200: '#DDD8FF',
          300: '#C5BDFF',
        },
        navy: {
          DEFAULT: '#0B1B4A',
          50:  '#EEF1FA',
          100: '#D6DDEF',
          200: '#A8B6D9',
          300: '#7A90C3',
          400: '#4C6BAD',
          500: '#2E4D8F',
          600: '#1C3570',
          700: '#0F2158',
          800: '#0B1B4A',
          900: '#071238',
          950: '#040C26',
        },
        royalBlue: {
          DEFAULT: '#2948D8',
          400: '#5570E8',
          500: '#2948D8',
          600: '#1F38C0',
        },
        softBlue: {
          DEFAULT: '#6D8CFF',
          400: '#8BA3FF',
          500: '#6D8CFF',
        },
        violet: {
          DEFAULT: '#8B6DFF',
          400: '#A58AFF',
          500: '#8B6DFF',
          600: '#7257E8',
        },
        // Keep standard Tailwind colors
        cyan: {
          300: '#67e8f9',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        indigo: {
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'scientific-grid-light':
          'linear-gradient(to right, rgba(41, 72, 216, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(41, 72, 216, 0.04) 1px, transparent 1px)',
        'scientific-grid':
          'linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(circle at 50% 30%, rgba(41, 72, 216, 0.12), transparent 70%)',
        'pearl-gradient':
          'linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 40%, #F0EEFF 100%)',
        'lavender-gradient':
          'linear-gradient(135deg, #F8F9FF 0%, #F0EEFF 50%, #EAE6FF 100%)',
      },
      boxShadow: {
        // Legacy
        'glass-edge':   '0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px 0 rgba(0,0,0,0.37)',
        'glow-cyan':    '0 0 25px -5px rgba(56,189,248,0.3)',
        'glow-indigo':  '0 0 30px -5px rgba(99,102,241,0.25)',
        // Light theme
        'card-light':   '0 1px 3px rgba(11,27,74,0.06), 0 4px 16px rgba(11,27,74,0.08)',
        'card-hover':   '0 8px 32px -4px rgba(41,72,216,0.18), 0 0 24px rgba(139,109,255,0.10)',
        'glow-blue':    '0 0 28px -4px rgba(41,72,216,0.28)',
        'glow-violet':  '0 0 28px -4px rgba(139,109,255,0.22)',
        'nav-light':    '0 1px 12px rgba(11,27,74,0.08)',
      },
      animation: {
        'pulse-slow':    'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 9s ease-in-out infinite',
        'drift':         'drift 18s ease-in-out infinite',
        'blob-shift':    'blobShift 24s ease-in-out infinite',
        'orbital-spin':  'orbitalSpin 120s linear infinite',
        'orbital-spin2': 'orbitalSpin 180s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%':      { transform: 'translate(18px, -12px)' },
          '66%':      { transform: 'translate(-12px, 8px)' },
        },
        blobShift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '25%':      { transform: 'translate(30px, -20px) scale(1.04)' },
          '50%':      { transform: 'translate(-20px, 15px) scale(0.97)' },
          '75%':      { transform: 'translate(15px, 25px) scale(1.02)' },
        },
        orbitalSpin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
