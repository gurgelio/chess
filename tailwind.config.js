/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{ts,vue}", "./index.html"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Cantarell", "sans-serif"],
			},
		},
	},
	plugins: [],
};
