/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: {
			light: "#94a3b8",
			mid: "#475569",
			dark: "#1e293b",
			black: "#000000",
			red:"#d81515",
			white:"#ffffff",
			blue: "#0284c7"
		},
		extend: {},
	},
	plugins: [],
};
