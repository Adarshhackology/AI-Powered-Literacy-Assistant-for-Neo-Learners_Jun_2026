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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl items-center justify-center shadow-md mb-2">
            <Globe className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Select Your Language</h1>
          <p className="text-slate-500 font-medium text-lg">अपनी भाषा चुनें • మీ భాషను ఎంచుకోండి • ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ</p>
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
