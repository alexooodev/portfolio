/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#1F2937",
          light: "#F9FAFB",
        },
        primary: {
          50: "#FFFBEB",
          100: "#FFF7D6",
          200: "#FFEFA9",
          300: "#FEE780",
          400: "#FEDF52",
          500: "#FED629",
          600: "#EABF01",
          700: "#B29101",
          800: "#755F01",
          900: "#3D3200",
          950: "#1E1900",
        },
        secondary: {
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#EFEFEF",
          400: "#E8E8E8",
          500: "#DFDFDF",
          600: "#C9C9C9",
          700: "#B0B0B0",
          800: "#898989",
          900: "#5F5F5F",
          950: "#3D3D3D",
        },
        accent: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        success: {
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          500: "#F59E0B",
          600: "#D97706",
        },
        error: {
          500: "#EF4444",
          600: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        128: "32rem",
      },
      inset: {
        "0.5/10": "5%",
        "3/10": "30%",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
