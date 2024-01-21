/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "son": "linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0)), url('/src/assets/img/2884345_2943939_2138.png')",
        "gamst": "linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0)), url('/src/assets/img/maxresdefault.jpg')",
        "tackle": "linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0)), url('/src/assets/img/5e564fffeb0d4.gif')",
        
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
