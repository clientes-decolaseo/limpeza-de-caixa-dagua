import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const PUBLIC_DIR = path.join(ROOT, 'public');

const IMAGE_HEADERS = {
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
	Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
	Referer: 'https://limpezadecaixasdagua.eco.br/',
	'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
};

const DOWNLOADS = [
	{
		urls: ['https://limpezadecaixasdagua.eco.br/wp-content/uploads/2025/08/limpeza-caixa-dagua.png'],
		dest: path.join(ASSETS_DIR, 'logo.png'),
	},
	{
		urls: [
			'https://limpezadecaixasdagua.eco.br/wp-content/uploads/2025/08/icone-universo-ambiental.png',
			'https://limpezadecaixasdagua.eco.br/wp-content/webp-express/webp-images/uploads/2025/08/icone-universo-ambiental.png.webp',
		],
		dest: path.join(ASSETS_DIR, 'favicon.png'),
	},
];

async function downloadImage(urls) {
	let lastError = '';

	for (const url of urls) {
		const response = await fetch(url, { headers: IMAGE_HEADERS });
		const buffer = Buffer.from(await response.arrayBuffer());
		const contentType = response.headers.get('content-type') ?? '';

		if (!response.ok || !contentType.startsWith('image/')) {
			lastError = `${url} → ${response.status} ${contentType}`;
			console.warn(`Ignorado: ${lastError}`);
			continue;
		}

		if (buffer.byteLength === 0) {
			lastError = `${url} → arquivo vazio`;
			continue;
		}

		return { url, buffer, contentType };
	}

	throw new Error(`Falha ao baixar imagem. Último erro: ${lastError}`);
}

await mkdir(ASSETS_DIR, { recursive: true });
await mkdir(PUBLIC_DIR, { recursive: true });

for (const item of DOWNLOADS) {
	const { url, buffer, contentType } = await downloadImage(item.urls);
	const pngBuffer = contentType.includes('webp')
		? await sharp(buffer).png().toBuffer()
		: buffer;

	await writeFile(item.dest, pngBuffer);
	const meta = await sharp(pngBuffer).metadata();
	console.log(
		`Baixado: ${path.relative(ROOT, item.dest)} (${meta.width}×${meta.height}, ${pngBuffer.byteLength} bytes) de ${url}`,
	);
}

const faviconSrc = path.join(ASSETS_DIR, 'favicon.png');
const publicFavicon = path.join(PUBLIC_DIR, 'favicon.png');
const appleTouch = path.join(PUBLIC_DIR, 'apple-touch-icon.png');

await sharp(faviconSrc)
	.resize(32, 32, {
		fit: 'contain',
		background: { r: 255, g: 255, b: 255, alpha: 1 },
	})
	.png()
	.toFile(publicFavicon);

await sharp(faviconSrc)
	.resize(180, 180, {
		fit: 'contain',
		background: { r: 255, g: 255, b: 255, alpha: 1 },
	})
	.png()
	.toFile(appleTouch);

console.log(`Gerado: ${path.relative(ROOT, publicFavicon)} (32×32)`);
console.log(`Gerado: ${path.relative(ROOT, appleTouch)} (180×180)`);
