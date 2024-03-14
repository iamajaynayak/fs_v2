/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}',
],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
        }
      },
    ],
  },
  plugins: [require('daisyui')],
}
