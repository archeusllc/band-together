/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
