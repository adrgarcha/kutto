/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: "rgb(var(--primary))",
      }
    },
  },
  plugins: [require('tailwindcss-motion')],
}