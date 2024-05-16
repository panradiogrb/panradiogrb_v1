import type { Config } from "tailwindcss";

const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "galaxy" : "url('/background_2.jpg')",
        'header' : "url('/grb-burst.webp')",
        'custom-image': "url('/backgroundimage.jpg')",
        'custom-image2': "url('/backgroundburst.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "panradio-logo": "url('/panradio-logo-transformed.png')",
        "grb-burst": "url('/grb-burst.webp')",
      },
      textColor: {
        'space-purple':'#BC88FF',
      },
      colors: {
        'mega-dark-purple':'#26123B',
        'navbar-admin-purple' : '#320083',
        'home-purple': '#26123B',
        'purple-text': '#9747FF',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
    },
    
    
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
export default config;



