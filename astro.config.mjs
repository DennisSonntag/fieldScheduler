import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		react(),
	],
	output: 'server',
	adapter: netlify(),
});
