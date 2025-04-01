import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        enkajTeal: "var(--enkajTeal)",
        lightGrey: "var(--light-grey)",
        // foreground: "var(--foreground)",
      },
      backgroundImage: {
        tealGradient:
          "linear-gradient(to bottom right, #111827, #1f2937, #134e4a)",
      },
    },
  },
  plugins: [],
} satisfies Config;
