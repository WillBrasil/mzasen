import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores personalizadas para nutrição e saúde
        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#d0ddd0",
          300: "#afc5af",
          400: "#87a687",
          500: "#658a65",
          600: "#4d6f4d",
          700: "#3e593e",
          800: "#344834",
          900: "#2c3c2c",
          950: "#162116",
        },
        olive: {
          50: "#f8f9f1",
          100: "#eef0dc",
          200: "#dde3bc",
          300: "#c7d093",
          400: "#b0bc6a",
          500: "#94a048",
          600: "#75813a",
          700: "#5c6631",
          800: "#4b522b",
          900: "#404627",
          950: "#212513",
        },
        terra: {
          50: "#faf5f0",
          100: "#f2e8dd",
          200: "#e4d0bb",
          300: "#d4b392",
          400: "#c49169",
          500: "#b8784d",
          600: "#aa6341",
          700: "#8d4e37",
          800: "#734131",
          900: "#5f372c",
          950: "#331b16",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e6fe",
          300: "#7cd4fd",
          400: "#36bffa",
          500: "#0ca5e9",
          600: "#0284c7",
          700: "#036ba1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

