const { spacing, fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: require("daisyui/colors"),

      fontFamily: {
        sans: ["IBM Plex Sans", ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
          },
        },
      }),

      spacing: {
        "2/3": "66.666667%",
      },
    },
  },

  daisyui: {
    themes: [
      {
        dark: {
          primary: "#793ef9",
          "primary-focus": "#570df8",
          "primary-content": "#ffffff",
          secondary: "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          accent: "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          neutral: "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#ffffff",
          "base-100": "#3d4451", // make this darker
          "base-200": "#2a2e37",
          "base-300": "#16181d",
          "base-content": "#ebecf0",
          info: "#66c6ff",
          success: "#87d039",
          warning: "#e2d562",
          error: "#ff6f6f",
        },
      },
      {
        black: {
          primary: "#ffffff",
          "primary-focus": "#ffffff",
          "primary-content": "#111111",
          secondary: "#eaeaea",
          "secondary-focus": "#eaeaea",
          "secondary-content": "#111111",
          accent: "#ffffff",
          "accent-focus": "#ffffff",
          "accent-content": "#111111",
          "base-100": "#111111",
          "base-200": "#333333",
          "base-300": "#4d4d4d",
          "base-content": "#888888",
          neutral: "#333333",
          "neutral-focus": "#4d4d4d",
          "neutral-content": "#ffffff",
          info: "#0000ff",
          success: "#008000",
          warning: "#ffff00",
          error: "#ff0000",
          "--border-color": "var(--b3)",
          "--rounded-box": "4",
          "--rounded-btn": "4",
          "--rounded-badge": "0",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-text-case": "lowercase",
          "--btn-focus-scale": "1",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0",
        },
      },
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "luxury",
      "emerald",
    ],
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};
