/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        light: "#6B7280",
        secondary: "#F9FAFB",
        dark: "#F3F4F6",
        label: "#374151",
        pill: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
