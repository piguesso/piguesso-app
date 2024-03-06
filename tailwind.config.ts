/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#AE6DF5",
        border: "#3B3C36",
        white: "#FDFDFD",
        background: "#171717",
        black: "#151515",
        surface: "#3A3E41",
        grey: "#A0A0A0",
        lightgrey: "#E5E7EB",
        success: "#6A9F4E",
        warning: "#EE814E",
        destructive: "#BB362E",
        accent: "#FDFDFD/10",
        "accent-foreground": "#FDFDFD/5",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      borderWidth: {
        DEFAULT: "1px",
        "1/2": "0.5px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        wait: "wait",
        text: "text",
        move: "move",
        help: "help",
        "not-allowed": "not-allowed",
        none: "none",
        "context-menu": "context-menu",
        progress: "progress",
        cell: "cell",
        crosshair: "crosshair",
        "vertical-text": "vertical-text",
        alias: "alias",
        copy: "copy",
        "no-drop": "no-drop",
        grab: "grab",
        grabbing: "grabbing",
        "all-scroll": "all-scroll",
        "col-resize": "col-resize",
        "row-resize": "row-resize",
        "n-resize": "n-resize",
        "e-resize": "e-resize",
        "s-resize": "s-resize",
        "w-resize": "w-resize",
        "ne-resize": "ne-resize",
        "nw-resize": "nw-resize",
        "se-resize": "se-resize",
        "sw-resize": "sw-resize",
        "ew-resize": "ew-resize",
        "ns-resize": "ns-resize",
        "nesw-resize": "nesw-resize",
        "nwse-resize": "nwse-resize",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out",
      },
      screens: {
        "md-plus": { max: "767px" },
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
        "circle-to-rounded": {
          "0%": { borderRadius: "100%" },
          "100%": { borderRadius: "0%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "circle-to-rounded": "circle-to-rounded 0.3s ease-out",
      },
      lineHeight: {
        tighter: "1.1",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
