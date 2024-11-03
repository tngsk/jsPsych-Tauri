/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.{html,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
