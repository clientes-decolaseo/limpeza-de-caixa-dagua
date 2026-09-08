// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://limpezadecaixasdagua.eco.br',
	integrations: [sitemap(), mdx()],
	redirects: {
		'/hidrojateamento': '/servicos/hidrojateamento',
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
