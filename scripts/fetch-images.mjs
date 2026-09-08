import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const SEARCH_QUERIES = [
	{ query: 'water tank cleaning technician', outputName: 'hero-limpeza-caixa-dagua' },
	{ query: 'clean water reservoir industrial', outputName: 'servico-reservatorio' },
	{ query: 'worker safety equipment industrial', outputName: 'servico-seguranca-nr' },
	{ query: 'clean drinking water glass', outputName: 'por-que-importante' },
	{ query: 'gutter cleaning house roof', outputName: 'servico-calhas' },
	{ query: 'kitchen exhaust hood cleaning', outputName: 'servico-coifa' },
	{ query: 'industrial cleaning truck hose', outputName: 'servico-fossa' },
	{ query: 'pressure washer water jet', outputName: 'servico-hidrojateamento' },
	{ query: 'grease trap cleaning restaurant kitchen', outputName: 'servico-caixa-gordura' },
	{
		query: 'apartment building rooftop water tank',
		outputName: 'caixa-dagua-condominio',
		subdir: 'blog',
	},
];

const SELECTED_IDS = {
	'hero-limpeza-caixa-dagua': 27566315,
	'servico-reservatorio': 19888251,
	'servico-seguranca-nr': 901941,
	'por-que-importante': 416528,
	'servico-calhas': 38524253,
	'servico-coifa': 7214729,
	'servico-fossa': 36842617,
	'servico-hidrojateamento': 35153375,
	'servico-caixa-gordura': 8629124,
	'caixa-dagua-condominio': 29309716,
};

const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search';
const PEXELS_PHOTO_URL = 'https://api.pexels.com/v1/photos';
const IMAGES_ROOT = path.join(process.cwd(), 'src', 'assets', 'images');
const PER_PAGE = 5;

const shouldWrite = process.argv.includes('--write');
const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
const onlyName = onlyArg ? onlyArg.slice('--only='.length) : null;
const queries = onlyName
	? SEARCH_QUERIES.filter((item) => item.outputName === onlyName)
	: SEARCH_QUERIES;

if (onlyName && queries.length === 0) {
	console.error(`Nenhuma query com outputName="${onlyName}".`);
	process.exit(1);
}

await loadEnvFile();

const apiKey = process.env.PEXELS_API_KEY;

if (!apiKey) {
	console.error(
		'PEXELS_API_KEY não encontrada. Defina a variável de ambiente ou crie um arquivo .env (veja .env.example).',
	);
	process.exit(1);
}

const downloads = [];
const failures = [];

console.log(shouldWrite ? 'Modo: download (--write)\n' : 'Modo: dry-run (nenhum arquivo será baixado)\n');

for (const item of queries) {
	try {
		const selectedId = SELECTED_IDS[item.outputName] ?? null;
		const photos = await searchPexels(item.query, 1);
		const { selected, fetchedById } = await resolveSelectedPhoto(photos, selectedId);

		console.log(`Query: "${item.query}"`);
		console.log(`Arquivo: ${item.outputName}.jpg`);
		console.log(`ID escolhido: ${selectedId ?? '(ainda não definido)'}${fetchedById ? ' (via GET /v1/photos/{id})' : ''}`);

		if (photos.length === 0 && !selected) {
			const reason = 'A busca não retornou fotos.';
			console.log(`  ${reason}\n`);
			failures.push({ outputName: item.outputName, query: item.query, reason });
			continue;
		}

		for (const photo of photos) {
			const marker = selected && photo.id === selected.id ? '→ selecionada' : '  candidata';
			printPhoto(photo, marker);
		}

		if (selected && !photos.some((photo) => photo.id === selected.id)) {
			printPhoto(selected, '→ selecionada');
		}

		if (selectedId !== null && !selected) {
			const reason = `Foto ${selectedId} não encontrada na busca nem no endpoint individual.`;
			console.log(`  ${reason}\n`);
			failures.push({ outputName: item.outputName, query: item.query, reason });
			continue;
		}

		console.log('');

		if (!shouldWrite) {
			continue;
		}

		if (selectedId === null || !selected) {
			const reason = 'SELECTED_IDS ainda está null para este arquivo.';
			console.log(`  Pulado: ${reason}\n`);
			failures.push({ outputName: item.outputName, query: item.query, reason });
			continue;
		}

		const outputDir = path.join(IMAGES_ROOT, item.subdir ?? 'home');
		const creditsPath = path.join(outputDir, 'CREDITS.md');

		await mkdir(outputDir, { recursive: true });
		const filePath = path.join(outputDir, `${item.outputName}.jpg`);
		await downloadPhoto(selected.src.large2x, filePath);
		downloads.push({
			outputName: item.outputName,
			filePath,
			creditsPath,
			id: selected.id,
			photographer: selected.photographer,
			photographerUrl: selected.photographer_url,
			pexelsUrl: selected.url,
		});
		console.log(`  Baixada: ${path.relative(process.cwd(), filePath)}\n`);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.error(`  Falhou: ${reason}\n`);
		failures.push({ outputName: item.outputName, query: item.query, reason });
	}
}

if (shouldWrite) {
	if (downloads.length > 0) {
		await writeCreditsFile(downloads);
	}

	console.log('--- Resumo ---');
	console.log(`Imagens baixadas: ${downloads.length}`);
	console.log(`Falhas: ${failures.length}`);

	for (const failure of failures) {
		console.log(`  - ${failure.outputName} ("${failure.query}"): ${failure.reason}`);
	}

	console.log(
		'\nVerifique créditos e licença de cada foto. A Pexels License permite uso comercial sem atribuição obrigatória, mas é boa prática guardar o link do fotógrafo.',
	);

	if (downloads.length > 0) {
		const creditFiles = [...new Set(downloads.map((item) => item.creditsPath))];
		for (const file of creditFiles) {
			console.log(`Créditos salvos em: ${path.relative(process.cwd(), file)}`);
		}
	}
}

function printPhoto(photo, marker) {
	console.log(`  [${marker}] id=${photo.id}`);
	console.log(`             título: ${photo.alt || '(sem descrição)'}`);
	console.log(`             preview: ${photo.src.medium}`);
	console.log(`             fotógrafo: ${photo.photographer} (${photo.photographer_url})`);
}

async function resolveSelectedPhoto(photos, selectedId) {
	if (selectedId === null) {
		return { selected: null, fetchedById: false };
	}

	const fromSearch = photos.find((photo) => photo.id === selectedId);

	if (fromSearch) {
		return { selected: fromSearch, fetchedById: false };
	}

	const fromEndpoint = await fetchPhotoById(selectedId);
	return { selected: fromEndpoint, fetchedById: Boolean(fromEndpoint) };
}

async function loadEnvFile() {
	const envPath = path.join(process.cwd(), '.env');

	if (!existsSync(envPath)) {
		return;
	}

	const contents = await readFile(envPath, 'utf8');

	for (const rawLine of contents.split(/\r?\n/)) {
		const line = rawLine.trim();

		if (!line || line.startsWith('#')) {
			continue;
		}

		const separator = line.indexOf('=');

		if (separator === -1) {
			continue;
		}

		const key = line.slice(0, separator).trim();
		let value = line.slice(separator + 1).trim();

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		if (process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}

async function searchPexels(query, page) {
	const url = new URL(PEXELS_SEARCH_URL);
	url.searchParams.set('query', query);
	url.searchParams.set('per_page', String(PER_PAGE));
	url.searchParams.set('page', String(page));

	const response = await fetch(url, {
		headers: {
			Authorization: apiKey,
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Pexels API retornou ${response.status} ${response.statusText} (query="${query}", page=${page}).`);
	}

	const data = await response.json();
	return Array.isArray(data.photos) ? data.photos : [];
}

async function fetchPhotoById(id) {
	const response = await fetch(`${PEXELS_PHOTO_URL}/${id}`, {
		headers: {
			Authorization: apiKey,
			Accept: 'application/json',
		},
	});

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(`Pexels API retornou ${response.status} ${response.statusText} ao buscar foto ${id}.`);
	}

	return response.json();
}

async function downloadPhoto(imageUrl, filePath) {
	if (!imageUrl) {
		throw new Error('Foto sem src.large2x.');
	}

	const response = await fetch(imageUrl);

	if (!response.ok) {
		throw new Error(`Download retornou ${response.status} ${response.statusText}.`);
	}

	const buffer = Buffer.from(await response.arrayBuffer());

	if (buffer.byteLength === 0) {
		throw new Error('Arquivo baixado está vazio.');
	}

	await writeFile(filePath, buffer);
}

async function writeCreditsFile(items) {
	const byFile = new Map();

	for (const item of items) {
		const list = byFile.get(item.creditsPath) ?? [];
		list.push(item);
		byFile.set(item.creditsPath, list);
	}

	for (const [creditsPath, group] of byFile) {
		const lines = [
			'# Créditos das imagens (Pexels)',
			'',
			'A [Pexels License](https://www.pexels.com/license/) permite uso comercial sem atribuição obrigatória. Mesmo assim, é boa prática preservar o crédito do fotógrafo.',
			'',
			'| Arquivo | ID Pexels | Fotógrafo | Perfil | Página da foto |',
			'| --- | --- | --- | --- | --- |',
			...group.map(
				(item) =>
					`| \`${item.outputName}.jpg\` | ${item.id} | ${item.photographer} | ${item.photographerUrl} | ${item.pexelsUrl} |`,
			),
			'',
		];

		await writeFile(creditsPath, lines.join('\n'), 'utf8');
	}
}
