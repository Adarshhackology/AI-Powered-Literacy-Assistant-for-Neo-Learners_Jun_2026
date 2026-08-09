import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export const PWAInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent browser default mini-infobar
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '16px 20px',
      border: '2px solid #6C4CFF',
      boxShadow: '0 12px 36px rgba(108, 76, 255, 0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      maxWidth: '420px',
      fontFamily: 'Nunito, sans-serif',
      animation: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(108, 76, 255, 0.3)',
      }}>
        <Smartphone className="w-6 h-6" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1E1040' }}>
          Install NeoLit App 📲
        </div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
          Add to Home Screen for fast offline games & voice practice!
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleInstallClick}
          className="btn-3d"
          style={{
            background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 14px',
            fontFamily: 'Poppins',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(108, 76, 255, 0.3)',
          }}
        >
          <Download className="w-4 h-4" />
          <span>Install</span>
        </button>

        <button
          onClick={() => setShowBanner(false)}
          style={{
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer',
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
