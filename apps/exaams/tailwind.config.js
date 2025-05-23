const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, '../../libs/exaams/**/src/lib/**/*.{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#BEE3F8', // Soft Sky Blue
          DEFAULT: '#0284C7', // Deep Ocean Blue
          dark: '#0369A1', // Dark Blue
        },
        secondary: {
          light: '#FFD3B6', // Warm Peach
          DEFAULT: '#FB923C', // Vibrant Orange
          dark: '#EA580C', // Deep Orange
        },
        danger: {
          light: '#f58c8c',
          DEFAULT: '#ec1010',
          dark: '#b90404',
        },
        success: {
          light: '#75e57e',
          DEFAULT: '#22dc1c',
          dark: '#08a44d',
        },
        selected: {
          DEFAULT: 'oklch(95.1% 0.026 236.824)',
          light: 'oklch(97.7% 0.013 236.62)',
          dark: 'oklch(90.1% 0.058 230.902)',
        },
        hover: {
          light: '#f9fafb',
          DEFAULT: '#f3f4f6',
          dark: '#e5e7eb',
        },
        white: '#ffffff',
        black: '#000000',
        muted: {
          light: '#f3f4f6',
          DEFAULT: '#8b8a8a',
          dark: '#d1d5db',
        },
      },

      fontFamily: {
        fontFamily: {
          heading: '"Nunito", sans-serif',
        },
      },
    },
  },
  plugins: [],
};
