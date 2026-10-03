import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function processSandikoMaster() {
  const publicDir = path.resolve('public');
  const assetsDir = path.join(publicDir, 'assets');
  const masterJpegPath = path.join(assetsDir, 'sandiko.jpeg');

  if (!fs.existsSync(masterJpegPath)) {
    throw new Error(`Master sandiko.jpeg not found at ${masterJpegPath}`);
  }

  console.log('1. Loading master sandiko.jpeg (2048x2048)...');
  const { data, info } = await sharp(masterJpegPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const rgba = Buffer.alloc(width * height * 4);

  console.log('2. Extracting alpha and de-matting checkerboard background...');
  // Accurate pixel-by-pixel de-matting preserving authentic colors and edge anti-aliasing
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 3;
      const dstIdx = (y * width + x) * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // Golden Tunas Kelapa: warm amber/yellow tones
      const isGold = r > 90 && g > 60 && r - b > 20 && g - b > 10;

      if (isGold) {
        rgba[dstIdx] = r;
        rgba[dstIdx + 1] = g;
        rgba[dstIdx + 2] = b;
        rgba[dstIdx + 3] = 255;
      } else {
        const avg = (r + g + b) / 3;
        const isNeutral = Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && Math.abs(r - b) < 12;

        if (isNeutral && avg > 170) {
          // Transparent checkerboard background or gap
          rgba[dstIdx] = 0;
          rgba[dstIdx + 1] = 0;
          rgba[dstIdx + 2] = 0;
          rgba[dstIdx + 3] = 0;
        } else if (isNeutral && avg > 30) {
          // Smooth anti-aliased edge of the black whistle against the checkerboard (~235 avg)
          const alpha = Math.max(0, Math.min(255, Math.round((1 - avg / 235) * 255)));
          rgba[dstIdx] = 0;
          rgba[dstIdx + 1] = 0;
          rgba[dstIdx + 2] = 0;
          rgba[dstIdx + 3] = alpha;
        } else {
          // Solid black whistle body / rays
          rgba[dstIdx] = 0;
          rgba[dstIdx + 1] = 0;
          rgba[dstIdx + 2] = 0;
          rgba[dstIdx + 3] = 255;
        }
      }
    }
  }

  // 3. Trim transparent edges so logo is tightly bounded
  console.log('3. Trimming to tight bounding box...');
  const trimmedBuffer = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`✓ Trimmed size: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 4. Center trimmed logo into square master canvas (2048 x 2048) with 8% padding
  console.log('4. Centering logo into square 2048x2048 master canvas...');
  const targetLogoWidth = Math.round(2048 * 0.84); // 1720 px
  const resizedLogo = await sharp(trimmedBuffer)
    .resize(targetLogoWidth, null, { fit: 'inside' })
    .toBuffer();

  const resizedMeta = await sharp(resizedLogo).metadata();
  const left = Math.round((2048 - (resizedMeta.width || 0)) / 2);
  const top = Math.round((2048 - (resizedMeta.height || 0)) / 2);

  const masterSquareBuffer = await sharp({
    create: {
      width: 2048,
      height: 2048,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resizedLogo, top, left }])
    .png()
    .toBuffer();

  // 5. Generate all logo size variants
  console.log('5. Generating all logo size variants in public/assets/...');
  const sizes = [
    { name: 'logo-16x16.png', size: 16 },
    { name: 'logo-32x32.png', size: 32 },
    { name: 'logo-48x48.png', size: 48 },
    { name: 'logo-64x64.png', size: 64 },
    { name: 'logo-128x128.png', size: 128 },
    { name: 'logo-192x192.png', size: 192 },
    { name: 'logo-256x256.png', size: 256 },
    { name: 'logo-512x512.png', size: 512 },
    { name: 'logo-1024x1024.png', size: 1024 },
  ];

  for (const s of sizes) {
    await sharp(masterSquareBuffer)
      .resize(s.size, s.size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(assetsDir, s.name));
    console.log(`✓ Created public/assets/${s.name}`);
  }

  // Master logo.png (512x512)
  await sharp(masterSquareBuffer)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(assetsDir, 'logo.png'));
  console.log('✓ Created public/assets/logo.png');

  // 6. Create PWA icons with clean white backdrop so black whistle shines on dark/light mobile home screens
  console.log('6. Generating PWA and iOS icons...');

  // Standard PWA 192x192
  const logo192Inner = await sharp(masterSquareBuffer)
    .resize(164, 164)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo192Inner, top: 14, left: 14 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Created public/pwa-192x192.png');

  // Standard PWA 512x512
  const logo512Inner = await sharp(masterSquareBuffer)
    .resize(440, 440)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo512Inner, top: 36, left: 36 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Created public/pwa-512x512.png');

  // Apple Touch Icon 180x180
  const appleInner = await sharp(masterSquareBuffer)
    .resize(150, 150)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: appleInner, top: 15, left: 15 }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // Favicon 64x64
  const favInner = await sharp(masterSquareBuffer)
    .resize(56, 56)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 64,
      height: 64,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: favInner, top: 4, left: 4 }])
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ Created public/favicon.png');

  // PWA Maskable 512x512 with safe-zone margin (~65% scale)
  const maskableInner = await sharp(masterSquareBuffer)
    .resize(340, 340)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: maskableInner, top: 86, left: 86 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Created public/pwa-maskable-512x512.png');

  // 7. Social Media OpenGraph 1200x630
  console.log('7. Generating social media share card og-image.png...');
  const ogCardSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181B" />
          <stop offset="50%" stop-color="#27272A" />
          <stop offset="100%" stop-color="#09090B" />
        </linearGradient>
        <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FEF08A" />
          <stop offset="50%" stop-color="#FACC15" />
          <stop offset="100%" stop-color="#CA8A04" />
        </linearGradient>
      </defs>

      <rect width="1200" height="630" fill="url(#ogBg)" />
      <circle cx="920" cy="315" r="230" fill="#27272A" opacity="0.6" />
      <circle cx="920" cy="315" r="200" fill="#FFFFFF" />

      <g transform="translate(90, 110)">
        <rect x="0" y="0" width="350" height="42" rx="21" fill="#27272A" stroke="#EAB308" stroke-width="1.5" />
        <text x="24" y="27" fill="#FEF08A" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5">
          GERAKAN PRAMUKA INDONESIA
        </text>

        <text x="0" y="130" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" letter-spacing="-1">
          Sandi Pramuka
        </text>

        <text x="0" y="195" fill="url(#goldText)" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800">
          Kriptografi &amp; Telegrafi Lapangan
        </text>

        <g transform="translate(0, 260)" fill="#E4E4E7" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500">
          <text x="0" y="0">✦ Simulasi Isyarat Semafor Layar Penuh</text>
          <text x="0" y="44">✦ Audio Peluit Morse Berbagai Akustik Lapangan</text>
          <text x="0" y="88">✦ Sandi Rumput, Sandi Kotak, &amp; Kamus Alfabet</text>
          <text x="0" y="132">✦ Arena Game Interaktif &amp; Lomba Regu</text>
        </g>
      </g>

      <rect x="24" y="24" width="1152" height="582" rx="36" fill="none" stroke="#EAB308" stroke-width="2" stroke-opacity="0.3" />
    </svg>
  `;

  const ogBgBuffer = Buffer.from(ogCardSvg);
  const logoForOg = await sharp(masterSquareBuffer)
    .resize(320, 320)
    .png()
    .toBuffer();

  await sharp(ogBgBuffer)
    .composite([
      {
        input: logoForOg,
        top: 155,
        left: 760,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');

  // 8. Generate SVG embedding the authentic sandiko.jpeg master in high fidelity
  console.log('8. Generating SVG representations (public/assets/logo.svg & public/icon.svg)...');
  const base64Master = (
    await sharp(masterSquareBuffer)
      .resize(1024, 1024)
      .png()
      .toBuffer()
  ).toString('base64');

  const rasterEmbeddedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
  <image width="1024" height="1024" href="data:image/png;base64,${base64Master}" />
</svg>`;

  fs.writeFileSync(path.join(assetsDir, 'logo.svg'), rasterEmbeddedSvg);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), rasterEmbeddedSvg);
  console.log('✓ Created public/assets/logo.svg and public/icon.svg embedding sandiko master');

  console.log('🎉 All logo and icon variants successfully generated directly from sandiko.jpeg master!');
}

processSandikoMaster().catch((err) => {
  console.error(err);
  process.exit(1);
});
