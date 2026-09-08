import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'src', 'assets', 'favicon.png');
const DEST = path.join(ROOT, 'public', 'favicon.ico');
const SIZES = [16, 32];

const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'ua-favicon-'));

try {
	const pngPaths = [];

	for (const size of SIZES) {
		const dest = path.join(tmpDir, `favicon-${size}.png`);
		await sharp(SOURCE)
			.resize(size, size, {
				fit: 'contain',
				background: { r: 255, g: 255, b: 255, alpha: 1 },
			})
			.png()
			.toFile(dest);
		pngPaths.push(dest);
	}

	const ico = await pngToIco(pngPaths);
	await mkdir(path.dirname(DEST), { recursive: true });
	await writeFile(DEST, ico);

	console.log(
		`Gerado: ${path.relative(ROOT, DEST)} (${ico.byteLength} bytes, ${SIZES.map((s) => `${s}×${s}`).join(' + ')})`,
	);
} finally {
	await rm(tmpDir, { recursive: true, force: true });
}
