/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: { background: "#09090a" },
      fontFamily: {
        regular: "Inter_400Regular",
        semiBold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
        extraBold: "Inter_800ExtraBold",
      },
    },
  },
  plugins: [],
};
