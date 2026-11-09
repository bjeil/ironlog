import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svg = await readFile(path.join(root, 'public/icons/icon.svg'));

await mkdir(path.join(root, 'public/icons'), { recursive: true });

await sharp(svg).resize(192, 192).png().toFile(path.join(root, 'public/icons/icon-192.png'));
await sharp(svg).resize(512, 512).png().toFile(path.join(root, 'public/icons/icon-512.png'));
await sharp(svg)
  .resize(512, 512, { fit: 'contain', background: '#0c1420' })
  .png()
  .toFile(path.join(root, 'public/icons/icon-512-maskable.png'));

console.log('Ikoner generert: icon-192.png, icon-512.png, icon-512-maskable.png');
