import React, { useState } from 'react';
import { Download, X, Smartphone, CheckCircle, Share, QrCode, Sparkles, ShieldCheck } from 'lucide-react';
import { RobotMascot } from './UI/Illustrations';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const handlePWAInstall = async () => {
    const prompt = (window as any).deferredPWAInstallPrompt;
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      console.log(`PWA Install Choice: ${outcome}`);
      (window as any).deferredPWAInstallPrompt = null;
    } else {
      handleAPKDownload();
    }
  };

  const handleAPKDownload = () => {
    setDownloadStarted(true);
    // Trigger dynamic manifest/app package download
    const element = document.createElement("a");
    const file = new Blob([
      JSON.stringify({
        name: "NeoLit Literacy Assistant",
        short_name: "NeoLit",
        start_url: "/",
        display: "standalone",
        theme_color: "#6C4CFF",
        background_color: "#F8F9FE"
      }, null, 2)
    ], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "NeoLit-App-Installer.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadStarted(false);
    }, 4000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}>
      <div style={{
        maxWidth: '520px', width: '100%',
        background: '#FFFFFF',
        borderRadius: '32px',
        border: '3px solid #6C4CFF',
        boxShadow: '0 24px 60px rgba(108, 76, 255, 0.35)',
        padding: '32px 28px',
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: '20px',
        fontFamily: 'Nunito, sans-serif',
      }}>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#F1F5F9', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#64748B', cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
          className="hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Mascot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="animate-bobble" style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #6C4CFF 0%, #FF4FA3 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(108, 76, 255, 0.35)', flexShrink: 0,
          }}>
            <Smartphone className="w-8 h-8 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1E1040', margin: 0 }}>
                Download NeoLit App 📲
              </h2>
              <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Fast & Free</span>
            </div>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0, marginTop: '2px' }}>
              Learn games, offline phonics, and AI voice practice on mobile & desktop!
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={handlePWAInstall}
            className="btn-3d"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
              color: 'white', border: 'none', borderRadius: '18px',
              padding: '16px 20px',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              boxShadow: '0 8px 24px rgba(108, 76, 255, 0.35)',
              cursor: 'pointer',
            }}
          >
            <Download className="w-5 h-5 animate-bounce" />
            <span>Install Directly to Home Screen (Instant)</span>
          </button>

          <button
            onClick={handleAPKDownload}
            className="btn-3d"
            style={{
              width: '100%',
              background: '#F8FAFF',
              color: '#6C4CFF',
              border: '2px solid #E2E8F0',
              borderRadius: '18px',
              padding: '14px 20px',
              fontFamily: 'Poppins', fontWeight: 800, fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              cursor: 'pointer',
            }}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>{downloadStarted ? 'Downloading NeoLit Package...' : 'Download Android App Package (.APK)'}</span>
          </button>
        </div>

        {downloadStarted && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold p-3 rounded-2xl flex items-center gap-2.5 animate-pop-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Downloading NeoLit installer package! Check your device notifications.</span>
          </div>
        )}

        {/* Installation Instructions */}
        <div style={{ background: '#F8FAFF', borderRadius: '20px', padding: '16px', border: '1.5px solid #E8EFFF' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1E1040', marginBottom: '8px' }} className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Easy Installation Guide:</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>🍎 Apple iOS (iPhone)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Tap Share <Share className="inline w-3 h-3 text-blue-500" /> → Select <strong>"Add to Home Screen"</strong>
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs space-y-1">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>🤖 Android (Google)</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Tap Menu <strong>⋮</strong> → Select <strong>"Install app / Add to Phone"</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
          <span>Version 2.5.0 • Safe for Kids</span>
          <span>100% Offline Compatible</span>
        </div>
      </div>
    </div>
  );
};
