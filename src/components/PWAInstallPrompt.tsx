import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Smartphone, Download, Share2, PlusSquare, Sparkles } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Cek apakah sudah dalam mode Standalone (App Terinstal)
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    // 2. Deteksi iOS
    const detectIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(/crios/i.test(userAgent)); // Cek jika bukan Chrome di iOS
      setIsIOS(isIosDevice);
      return isIosDevice;
    };

    const hasInstalled = checkStandalone();
    const isIosDevice = detectIOS();

    // 3. Listener untuk event instalasi PWA di Android / Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Tampilkan prompt jika belum diinstal dan tidak didefer (dihapus sementara oleh user)
      const dismissedTime = localStorage.getItem('pwa-prompt-dismissed');
      const now = Date.now();
      
      // Tampilkan lagi setelah 3 hari jika ditolak sebelumnya
      if (!dismissedTime || now - parseInt(dismissedTime) > 3 * 24 * 60 * 60 * 1000) {
        if (!hasInstalled) {
          setShowPrompt(true);
        }
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Untuk iOS, karena tidak mendukung beforeinstallprompt, kita tampilkan panduan manual
    if (isIosDevice && !hasInstalled) {
      const dismissedTime = localStorage.getItem('pwa-prompt-dismissed');
      const now = Date.now();
      if (!dismissedTime || now - parseInt(dismissedTime) > 3 * 24 * 60 * 60 * 1000) {
        // Tampilkan prompt instalasi khusus iOS
        setShowPrompt(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Tampilkan native prompt
    deferredPrompt.prompt();

    // Tunggu respon user
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    // Bersihkan deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    // Simpan waktu penolakan agar tidak mengganggu user terus-menerus
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-[84px] left-4 right-4 md:bottom-6 max-w-md md:mx-auto bg-card/90 backdrop-blur-lg border border-border/80 rounded-2xl p-5 shadow-premium z-50 animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        {/* Logo/Icon */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow flex-shrink-0">
          <Smartphone className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-foreground flex items-center gap-1">
              Instal Aplikasi <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
            </span>
          </div>
          <h4 className="text-base font-bold text-foreground">Rekomendasi Olahraga</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Gunakan aplikasi ini di layar utama Anda seperti aplikasi Android asli, hemat memori, dan dapat diakses dengan cepat!
          </p>
        </div>

        {/* Close button */}
        <button 
          onClick={handleDismiss} 
          className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Action Section */}
      <div className="mt-4 pt-4 border-t border-border/40">
        {isIOS ? (
          // Instruksi Instalasi iOS
          <div className="bg-secondary/50 rounded-xl p-3 text-xs space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-1">
              Cara instal di perangkat iOS (iPhone/iPad):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>
                Ketuk tombol <strong className="inline-flex items-center gap-0.5 text-foreground"><Share2 className="h-3 w-3 inline" /> Bagikan (Share)</strong> di Safari.
              </li>
              <li>
                Gulir ke bawah dan ketuk <strong className="inline-flex items-center gap-0.5 text-foreground"><PlusSquare className="h-3 w-3 inline" /> Tambah ke Layar Utama (Add to Home Screen)</strong>.
              </li>
            </ol>
          </div>
        ) : (
          // Tombol Instal Android/Chrome
          <div className="flex gap-2">
            <Button 
              onClick={handleInstallClick} 
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow text-white shadow-glow hover-scale font-semibold text-sm"
              disabled={!deferredPrompt}
            >
              <Download className="mr-2 h-4 w-4" /> Instal Sekarang
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDismiss}
              className="px-4 hover:bg-secondary"
            >
              Nanti Saja
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
