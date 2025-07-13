/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#6D28D9',
          DEFAULT: '#4F46E5'
        }
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'cupcake',
      'coffee'
    ]
  }
};
