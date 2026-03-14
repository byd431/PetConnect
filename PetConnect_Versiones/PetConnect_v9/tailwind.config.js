/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#4682ca",
        secondary: "#2faaaf",
        accent: "#f29933",
        success: "#41b7a1",
        background: "#ecf0f9",
      },
      fontFamily: {
        play: ["Play", "sans-serif"],
        sans: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
