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
          light: '#ecaa7e',
          DEFAULT: '#ec874a',
          dark: '#e86b19',
        },
        secondary: {
          light: '#bae6fd',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
        warn: {
          light: '#f58c8c',
          DEFAULT: '#ec1010',
          dark: '#b90404',
        },
        success:{
          light: '#75e57e',
          DEFAULT: '#22dc1c',
          dark: '#08a44d',
        },
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily:{
        fontFamily: {
          heading: '"Nunito", sans-serif',
        }
      }
    },
  },
  plugins: [],
};
