/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
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
                },
                light: {
                    100: "#a6a6a6",
                    200: "#afafaf",
                    300: "#b9b9b9",
                    400: "#c7c7c7",
                    500: "#d3d3d3",
                    600: "#dcdcdc",
                    700: "#e8e8e8",
                    800: "#f3f3f3",
                    900: "#fcfcfc",
                },
                dark: {
                    100: "#b0b0b0",
                    200: "#939393",
                    300: "#707070",
                    400: "#505050",
                    500: "#3a3a3a",
                    600: "#343434",
                    700: "#2d2d2d",
                    800: "#282828",
                    900: "#181818",
                }
            },
            boxShadow: {
                xxs: "0 2px 15px -4px #36363626"
            },
            zIndex: {
                1000: "1000"
            }
        },

    },
    daisyui: {
        themes: []
    },
    plugins: [require("daisyui")],
}
