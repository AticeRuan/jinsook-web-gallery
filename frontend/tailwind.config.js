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
    },
  },
  plugins: [],
}
