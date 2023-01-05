/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./pages/*.{js,ts,jsx,tsx}', './components/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				main: 'var(--color-main)',
				accent: 'var(--color-accent)',
				light: 'var(--color-light)',
				back: 'var(--color-bg)',
				stark: 'var(--color-stark)',
				invert: 'var(--color-invert)',
				bug: '#ff0000',
			},
		},
	},
	plugins: [],
};
