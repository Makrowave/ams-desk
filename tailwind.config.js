/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#DEE2DB',
        tertiary: '#BCC0BA',
        border: '#7A7C78',
        //Status colors
        assembled: '#4CAF50',
        notAssembled: '#FF9800',
        prepaid: '#2196F3',
        delivery: '#FFEB3B',
        guarantee: '#9C27B0'
      },
      maxWidth: {
        '1920': '1920px',
      }
    },

    

  },
  plugins: [],
};
