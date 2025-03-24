module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    "bg-[url('/assets/images/Background.png')]",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#cea555',
        dark: '#101010',
        accent: '#cea555',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
