import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, QrCode, Download, Link2 } from 'lucide-react';
import QRCode from 'qrcode';
import { SandiAppLogo } from './ScoutIcons';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrCopied, setQrCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'link' | 'media'>('qr');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Dynamically get the CURRENT active URL (including hash and query)
  const activeUrl = typeof window !== 'undefined' ? window.location.href : 'https://sandi-pramuka.web.app';

  useEffect(() => {
    if (isOpen && activeUrl) {
      QRCode.toDataURL(activeUrl, {
        width: 480,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#1C1917',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Gagal membuat QR Code:', err));
    }
  }, [isOpen, activeUrl]);

  if (!isOpen) return null;

  const shareTitle = 'Sandi — Kriptografi & Telegrafi Sandi Pramuka';
  const shareText =
    'Yuk belajar dan pecahkan sandi Pramuka (Morse, Rumput, Kotak, Semafor) dengan aplikasi Sandi! Lengkap dengan simulasi bendera dan audio peluit:';
  const fullShareMessage = `${shareText}\n${activeUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = 'sandi-pramuka-qr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyQrImage = async () => {
    if (!qrCodeDataUrl) return;
    try {
      const res = await fetch(qrCodeDataUrl);
      const blob = await res.blob();
      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setQrCopied(true);
        setTimeout(() => setQrCopied(false), 2000);
      }
    } catch {
      handleCopyLink();
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: activeUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareMessage)}`,
    },
    {
      name: 'Telegram',
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.197 1.006.128.832.942z"/>
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodeURIComponent(activeUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'X',
      color: 'bg-stone-900 hover:bg-black text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(activeUrl)}`,
    },
    {
      name: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activeUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-scaleUp">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <SandiAppLogo className="w-7 h-7" />
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Bagikan
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls (Single-word buttons) */}
        <div className="flex items-center border-b border-stone-200 px-4 pt-3 gap-2 bg-stone-50/40">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Kode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'link'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Tautan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'media'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Kanal</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4">
          {/* TAB 1: QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-white rounded-2xl border-2 border-stone-200 shadow-xs relative group">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code URL Aktif Sandi"
                    className="w-52 h-52 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center text-xs text-stone-400">
                    Membuat...
                  </div>
                )}
              </div>

              <div className="w-full bg-stone-50 rounded-xl p-2.5 border border-stone-200 text-left">
                <span className="text-[10px] font-mono text-stone-400 block uppercase font-bold">
                  URL Aktif:
                </span>
                <p className="text-xs font-mono text-stone-700 truncate mt-0.5 select-all">
                  {activeUrl}
                </p>
              </div>

              {/* QR Action Buttons */}
              <div className="w-full grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Unduh gambar QR Code"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyQrImage}
                  className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-stone-300 shadow-2xs cursor-pointer active:scale-95"
                  title="Salin QR Code ke Clipboard"
                >
                  {qrCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{qrCopied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LINK & DIRECT COPY */}
          {activeTab === 'link' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-stone-100 rounded-xl p-1.5 border border-stone-200">
                <input
                  type="text"
                  readOnly
                  value={activeUrl}
                  className="flex-1 bg-transparent px-2 text-xs font-mono text-stone-700 outline-none select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-amber-800 hover:bg-amber-900 text-white shadow-xs'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Bagikan</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 3: MEDIA CHANNELS */}
          {activeTab === 'media' && (
            <div className="grid grid-cols-2 gap-2.5">
              {shareChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs active:scale-95 cursor-pointer ${channel.color}`}
                >
                  {channel.icon}
                  <span>{channel.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
