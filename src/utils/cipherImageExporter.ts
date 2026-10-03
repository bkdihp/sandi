import { CipherType } from '../components/CipherWorkbench';
import { getSemaphorePose, getArmAnglesForView, REST_POSE } from './semaphoreData';

/**
 * Builds an SVG string for a Scout Semaphore peraga figure matching the simulator.
 */
function buildSemaphoreFigureSvg(char: string, size = 120): string {
  const isSpace = char === ' ' || char === '';
  const pose = isSpace ? REST_POSE : getSemaphorePose(char);
  const { rightArmScreenDeg, leftArmScreenDeg } = getArmAnglesForView(pose, 'front');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-55 -55 350 340">
    <defs>
      <linearGradient id="flagStaffGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D97706" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </linearGradient>
    </defs>
    <!-- Scout Body -->
    <ellipse cx="112" cy="188" rx="7" ry="4" fill="#291508" />
    <ellipse cx="128" cy="188" rx="7" ry="4" fill="#291508" />
    <rect x="108" y="146" width="9" height="40" rx="3" fill="#451A03" />
    <rect x="123" y="146" width="9" height="40" rx="3" fill="#451A03" />
    <rect x="106" y="141" width="28" height="6" rx="1.5" fill="#1C1917" />
    <rect x="117" y="140" width="6" height="8" rx="1" fill="#F59E0B" />
    <rect x="105" y="98" width="30" height="44" rx="5" fill="#92400E" />
    <rect x="108" y="112" width="9" height="10" rx="2" fill="#78350F" stroke="#B45309" stroke-width="0.5" />
    <rect x="123" y="112" width="9" height="10" rx="2" fill="#78350F" stroke="#B45309" stroke-width="0.5" />
    <polygon points="112,98 128,98 120,118" fill="#F8FAFC" />
    <polygon points="114,98 126,98 120,115" fill="#DC2626" />
    <ellipse cx="120" cy="116" rx="3.5" ry="2.5" fill="#F59E0B" stroke="#D97706" stroke-width="0.8" />
    <path d="M 119 118 L 118 132" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
    <path d="M 121 118 L 122 132" stroke="#F8FAFC" stroke-width="1.5" stroke-linecap="round" />
    <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />
    <ellipse cx="120" cy="74" rx="14" ry="15" fill="#FCD34D" />
    <circle cx="115" cy="73" r="1.6" fill="#1C1917" />
    <circle cx="125" cy="73" r="1.6" fill="#1C1917" />
    <path d="M 117 79 Q 120 83 123 79" fill="none" stroke="#78350F" stroke-width="1.2" stroke-linecap="round" />
    <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
    <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
    <circle cx="111" cy="63" r="2.5" fill="#F59E0B" />
    <!-- Right Arm & Flag -->
    <g transform="rotate(${rightArmScreenDeg} 108 105)">
      <line x1="108" y1="105" x2="108" y2="40" stroke="#92400E" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="108" cy="40" r="3.5" fill="#FCD34D" />
      <line x1="108" y1="44" x2="108" y2="-18" stroke="url(#flagStaffGrad)" stroke-width="3.2" stroke-linecap="round" />
      <polygon points="108,-18 58,-18 108,30" fill="#DC2626" />
      <polygon points="58,-18 58,30 108,30" fill="#FBBF24" />
      <polygon points="108,-18 58,-18 58,30 108,30" fill="none" stroke="#F59E0B" stroke-width="0.8" opacity="0.6" />
    </g>
    <!-- Left Arm & Flag -->
    <g transform="rotate(${leftArmScreenDeg} 132 105)">
      <line x1="132" y1="105" x2="132" y2="40" stroke="#92400E" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="132" cy="40" r="3.5" fill="#FCD34D" />
      <line x1="132" y1="44" x2="132" y2="-18" stroke="url(#flagStaffGrad)" stroke-width="3.2" stroke-linecap="round" />
      <polygon points="132,-18 182,-18 132,30" fill="#DC2626" />
      <polygon points="182,-18 182,30 132,30" fill="#FBBF24" />
      <polygon points="132,-18 182,-18 182,30 132,30" fill="none" stroke="#F59E0B" stroke-width="0.8" opacity="0.6" />
    </g>
  </svg>`;
}

function loadImageAsync(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Generates an HD Canvas rendering of the cipher output.
 */
export async function renderCipherToCanvas(options: {
  type: CipherType;
  text: string;
  outputResult: string;
}): Promise<HTMLCanvasElement> {
  const { type, text, outputResult } = options;

  // Wait for web fonts if needed
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      if (type === 'rumput') await document.fonts.load('50px SandiRumput');
      if (type === 'kotak') await document.fonts.load('50px SandiKotak');
      await document.fonts.ready;
    } catch {
      // Ignore font loading errors and proceed
    }
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2d context');

  const width = 840;
  const padding = 36;
  const contentWidth = width - padding * 2;

  // Compute layout & height based on cipher type
  let contentHeight = 160;

  if (type === 'semafor') {
    const cleanChars = text.toUpperCase().split('').filter((c) => c !== '\n');
    const cols = Math.min(cleanChars.length, 7);
    const rows = Math.ceil(cleanChars.length / Math.max(cols, 1));
    contentHeight = Math.max(160, rows * 110 + 20);
  } else if (type === 'morse') {
    contentHeight = 140;
  } else {
    contentHeight = 160;
  }

  const totalHeight = 130 + contentHeight + 70;

  // Set canvas size (2x retina resolution)
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = totalHeight * scale;
  ctx.scale(scale, scale);

  // 1. Background Paper Canvas
  ctx.fillStyle = '#FAF9F6';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, totalHeight, 24);
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(1, 1, width - 2, totalHeight - 2, 24);
  ctx.stroke();

  // 2. Card Header
  const typeHeaders: Record<CipherType, { title: string; color: string; badgeBg: string }> = {
    morse: { title: 'SANDI MORSE PRAMUKA', color: '#78350F', badgeBg: '#FEF3C7' },
    rumput: { title: 'SANDI RUMPUT PRAMUKA', color: '#15803D', badgeBg: '#DCFCE7' },
    kotak: { title: 'SANDI KOTAK PRAMUKA', color: '#334155', badgeBg: '#F1F5F9' },
    semafor: { title: 'SANDI SEMAFOR PRAMUKA', color: '#B91C1C', badgeBg: '#FEE2E2' },
  };

  const currentHeader = typeHeaders[type];

  // Header Badge
  ctx.fillStyle = currentHeader.badgeBg;
  ctx.beginPath();
  ctx.roundRect(padding, 28, 230, 28, 8);
  ctx.fill();

  ctx.fillStyle = currentHeader.color;
  ctx.font = 'bold 12px Poppins, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(currentHeader.title, padding + 12, 42);

  // Source text info
  ctx.fillStyle = '#78716C';
  ctx.font = '500 13px Poppins, sans-serif';
  const cleanSnippet = text.length > 40 ? text.slice(0, 40) + '...' : text;
  ctx.fillText(`Pesan Asli: "${cleanSnippet}"`, padding, 80);

  // Horizontal divider
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, 102);
  ctx.lineTo(width - padding, 102);
  ctx.stroke();

  // 3. Body Content Area
  const bodyStartY = 120;

  // Background box for content
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(padding, bodyStartY, contentWidth, contentHeight, 16);
  ctx.fill();
  ctx.strokeStyle = '#F0EEEA';
  ctx.stroke();

  if (type === 'morse') {
    // Render Morse text in bold legible dots and dashes
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 26px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Wrap morse lines if long
    const words = outputResult.split('   ');
    const line = words.join('   ');
    if (line.length > 36) {
      const mid = Math.floor(words.length / 2);
      const line1 = words.slice(0, mid).join('   ');
      const line2 = words.slice(mid).join('   ');
      ctx.fillText(line1, width / 2, bodyStartY + contentHeight / 2 - 18);
      ctx.fillText(line2, width / 2, bodyStartY + contentHeight / 2 + 18);
    } else {
      ctx.fillText(outputResult, width / 2, bodyStartY + contentHeight / 2);
    }
  } else if (type === 'rumput') {
    // Render with authentic SandiRumput font
    ctx.fillStyle = '#15803D';
    ctx.font = '64px SandiRumput, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(outputResult, width / 2, bodyStartY + contentHeight / 2);
  } else if (type === 'kotak') {
    // Render with authentic SandiKotak font
    ctx.fillStyle = '#1E293B';
    ctx.font = '60px SandiKotak, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(outputResult, width / 2, bodyStartY + contentHeight / 2);
  } else if (type === 'semafor') {
    // Render with the authentic Simulator Scout peraga figures!
    const chars = text.toUpperCase().split('').filter((c) => c !== '\n');
    const cols = Math.min(chars.length, 7);
    const itemWidth = Math.min(95, (contentWidth - 20) / Math.max(cols, 1));
    const itemHeight = 100;

    let curCol = 0;
    let curRow = 0;
    const startX = padding + (contentWidth - cols * itemWidth) / 2;

    for (const char of chars) {
      const charX = startX + curCol * itemWidth;
      const charY = bodyStartY + 14 + curRow * itemHeight;

      if (char === ' ') {
        // Space indicator
        ctx.fillStyle = '#A8A29E';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('␣', charX + itemWidth / 2, charY + 35);
      } else {
        // Draw the Scout Semaphore SVG peraga
        try {
          const svgMarkup = buildSemaphoreFigureSvg(char, 70);
          const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup);
          const img = await loadImageAsync(dataUrl);
          ctx.drawImage(img, charX + (itemWidth - 64) / 2, charY, 64, 64);
        } catch {
          // Fallback if SVG draw fails
          ctx.fillStyle = '#DC2626';
          ctx.font = 'bold 28px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(char, charX + itemWidth / 2, charY + 35);
        }
      }

      // Letter Tag below figure
      ctx.fillStyle = '#44403C';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char === ' ' ? 'spasi' : char, charX + itemWidth / 2, charY + 74);

      curCol++;
      if (curCol >= cols) {
        curCol = 0;
        curRow++;
      }
    }
  }

  // 4. Card Footer
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#78716C';
  ctx.font = '500 12px Poppins, sans-serif';
  ctx.fillText('Sandi Pramuka · Praja Muda Karana', padding, totalHeight - 28);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#A8A29E';
  ctx.font = '11px monospace';
  ctx.fillText('sandiko.vercel.app', width - padding, totalHeight - 28);

  return canvas;
}

/**
 * Copies cipher to clipboard.
 * - For Morse: copies standard dot-dash text.
 * - For Rumput, Kotak, Semafor: copies as PNG Image directly to clipboard so other apps can display it!
 */
export async function copyCipherSmart(options: {
  type: CipherType;
  text: string;
  outputResult: string;
}): Promise<{ success: boolean; mode: 'text' | 'image'; message: string }> {
  const { type, outputResult } = options;

  // 1. Morse can be copied as text directly
  if (type === 'morse') {
    try {
      await navigator.clipboard.writeText(outputResult);
      return { success: true, mode: 'text', message: 'Tersalin' };
    } catch {
      // Fallback
    }
  }

  // 2. For Rumput, Kotak, Semafor: generate image
  try {
    const canvas = await renderCipherToCanvas(options);

    // Convert to PNG blob
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );

    if (blob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        return { success: true, mode: 'image', message: 'Gambar Tersalin' };
      } catch (clipErr) {
        console.warn('Clipboard image write failed, attempting text fallback', clipErr);
      }
    }

    // Fallback: copy text and trigger download
    await navigator.clipboard.writeText(outputResult);
    downloadCanvasAsPng(canvas, `sandi-${type}.png`);
    return { success: true, mode: 'image', message: 'Gambar Diunduh' };
  } catch (err) {
    console.error('Copy cipher smart failed:', err);
    // Last-resort fallback to plain text
    try {
      await navigator.clipboard.writeText(outputResult);
      return { success: true, mode: 'text', message: 'Tersalin' };
    } catch {
      return { success: false, mode: 'text', message: 'Gagal' };
    }
  }
}

/**
 * Downloads canvas as PNG file
 */
export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
