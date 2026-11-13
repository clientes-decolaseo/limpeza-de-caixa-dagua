// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';

// Landings locais com publish: false ficam noindex e fora do sitemap.
const locaisDir = new URL('./src/content/locais/', import.meta.url);
const locaisNaoPublicadas = readdirSync(locaisDir)
	.filter((f) => f.endsWith('.mdx'))
	.filter((f) => !/^publish:\s*true\s*$/m.test(readFileSync(new URL(f, locaisDir), 'utf8')))
	.map((f) => `/${f.replace(/\.mdx$/, '')}/`);

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://limpezadecaixasdagua.eco.br',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !locaisNaoPublicadas.some((path) => page.endsWith(path)),
		}),
		mdx(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
