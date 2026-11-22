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
        navy: {
          950: '#070A14',
          900: '#0B1020',
          850: '#0E152B',
          800: '#121B35',
          700: '#1A2649',
          600: '#243462',
          500: '#324884',
        },
        electric: {
          DEFAULT: '#4F8CFF',
          hover: '#3877F6',
          light: '#72A4FF',
          glow: 'rgba(79, 140, 255, 0.25)',
        },
        truth: {
          real: '#10B981',
          realGlow: 'rgba(16, 185, 129, 0.25)',
          fake: '#EF4444',
          fakeGlow: 'rgba(239, 68, 68, 0.25)',
          neutral: '#6366F1'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-electric': '0 0 25px -5px rgba(79, 140, 255, 0.3)',
        'glow-real': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-fake': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
