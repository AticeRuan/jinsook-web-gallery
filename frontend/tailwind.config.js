/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'jinsook-blue': '#CDE7E3',
        'jinsook-green': '#009379',
        'jinsook-yellow': '#FDC435',
        'jinsook-pink': '#F6DCE9',
        'jinsook-dark-pink': '#CE88BA',
        'jinsook-light-pink': '#FDEADF',
      },
      fontFamily: {
        heading: 'Open Sans',
        body: 'Montserrat',
      },
      keyframes: {
        write: {
          '0%': { width: '0' },
          '100%': { width: '200px' },
        },
        'pencil-move': {
          '0%': { transform: 'rotate(-45deg) translate(0, 0)' },
          '30%': { transform: 'rotate(-30deg) translate(20px, 20px)' },
          '60%': { transform: 'rotate(-50deg) translate(30px, 30px)' },
          '100%': { transform: 'rotate(-45deg) translate(0, 0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        colorchange: {
          '0%': { color: '#009379' },
          '25%': { color: '#FDC435' },
          '50%': { color: 'CE88BA' },
          '75%': { color: '#CE88BA' },
          '100%': { color: '#009379' },
        },
      },
      animation: {
        write: 'write 2s infinite',
        'pencil-move': 'pencil-move 2s infinite',
        typewriter: 'typewriter 4s steps(40) 1s 1 normal both',
        blink: 'blink 1s steps(1) infinite',
        colorchange: 'colorchange 3s infinite ease-in',
      },
    },
  },
  plugins: [],
}
