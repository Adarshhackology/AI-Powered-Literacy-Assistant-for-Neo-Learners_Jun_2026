import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { Sparkle } from '../components/UI/Illustrations';

const languages = [
  { id: 'en', name: 'English', native: 'English', greeting: 'Hello', flag: '🇺🇸' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', greeting: 'नमस्ते', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', greeting: 'నమస్కారం', flag: '🇮🇳' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', greeting: 'வணக்கம்', flag: '🇮🇳' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', greeting: 'ನಮಸ್ಕಾರ', flag: '🇮🇳' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളം', greeting: 'നമസ്കാരം', flag: '🇮🇳' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', greeting: 'নমস্কার', flag: '🇮🇳' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', greeting: 'नमस्कार', flag: '🇮🇳' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', greeting: 'નમસ્તે', flag: '🇮🇳' },
  { id: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', flag: '🇮🇳' },
  { id: 'ur', name: 'Urdu', native: 'اردو', greeting: 'السلام علیکم', flag: '🇵🇰' },
  { id: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', greeting: 'ନମସ୍କାର', flag: '🇮🇳' },
  { id: 'as', name: 'Assamese', native: 'অসমীয়া', greeting: 'নমস্কাৰ', flag: '🇮🇳' },
  { id: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', greeting: 'नमस्ते', flag: '🇮🇳' },
];

export default function AILanguageSelect() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSpeak = (e: React.MouseEvent, text: string, lang: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleContinue = async () => {
    if (!selectedLang) return;
    setLoading(true);
    
    try {
      const username = localStorage.getItem('username') || 'guest';
      const response = await fetch('http://127.0.0.1:8000/api/learn-ai/start-session/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, language: selectedLang })
      });
      
      let sessionId = Date.now().toString();
      if (response.ok) {
        const data = await response.json();
        sessionId = data.session_id || sessionId;
      }
      
      localStorage.setItem('current_ai_lang', selectedLang);
      localStorage.setItem('current_ai_session', sessionId);
      navigate(`/learn-with-ai/assessment/${sessionId}`);
    } catch (err) {
      console.error(err);
      const sessionId = Date.now().toString();
      localStorage.setItem('current_ai_lang', selectedLang);
      navigate(`/learn-with-ai/assessment/${sessionId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      padding: '20px',
      paddingBottom: '110px',
      position: 'relative',
    }}>

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 12 }, { t: '12%', l: '90%', s: 16 },
          { t: '25%', l: '3%', s: 14 }, { t: '45%', l: '95%', s: 10 },
          { t: '70%', l: '4%', s: 18 }, { t: '88%', l: '92%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Top Nav Bar */}
        <nav style={{
          height: '64px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid rgba(255,255,255,0.6)',
        }}>
          <button
            onClick={() => navigate('/learn-with-ai')}
            className="btn-3d"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#1e1040', textDecoration: 'none',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
              background: '#F0F4FF', padding: '8px 16px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🌍</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              Choose Your Language
            </span>
          </div>
        </nav>

        {/* Banner Header */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 50%, #FF4FA3 100%)',
          padding: '24px 32px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 16px 48px rgba(108,76,255,0.35)',
          border: '2px solid rgba(255,255,255,0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: 'white', margin: 0, lineHeight: 1.2 }}>
            Choose Your Language 🌍
          </h1>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '15px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Which language do you want to master today? Tap a card to start!
          </p>
        </div>

        {/* Languages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.name || selectedLang === lang.id;
            return (
              <div
                key={lang.id}
                onClick={() => setSelectedLang(lang.name)}
                className="hover-lift"
                style={{
                  background: isSelected ? '#FFFDF0' : 'white',
                  borderRadius: '20px',
                  padding: '16px',
                  cursor: 'pointer',
                  border: isSelected ? '3px solid #FFD54A' : '1.5px solid #E8EFFF',
                  boxShadow: isSelected ? '0 12px 30px rgba(255,213,74,0.4)' : '0 4px 20px rgba(0,0,0,0.06)',
                  position: 'relative',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '-10px', right: '-10px',
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#FFD54A', color: '#1e1040',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(255,213,74,0.6)',
                    border: '2px solid white',
                  }}>
                    ✓
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', border: '1px solid #E8EFFF',
                  }}>
                    🌐
                  </div>
                  <button 
                    onClick={(e) => handleSpeak(e, lang.greeting, lang.id)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: '#EDE7F6', border: 'none',
                      color: '#6C4CFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040', margin: '0 0 2px' }}>{lang.name}</h3>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#6C4CFF' }}>{lang.native}</div>
                </div>

                <div style={{ background: '#F8FAFF', borderRadius: '12px', padding: '8px 10px', textAlign: 'center', border: '1px solid #E8EFFF' }}>
                  <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#94A3B8' }}>Says</span>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040', margin: '2px 0 0' }}>"{lang.greeting}"</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Bottom Action Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '2px solid rgba(255,255,255,0.6)',
        padding: '14px 24px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: selectedLang ? '#6C4CFF' : '#94A3B8' }}>
            {selectedLang ? `Selected: ${selectedLang} 🎉` : 'Select a language to continue'}
          </div>
          <button
            onClick={handleContinue}
            disabled={!selectedLang || loading}
            className="btn-3d"
            style={{
              background: selectedLang
                ? 'linear-gradient(135deg, #FFD54A, #FF9F43)'
                : '#CBD5E1',
              color: selectedLang ? '#1e1040' : '#94A3B8',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
              padding: '12px 32px', borderRadius: '16px',
              border: 'none',
              borderBottom: selectedLang ? '4px solid #E8A000' : 'none',
              cursor: selectedLang && !loading ? 'pointer' : 'not-allowed',
              boxShadow: selectedLang ? '0 8px 24px rgba(255,213,74,0.5)' : 'none',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? (
              <>Loading <Loader2 className="w-5 h-5 animate-spin" /></>
            ) : (
              <>Continue <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
