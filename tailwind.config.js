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
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
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
        shimmer: {
          "100%": {
            transform: "translateY(100%)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        flash: "flash 0.5s cubic-bezier(0, 0, 0.2, 1)",
        shimmer: "shimmer 1s infinite",
        "shimmer-fast": "shimmer 0.25 infinite",
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
          neutral: "#d1d5db",
          "base-100": "#FAF7F5",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          "base-200": "#d1d5db",
          "base-300": "#291334",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          primary: "#e6777e",
          secondary: "#e6777e",
          accent: "#d19f08",
          error: "#e6777e",
          light: "#272626",
          "base-200": "#343232",
          "base-300": "#4a4848",
          "base-content": "#d1d1d1",
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
