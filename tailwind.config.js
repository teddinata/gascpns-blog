/** @type {import('tailwindcss').Config} */
// Tokens mirror the GASCPNS design system (see DESIGN.md).
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        paper: "#f5f8fa",
        ink: { DEFAULT: "#0b0707", 2: "#3d4452" },
        hairline: "#d5dbe3",
        cyan: { DEFAULT: "#0ba7e3", tint: "#dcf2fb" },
        blue: { DEFAULT: "#0066cc", deep: "#00509f" },
        sky: "#e8f4ff",
        gold: { DEFAULT: "#ffd700", hover: "#ffe347", tint: "#fff4b8" },
        navy: "#293149",
        "on-navy": "#c9d1e4",
        bad: { DEFAULT: "#b42318", tint: "#fdeceb" },
      },
      borderWidth: { line: "2px" },
      borderRadius: { chip: "6px", sm: "8px", control: "10px", row: "12px", card: "14px", sheet: "22px" },
      boxShadow: {
        "lift-sm": "3px 3px 0 #0b0707",
        lift: "4px 4px 0 #0b0707",
        "lift-lg": "8px 8px 0 #0b0707",
        "lift-cyan": "4px 4px 0 #0ba7e3",
      },
      maxWidth: { wrap: "1200px", read: "68ch" },
    },
  },
  plugins: [],
};
