/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fondo: "#f9e0c8",
        fondoPopup: "#1a1a1a",
        blueDb: "#5499c7",
        greenDb: "#27ae60",
        redDb: "#c0392b",
        yellowDb: "#f7dc6f ",
        grayDb: "#808b96",
      },
    },
  },
  plugins: [],
};
