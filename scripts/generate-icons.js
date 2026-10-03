import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateAllPwaAssets() {
  const publicDir = path.resolve('public');
  const svgLogoPath = path.join(publicDir, 'assets', 'logo.svg');
  const svgBuffer = fs.readFileSync(svgLogoPath);

  console.log('Generating updated PWA & Social Share Icons from new sandiko logo...');

  // 1. App Icon with clean white/cream rounded badge for mobile home screens
  // 512x512 Master Badge
  const logoInner512 = await sharp(svgBuffer)
    .resize(440, 440)
    .png()
    .toBuffer();

  const iconBase512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: logoInner512,
        top: 36,
        left: 36,
      },
    ])
    .png()
    .toBuffer();

  // 1a. Standard 192x192 PWA Icon
  await sharp(iconBase512)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Created public/pwa-192x192.png');

  // 1b. Standard 512x512 PWA Icon
  await sharp(iconBase512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Created public/pwa-512x512.png');

  // 2. Apple Touch Icon (180x180 for iOS Safari)
  await sharp(iconBase512)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // 3. Favicon 64x64
  await sharp(iconBase512)
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ Created public/favicon.png');

  // 4. Maskable 512x512 with 15% safe-zone margin (Android requirement)
  // Safe zone: logo resized to 350x350 (~68%), centered on 512x512 white background
  const logoMaskable = await sharp(svgBuffer)
    .resize(360, 360)
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
    .composite([
      {
        input: logoMaskable,
        top: 76,
        left: 76,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Created public/pwa-maskable-512x512.png');

  // 5. Social Media OpenGraph Share Card (1200 x 630 px)
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

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#ogBg)" />

      <!-- Subtle Accent Rings -->
      <circle cx="920" cy="315" r="240" fill="#27272A" opacity="0.6" />
      <circle cx="920" cy="315" r="210" fill="#FFFFFF" />

      <!-- Left Typography & Info -->
      <g transform="translate(90, 110)">
        <!-- Tagline Badge -->
        <rect x="0" y="0" width="350" height="42" rx="21" fill="#27272A" stroke="#EAB308" stroke-width="1.5" />
        <text x="24" y="27" fill="#FEF08A" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5">
          GERAKAN PRAMUKA INDONESIA
        </text>

        <!-- Main Title -->
        <text x="0" y="130" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" letter-spacing="-1">
          Sandi Pramuka
        </text>

        <!-- Subtitle with Golden Gradient -->
        <text x="0" y="195" fill="url(#goldText)" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800">
          Kriptografi &amp; Telegrafi Lapangan
        </text>

        <!-- Features Bullets -->
        <g transform="translate(0, 260)" fill="#E4E4E7" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500">
          <text x="0" y="0">✦ Simulasi Isyarat Semafor Layar Penuh</text>
          <text x="0" y="44">✦ Audio Peluit Morse Berbagai Akustik Lapangan</text>
          <text x="0" y="88">✦ Sandi Rumput, Sandi Kotak, &amp; Kamus Alfabet</text>
          <text x="0" y="132">✦ Arena Game Interaktif &amp; Lomba Regu</text>
        </g>
      </g>

      <!-- Watermark Border -->
      <rect x="24" y="24" width="1152" height="582" rx="36" fill="none" stroke="#EAB308" stroke-width="2" stroke-opacity="0.3" />
    </svg>
  `;

  // Render OG background, then overlay the 360x360 new logo on the white circle at (740, 135)
  const ogBgBuffer = Buffer.from(ogCardSvg);
  const logoForOg = await sharp(svgBuffer)
    .resize(360, 360)
    .png()
    .toBuffer();

  await sharp(ogBgBuffer)
    .composite([
      {
        input: logoForOg,
        top: 135,
        left: 740,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');

  console.log('All PWA and social share assets updated with new sandiko logo!');
}

generateAllPwaAssets().catch((err) => {
  console.error(err);
  process.exit(1);
});
