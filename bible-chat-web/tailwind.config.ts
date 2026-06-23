import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A6FA5',
          light: '#6B8FBF',
          dark: '#3A5A87',
          50: '#EEF3F9',
          100: '#D4E1F0',
          200: '#A9C3E1',
          500: '#4A6FA5',
          600: '#3A5A87',
          700: '#2D4668',
        },
        secondary: {
          DEFAULT: '#C5A55A',
          light: '#D4BA7A',
          dark: '#A68A3E',
        },
        accent: {
          teal: '#7ECEC1',
          coral: '#E87E6C',
          purple: '#7B68AE',
          amber: '#FFB74D',
          green: '#81C784',
          pink: '#F48FB1',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#F5F6F8',
          dark: '#1A1A2E',
        },
        background: {
          DEFAULT: '#FAFBFD',
          dark: '#0F0F1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.08)',
        'medium': '0 2px 8px rgba(0,0,0,0.12)',
        'elevated': '0 4px 16px rgba(0,0,0,0.15)',
      },
      animation: {
        'breathe': 'breathe 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
