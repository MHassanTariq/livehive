/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      bg_color: "#F5F3F5",
      text_color: "#302B27",
      primary: "#1B264F",
      secondary: "#274690",
      tertiary: "#576CA8",
      lightest_blue: "#C9D1E4",
      logo_color: "#00B9FE",
      error: "#A85858",
      placeholder: "#848484",
      bg_modal: "rgba(0,0,0,0.2)",
      white: "#FFF",
    },
  },
  plugins: [],
};
