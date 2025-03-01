// This file is used to configure Tailwind CSS.
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          whitePerl: {
            light: '#FFF6DA',
            DEFAULT: '#FFF6DA',
            dark: '#FFF6DA',
          },
          pastelYellow: {
            light: '#F4D793',
            DEFAULT: '#F4D793',
            dark: '#F4D793',
          },
          pastelRed: {
            light: '#A94A4A',
            DEFAULT: '#A94A4A',
            dark: '#A94A4A',
          },
          greenGrass: {
            light: '#889E73',
            DEFAULT: '#889E73',
            dark: '#889E73',
          },
        },
      },
    },
    plugins: [],
  }