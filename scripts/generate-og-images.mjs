import { mkdir, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'public', 'og-images');
const HOME_HERO = path.join(ROOT, 'src', 'assets', 'images', 'home', 'hero-limpeza-caixa-dagua.jpg');
const HERO_IMAGE_RE = /^heroImage:\s*["']([^"']+)["']\s*$/m;
const shouldWrite = process.argv.includes('--write');

const jobs = [
	{
		group: 'home',
		slug: 'home',
		source: HOME_HERO,
		mdx: null,
	},
	...(await collectJobs('services', 'src/content/services')),
	...(await collectJobs('industrial', 'src/content/industrial')),
	...(await collectJobs('blog', 'src/content/blog')),
];

console.log(shouldWrite ? 'Modo: gerar (--write)\n' : 'Modo: dry-run (nenhum arquivo será gerado)\n');

const missing = [];
const generated = [];

for (const job of jobs) {
	const output = path.join(OUTPUT_DIR, `${job.slug}.jpg`);
	const sourceExists = existsSync(job.source);
	const sourceRel = path.relative(ROOT, job.source);
	const outputRel = path.relative(ROOT, output);
	const origin = job.mdx ? path.relative(ROOT, job.mdx) : 'home (hero-limpeza-caixa-dagua.jpg)';

	console.log(`[${job.group}] ${job.slug}`);
	console.log(`  origem:  ${origin}`);
	console.log(`  fonte:   ${sourceRel}${sourceExists ? '' : '  ← ARQUIVO AUSENTE'}`);
	console.log(`  saída:   ${outputRel}\n`);

	if (!sourceExists) {
		missing.push(job);
		continue;
	}

	if (!shouldWrite) {
		continue;
	}

	await mkdir(OUTPUT_DIR, { recursive: true });
	await sharp(job.source)
		.resize(1200, 630, {
			fit: 'cover',
			position: 'attention',
		})
		.jpeg({ quality: 85 })
		.toFile(output);

	generated.push(outputRel);
}

console.log('--- Resumo ---');
console.log(`Jobs: ${jobs.length}`);
printGroupCounts(jobs);

const uniqueSources = new Set(jobs.map((job) => path.normalize(job.source)));
console.log(`Arquivos-fonte distintos: ${uniqueSources.size}`);
console.log(`Arquivos de saída previstos: ${jobs.length} (um JPEG por slug, mesmo quando a foto de origem se repete)`);

if (missing.length > 0) {
	console.error(`Fontes ausentes: ${missing.length}`);
	for (const job of missing) {
		console.error(`  - ${job.slug}: ${path.relative(ROOT, job.source)}`);
	}
	process.exitCode = 1;
}

if (shouldWrite) {
	console.log(`Imagens geradas: ${generated.length}`);
}

if (!shouldWrite) {
	console.log('\nNada foi escrito. Rode com --write para gerar public/og-images/{slug}.jpg');
}

async function collectJobs(group, relativeDir) {
	const dir = path.join(ROOT, relativeDir);
	const files = (await readdir(dir))
		.filter((file) => file.toLowerCase().endsWith('.mdx'))
		.sort((a, b) => a.localeCompare(b, 'pt-BR'));

	const collected = [];

	for (const file of files) {
		const mdx = path.join(dir, file);
		const contents = await readFile(mdx, 'utf8');
		const match = contents.match(HERO_IMAGE_RE);

		if (!match) {
			throw new Error(`Campo heroImage não encontrado em ${path.relative(ROOT, mdx)}`);
		}

		collected.push({
			group,
			slug: file.replace(/\.mdx$/i, ''),
			source: path.resolve(dir, match[1]),
			mdx,
		});
	}

	return collected;
}

function printGroupCounts(items) {
	const counts = new Map();

	for (const job of items) {
		counts.set(job.group, (counts.get(job.group) ?? 0) + 1);
	}

	for (const [group, count] of counts) {
		console.log(`  ${group}: ${count}`);
	}
}
