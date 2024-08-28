const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");
 


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      fontFamily: {
        logofont: ["Saira Stencil One", "sans-serif"],
        sans : ["Inter", "sans-serif"]
      },
      dropShadow: {
        '3xl': '0 3px 55px rgba(163, 166, 246, 0.30)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'gradient-rotate': 'gradient-rotate 8s linear infinite',
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        },
        'gradient-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      backgroundImage:{
        'items':'url("../src/assets/card/galaxy-7040416_1920.png")',
        'topp':'url("../src/assets/card/85.jpg")',
        'endd':'url("../src/assets/home/demo.png")'
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '40px',
      },
      // Adding custom blur levels for regular blur utility
      blur: {
        xs: '2px',
        '3xl': '40px',
      },
      colors: {
        dark: {
          primary: '#1F2937',
          secondary: '#4B5563',
          accent: '#10B981',
          background: '#111827',
          cardBackground: '#1F2937',
          textPrimary: '#FFFFFF',
          textSecondary: '#D1D5DB',
          border: '#374151',
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#F3F4F6',
          accent: '#3B82F6',
          background: '#F9FAFB',
          cardBackground: '#FFFFFF',
          textPrimary: '#1F2937',
          textSecondary: '#4B5563',
          border: '#E5E7EB',
        },
      },
      gradientColorStops: {
        dark: {
          start: '#1F2937',
          end: '#4B5563',
        },
        light: {
          start: '#3B82F6',
          end: '#10B981',
        },
      },
    },

  },
  variants: {
    extend: {
      backdropBlur: ['responsive'],
      blur: ['responsive'],
    },
  },
  
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
  darkMode: 'class', // Enable dark mode with a class
}



function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}