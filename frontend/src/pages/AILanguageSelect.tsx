import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, ArrowRight, Loader2 } from 'lucide-react';

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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'hi-IN'; // Fallback for regional 
    window.speechSynthesis.speak(utterance);
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
      
      let sessionId = Date.now().toString(); // fallback
      if (response.ok) {
        const data = await response.json();
        sessionId = data.session_id || sessionId;
      }
      
      localStorage.setItem('current_ai_lang', selectedLang);
      localStorage.setItem('current_ai_session', sessionId);
      navigate(`/learn-with-ai/assessment/${sessionId}`);
    } catch (err) {
      console.error(err);
      // Fallback
      const sessionId = Date.now().toString();
      localStorage.setItem('current_ai_lang', selectedLang);
      navigate(`/learn-with-ai/assessment/${sessionId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-100 p-4 sm:p-8 font-['Nunito'] flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <button 
          onClick={() => navigate('/learn-with-ai')}
          className="w-fit mb-6 text-slate-500 hover:text-slate-800 flex items-center gap-2 font-black transition-colors bg-white/50 px-4 py-2 rounded-full"
        >
          ← Back
        </button>

        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight drop-shadow-sm">
            Choose Your Language 🌍
          </h1>
          <p className="text-xl text-slate-600 font-bold">
            Which language do you want to master today?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <div
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`relative bg-white rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-xl
                  ${isSelected ? 'ring-4 ring-yellow-400 shadow-xl scale-105 bg-indigo-50/50' : 'shadow-md border-2 border-slate-100'}
                `}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm animate-bounce">
                    ✅
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{lang.flag}</span>
                  <button 
                    onClick={(e) => handleSpeak(e, lang.greeting, lang.id)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-100 text-indigo-500 flex items-center justify-center transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-1">{lang.name}</h3>
                <div className="text-indigo-600 font-bold mb-3">{lang.native}</div>
                <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                  <span className="text-sm font-bold text-slate-500">Says</span>
                  <p className="text-lg font-black text-slate-700">"{lang.greeting}"</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom fixed bar */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t-2 border-slate-200/50 shadow-[0_-10px_40px_rgb(0,0,0,0.05)] z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-slate-500 font-bold text-lg hidden sm:block">
              {selectedLang ? 'Great choice! 🎉' : 'Select a language to continue'}
            </div>
            <button
              onClick={handleContinue}
              disabled={!selectedLang || loading}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-xl transition-all duration-300 w-full sm:w-auto justify-center
                ${selectedLang 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              {loading ? (
                <>Loading <Loader2 className="w-6 h-6 animate-spin" /></>
              ) : (
                <>Continue <ArrowRight className="w-6 h-6" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
