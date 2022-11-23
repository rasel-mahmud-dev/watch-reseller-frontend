/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            primary: {
                100: "#69c9f8",
                200: "#57bef1",
                300: "#43b7f1",
                400: "#38b1ed",
                500: "#38b1ed",
                600: "#31a9e5",
                700: "#28a0dc",
                800: "#219ad7",
                900: "#1893d0",
            }
        }
    },
    daisyui: {
        themes: []
    },
    plugins: [require("daisyui")],
}
