/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",     
    "./src/components/**/*.{vue}",         
    "./src/layout/**/*.{vue}",            
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}