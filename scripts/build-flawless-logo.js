import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function buildAllLogoVariants() {
  const publicDir = path.resolve('public');
  const assetsDir = path.join(publicDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // 1. Generate Flawless SVG Master (1000 x 1000 px coordinate space)
  // Reconstructing sandiko.jpeg with exact geometric precision
  const masterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Metallic Gold Gradient for Tunas Kelapa exactly as in sandiko.jpeg -->
    <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5B8" />
      <stop offset="20%" stop-color="#FCD34D" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="80%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <!-- Subtle Golden Highlight on Bulb -->
    <linearGradient id="bulbHighlight" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#F59E0B" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#B45309" stop-opacity="0" />
    </linearGradient>

    <!-- Crisp Drop Shadow for Golden Silhouette on Black Inner Core -->
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- ================= MASTER LOGO: PELUIT + TUNAS KELAPA (sandiko.jpeg) ================= -->
  <g id="sandiko-master">

    <!-- 1. THREE BLACK SOUND BLAST RAYS (Radiating from the whistle notch) -->
    <!-- Ray 1 (Leftmost, near-vertical: pointing ~85 deg) -->
    <polygon points="562,442 542,298 566,300" fill="#000000" />

    <!-- Ray 2 (Middle, diagonal: pointing ~56 deg) -->
    <polygon points="572,448 634,334 654,348" fill="#000000" />

    <!-- Ray 3 (Rightmost, low angle: pointing ~14 deg) -->
    <polygon points="584,460 706,420 710,444" fill="#000000" />

    <!-- 2. WHISTLE ATTACHMENT LOOP TAB (Top-left, angled ~148 deg) -->
    <!-- Centered relative to chamber center at (395, 510) -->
    <path
      d="M 284 416
         L 236 376
         C 230 371 234 361 242 355
         L 258 343
         C 266 337 276 341 282 346
         L 330 386 Z"
      fill="#000000"
    />

    <!-- 3. MAIN WHISTLE BODY (Barrel & Outer Chamber) -->
    <!-- Chamber center at (395, 510), outer radius = 160 -->
    <!-- Seamless unified silhouette combining circular chamber + sloping barrel -->
    <path
      d="M 395 350
         /* Arc around the back of the chamber circle to bottom */
         A 160 160 0 1 0 528 596
         /* Bottom edge of barrel extending down-right to mouthpiece */
         L 708 698
         C 714 702 724 698 728 692
         /* Flat perpendicular mouthpiece cut */
         L 772 622
         C 776 616 772 606 766 602
         /* Top edge of barrel extending back up-left to sound notch */
         L 578 456
         /* Sharp sound notch step down */
         L 552 452
         /* Smooth closure back to top of chamber */
         L 395 350 Z"
      fill="#000000"
    />

    <!-- Outer Chamber Solid Black Disk -->
    <circle cx="395" cy="510" r="160" fill="#000000" />

    <!-- 4. CONCENTRIC WHITE GAP RING (Pemisah Cincin Putih Bersih) -->
    <circle cx="395" cy="510" r="132" fill="#FFFFFF" />

    <!-- 5. INNER BLACK DISK (Lingkaran Inti Hitam Pekat) -->
    <circle cx="395" cy="510" r="105" fill="#000000" />

    <!-- 6. AUTHENTIC GOLDEN TUNAS KELAPA (Tegak Sempurna di Tengah Inti Hitam) -->
    <!-- Center: (395, 510) -->
    <g filter="url(#subtleGlow)">
      <!-- Coconut Seed Bulb (Buah Cikal Kelapa dengan Ujung Runcing di Kiri Bawah) -->
      <path
        d="M 352 532
           C 342 535 334 544 336 556
           C 340 572 354 588 376 594
           C 400 600 426 592 440 574
           C 450 560 452 544 444 532
           C 438 522 426 514 414 510
           C 404 506 394 506 384 508
           C 368 512 360 520 352 532 Z"
        fill="url(#goldSheen)"
      />

      <!-- Coconut Root (Akar Cikal Melengkung Halus ke Bawah) -->
      <path
        d="M 426 578
           C 432 588 436 602 444 610
           C 446 614 450 614 448 610
           C 444 602 440 590 436 576 Z"
        fill="url(#goldSheen)"
      />

      <!-- Companion Shoot (Kuncup Frond Kedua di Kiri) -->
      <path
        d="M 412 508
           C 410 492 406 472 398 452
           C 394 442 388 430 392 420
           C 394 416 398 418 402 422
           C 408 436 414 454 418 474
           C 420 488 422 502 420 514 Z"
        fill="url(#goldSheen)"
      />

      <!-- Soaring Main Flame Leaf (Daun Tunas Utama Menjulang Tinggi ke Kanan Atas) -->
      <path
        d="M 420 514
           C 426 494 432 468 434 440
           C 438 410 436 382 426 356
           C 424 350 428 346 430 350
           C 442 374 452 408 454 444
           C 454 474 448 504 438 530
           C 432 536 424 530 420 514 Z"
        fill="url(#goldSheen)"
      />

      <!-- Natural Light Highlight Accent on the Bulb -->
      <path
        d="M 364 536
           C 356 542 352 552 356 560
           C 360 568 368 576 380 578
           C 374 570 368 560 366 550
           C 364 544 364 540 364 536 Z"
        fill="url(#bulbHighlight)"
      />
    </g>
  </g>
</svg>
  `.trim();

  // Save the new pristine master SVG
  const masterSvgPath = path.join(assetsDir, 'logo.svg');
  fs.writeFileSync(masterSvgPath, masterSvg);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), masterSvg);
  console.log('✓ Created pristine public/assets/logo.svg and public/icon.svg');

  const svgBuffer = Buffer.from(masterSvg);

  // 2. Generate All PNG Variants Requested by User
  console.log('Generating all requested PNG size variants...');

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
    await sharp(svgBuffer)
      .resize(s.size, s.size)
      .png()
      .toFile(path.join(assetsDir, s.name));
    console.log(`✓ Created public/assets/${s.name}`);
  }

  // Also save master `public/assets/logo.png` (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(assetsDir, 'logo.png'));
  console.log('✓ Created public/assets/logo.png (512x512)');

  // 3. PWA Icons (Standard, Apple Touch, Favicon, Maskable)
  // Standard PWA 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Created public/pwa-192x192.png');

  // Standard PWA 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Created public/pwa-512x512.png');

  // Apple Touch Icon (180x180) on clean white background for iOS Safari
  const innerForApple = await sharp(svgBuffer)
    .resize(156, 156)
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
    .composite([{ input: innerForApple, top: 12, left: 12 }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // Favicon 64x64
  await sharp(svgBuffer)
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ Created public/favicon.png');

  // Maskable 512x512 with safe-zone margin (Android adaptive icons)
  const innerMaskable = await sharp(svgBuffer)
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
    .composite([{ input: innerMaskable, top: 76, left: 76 }])
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Created public/pwa-maskable-512x512.png');

  // 4. Social Media OpenGraph Share Card (1200 x 630 px)
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
  const logoForOg = await sharp(svgBuffer)
    .resize(340, 340)
    .png()
    .toBuffer();

  await sharp(ogBgBuffer)
    .composite([
      {
        input: logoForOg,
        top: 145,
        left: 750,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');

  console.log('All PNG size variants generated successfully with zero defects!');
}

buildAllLogoVariants().catch((err) => {
  console.error(err);
  process.exit(1);
});
