import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: ['lofi','garden','dark','retro'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  //  darkTheme: "dark",
  },
} satisfies Config;
