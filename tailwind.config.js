/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fondo: "#f9e0c8",
        fondoPopup: "#1a1a1a",
      },
      backgroundImage: {
        frase: "url(/images/palabras.png)",
        logo: "url(/images/logo.png)",
        dia: "url(images/detallesDia.png)",
      },
    },
  },
  plugins: [],
};
