/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "500px",
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-12deg)" },
          "50%": { transform: "rotate(12deg)" },
        },
        flash: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        flash: "flash 0.5s cubic-bezier(0, 0, 0.2, 1)",
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=cupcake]"],
          primary: "#65C3C8",
          secondary: "#FD8D8D",
          accent: "#FAC011",
          neutral: "#291334",
          "base-100": "#FAF7F5",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          light: "#d1d5db",
          medium: "#9ca3af",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          primary: "#e6777e",
          secondary: "#e6777e",
          accent: "#d19f08",
          error: "#e6777e",
          light: "#272626",
          medium: "#343232",
          neutral: "#343232",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
