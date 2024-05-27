/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#025B00',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
