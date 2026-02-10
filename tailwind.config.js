/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",     
    "./src/components/**/*.vue",         
    "./src/layout/**/*.vue",            
  ],
theme: {
    extend: {
      colors: {
         primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        // primary: "#000080",
        // secondary: "#FFD700",
        // accent: "#F8FAFC",
      },
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
        "10xl": "120rem",
        "11xl": "140rem",
      },
    },
  },
  plugins: [],
}