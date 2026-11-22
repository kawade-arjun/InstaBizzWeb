import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        toffee: {
          DEFAULT: "var(--color-toffee, #c2622b)",
          deep: "var(--color-toffee-deep, #a24a1a)",
          ink: "var(--color-toffee-ink, #8e3f15)",
        },
        honey: {
          DEFAULT: "var(--color-honey, #f2be6b)",
          soft: "var(--color-honey-soft, #fbe3b4)",
        },
        cocoa: {
          DEFAULT: "var(--color-cocoa, #2a170e)",
          soft: "var(--color-cocoa-soft, #5a3a28)",
        },
        milk: "var(--color-milk, #fffdf8)",
        sky: {
          DEFAULT: "var(--color-sky, #bfddf5)",
          deep: "var(--color-sky-deep, #2f6e9e)",
        },
        blush: "var(--color-blush, #f9cdbf)",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
        plush: ["var(--font-fraunces)", "serif"],
        scrawl: ["var(--font-shantell-sans)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
