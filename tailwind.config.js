/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
     screens: {
      'sm': '280px',
      // => @media (min-width: 640px) { ... }

      'md': '750px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        nearBlack: '#1f1e1e',
        nearBlackish: '#353434',
        beautifulGreen: 'rgb(0,230,122)',
        darkBeautifulGreen: 'rgb(4,196,106)',
        someGray: '#414040',
      },
      boxShadow: {
        '3xl': '0px 5px 7px black',
      },
    },
  },
  plugins: [],
}
