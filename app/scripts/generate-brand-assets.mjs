import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Module } from 'node:module';

Module._initPaths();

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, '..');
const workspaceDir = path.resolve(appDir, '..');
const sourceLogoPath = path.join(workspaceDir, 'logo3.svg');
const imageDir = path.join(appDir, 'assets', 'images');

const sourceSvg = fs.readFileSync(sourceLogoPath, 'utf8');

function tintLogo(color) {
  return sourceSvg.replace('</style>', `\npath:not(.st0){fill:${color};}\n</style>`);
}

async function renderLogo(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size, { fit: 'contain' }).png().toBuffer();
}

async function renderIcon(outputPath, logoSize) {
  const logo = await renderLogo(tintLogo('#F4E8FF'), logoSize);

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: '#251433',
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(outputPath);
}

await fs.promises.mkdir(imageDir, { recursive: true });

await sharp(await renderLogo(tintLogo('#251433'), 1024))
  .png()
  .toFile(path.join(imageDir, 'via-la-maschera-logo.png'));

await sharp(await renderLogo(tintLogo('#F4E8FF'), 1024))
  .png()
  .toFile(path.join(imageDir, 'via-la-maschera-logo-light.png'));

await sharp(await renderLogo(tintLogo('#F4E8FF'), 64))
  .png()
  .toFile(path.join(imageDir, 'via-la-maschera-logo-header-light.png'));

await renderIcon(path.join(imageDir, 'icon.png'), 760);
await renderIcon(path.join(imageDir, 'splash-icon.png'), 620);

await sharp(await renderLogo(tintLogo('#F4E8FF'), 1024))
  .png()
  .toFile(path.join(imageDir, 'android-icon-foreground.png'));

await sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 4,
    background: '#251433',
  },
})
  .png()
  .toFile(path.join(imageDir, 'android-icon-background.png'));

await sharp(await renderLogo(tintLogo('#251433'), 1024))
  .png()
  .toFile(path.join(imageDir, 'android-icon-monochrome.png'));

const faviconLogo = await renderLogo(tintLogo('#F4E8FF'), 46);

await sharp({
  create: {
    width: 64,
    height: 64,
    channels: 4,
    background: '#251433',
  },
})
  .composite([{ input: faviconLogo, gravity: 'center' }])
  .png()
  .toFile(path.join(imageDir, 'favicon.png'));

await fs.promises.copyFile(sourceLogoPath, path.join(imageDir, 'via-la-maschera-logo.svg'));
