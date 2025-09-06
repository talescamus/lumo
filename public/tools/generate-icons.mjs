import sharp from 'sharp';
import {mkdir, writeFile} from 'node:fs/promises';

await mkdir('public', {recursive: true});

// tamanhos recomendados
const sizesPng = [16, 32, 48, 64, 128, 180, 192, 256, 384, 512];

// gera PNGs a partir do SVG principal
for (const s of sizesPng) {
  await sharp('public/favicon.svg').resize(s, s).png().toFile(`public/favicon-${s}x${s}.png`);
}

// apple touch
await sharp('public/favicon.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png');

// maskable (PWA)
await sharp('public/maskable-icon.svg').resize(512, 512).png().toFile('public/maskable-icon-512.png');

// multi-size ICO (16/32/48/64)
await sharp('public/favicon.svg')
  .resize(16, 16)
  .toFormat('ico', {sizes: [16, 32, 48, 64]})
  .toFile('public/favicon.ico');

// Manifest (gera/atualiza básico)
const manifest = {
  name: "Lumo",
  short_name: "Lumo",
  start_url: "/",
  display: "standalone",
  background_color: "#0B0F15",
  theme_color: "#0B0F15",
  icons: [
    {"src": "/favicon-192x192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png"},
    {"src": "/maskable-icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
  ]
};
await writeFile('public/manifest.webmanifest', JSON.stringify(manifest, null, 2));
console.log('✓ Ícones e manifest gerados!');
