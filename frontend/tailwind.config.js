import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1363DF",
        "primary-light": "#47B5FF",
        "primary-dark": "#06283D",
        "primary-accent": "#DFF6FF",
      },
      backgroundImage: {
        gradientText:
          "linear-gradient( to right,#fff,#47B5FF,#fff,#47B5FF,#fff)",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPostion: "0% 50%" },
          "100%": { backgroundPostion: "100% 50%" },
        },
      },
      animation: {
        "gradient-animation": "gradient 1s infinite ",
      },
    },
  },
  plugins: [daisyui],
};
