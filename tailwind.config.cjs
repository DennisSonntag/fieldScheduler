/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				main: {
					DEFAULT: 'var(--color-main)',
					light: 'var(--color-main-light)',
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					light: 'var(--color-accent-light)',
				},
				back: 'var(--color-bg)',
				stark: 'var(--color-stark)',
				invert: 'var(--color-invert)',
				bug: '#ff0000',
			},
		},
	},
	plugins: [],
};

module.exports = config;
