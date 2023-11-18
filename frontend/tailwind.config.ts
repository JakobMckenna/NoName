import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: ['lofi','garden','dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  //  darkTheme: "dark",
  },
} satisfies Config;
