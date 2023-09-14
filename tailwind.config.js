/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            letterSpacing: {
                xxs: "0.75em",
            },
        },
        colors: {
            monkeyBlack: "#2d2e31",
            monkeyWhite: "#d1d0c6",
            monkeyYellow: "#dbba41",
            monkeyHoverWhite: "rgb(241 245 249)",
        },
    },
    plugins: [],
};
