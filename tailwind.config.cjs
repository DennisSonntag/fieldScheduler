/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {

				neo: 'var(--color-neo)',
			},
			colors: {
				base: 'var(--color-base)',
				mid: 'var(--color-mid)',
				dim: 'var(--color-dim)',
				stark: 'var(--color-stark)',
				invert: 'var(--color-invert)',
				top: 'var(--color-top)',
				bug: '#ff0000',
			},
		},
	},
	plugins: [],
};
