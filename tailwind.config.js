/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#003366', light: '#004a8f', dark: '#002244' },
        accent: '#A4212E',
      },
    },
  },
  plugins: [],
}

