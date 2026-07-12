/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12141C",
          800: "#181B26",
          700: "#1F2330",
          600: "#2A2F3F",
        },
        canvas: "#F4F5F8",
        surface: "#FFFFFF",
        border: "#E4E6EC",
        muted: "#6B7280",
        primary: {
          DEFAULT: "#2451D9",
          50: "#EAF0FE",
          100: "#D3DFFD",
          400: "#4A72E8",
          500: "#2451D9",
          600: "#1B3FB3",
          700: "#152F87",
        },
        accent: {
          teal: "#0FB88A",
          amber: "#F2A93B",
          rose: "#E5484D",
          violet: "#7C6CF0",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(18,20,28,0.04), 0 1px 8px -2px rgba(18,20,28,0.06)",
        pop: "0 8px 24px -4px rgba(18,20,28,0.14)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
}
