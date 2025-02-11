/** @type {import('tailwindcss').Config} */
module.exports = {
  //I wish I knew about this from the start
  safelist: ["bg-shop1", "bg-shop2", "bg-shop3", "rounded-xl"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FFFFFF",
        secondary: "#eef1f6",
        tertiary: "#b1b7c4",
        border: "#767b91",
        error: {
          light: "#ef9a9a",
          dark: "#b71c1c",
        },
        //Status colors
        assembled: {
          light: "#c8e6c9",
          dark: "#388e3c",
        },
        notAssembled: {
          light: "#fff0c2",
          dark: "#a68b00",
        },

        prepaid: {
          light: "#a6e1f7",
          dark: "#388d8e",
        },

        delivery: {
          light: "#f7cca6",
          dark: "#c66f28",
        },
        guarantee: {
          light: "#cccecf",
          dark: "#727273",
        },
        shop1: "#c6e0b4",
        shop2: "#d4a3a3",
        shop3: "#ffe699",
        count: {
          none: "#ffcdd2",
          low: "#f7cca6",
          medium: "#fff0c2",
          high: "#c8e6c9",
        },
      },
      maxWidth: {
        1920: "1920px",
      },
    },
  },
  plugins: [],
};
