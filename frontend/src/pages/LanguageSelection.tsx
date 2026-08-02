import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupportedLanguage } from '../utils/translationHelper';
import { Globe, ArrowRight } from 'lucide-react';

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  example: string;
  nativeExample: string;
  flag: string;
}

const languagesList: LanguageOption[] = [
  { code: 'english', name: 'English', nativeName: 'English', example: 'Hello', nativeExample: 'Hello', flag: '🇬🇧' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', example: 'Namaste', nativeExample: 'नमस्ते', flag: '🇮🇳' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', example: 'Namaste', nativeExample: 'నమస్తే', flag: '🇮🇳' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', example: 'Vanakkam', nativeExample: 'வணக்கம்', flag: '🇮🇳' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', example: 'Namaskara', nativeExample: 'ನಮಸ್ಕಾರ', flag: '🇮🇳' },
  { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', example: 'Namaskaram', nativeExample: 'നമസ്കാരം', flag: '🇮🇳' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', example: 'Namaskar', nativeExample: 'नमस्कार', flag: '🇮🇳' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', example: 'Nomoshkar', nativeExample: 'নমস্কার', flag: '🇮🇳' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', example: 'Namaste', nativeExample: 'નમસ્તે', flag: '🇮🇳' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', example: 'Sat Sri Akal', nativeExample: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', flag: '🇮🇳' }
];

export default function LanguageSelection() {
  const [selected, setSelected] = useState<SupportedLanguage>('english');
  const navigate = useNavigate();

  const handleContinue = () => {
    // Persist language setting
    localStorage.setItem('preferredLanguage', selected);
    // Navigate to register (or login) page
    navigate('/register');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.3) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      fontFamily: 'Nunito, sans-serif',
      padding: '48px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
          }}>
            <Globe className="w-8 h-8" />
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '38px', color: 'white', margin: 0 }}>
            Select Your <span style={{ color: '#FF4FA3' }}>Language</span>
          </h1>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '15px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            अपनी भाषा चुनें • మీ భాషను ఎంచుకోండి • ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {languagesList.map((lang) => (
            <div
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all hover:scale-[1.03] select-none text-center flex flex-col items-center justify-between min-h-[160px] ${
                selected === lang.code
                  ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-base leading-none">{lang.nativeName}</h3>
                <p className="text-xs text-slate-400 font-medium">{lang.name}</p>
              </div>
              <div className="mt-4 bg-slate-50 border border-slate-100 text-slate-800 text-xs px-3 py-1 rounded-full font-bold">
                "{lang.nativeExample}"
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleContinue}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
