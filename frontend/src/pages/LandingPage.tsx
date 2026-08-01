import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Languages } from 'lucide-react';
import { SupportedLanguage, translations } from '../utils/translationHelper';

export default function LandingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<SupportedLanguage>('english');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (saved) {
      setLang(saved);
    }
  }, []);

  const handleLangChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  const t = translations[lang] || translations.english;

  const languageLabels: Record<SupportedLanguage, string> = {
    english: 'English (US) 🇺🇸',
    hindi: 'हिंदी (Hindi) 🇮🇳',
    telugu: 'తెలుగు (Telugu) 🇮🇳',
    tamil: 'தமிழ் (Tamil) 🇮🇳',
    kannada: 'ಕನ್ನಡ (Kannada) 🇮🇳',
    malayalam: 'മലയാളം (Malayalam) 🇮🇳',
    marathi: 'मराठी (Marathi) 🇮🇳',
    bengali: 'বাংলা (Bengali) 🇮🇳',
    gujarati: 'ગુજરાતી (Gujarati) 🇮🇳',
    punjabi: 'ਪੰਜਾਬੀ (Punjabi) 🇮🇳'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100/40 text-slate-800 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b-4 border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 cursor-pointer hover-pop" onClick={() => navigate('/')}>
          <div className="w-11 h-11 bg-gradient-to-tr from-yellow-400 via-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-md rotate-[-3deg] animate-float">
            📚
          </div>
          <span className="text-2xl font-black text-slate-850 tracking-tight leading-none mt-1">NeoLit Adventure</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center gap-1.5 bg-slate-50 border-2 border-slate-200/80 px-3 py-2 rounded-2xl text-xs font-black text-slate-700 hover:bg-slate-100 transition-all">
            <Languages className="w-4 h-4 text-indigo-500" />
            <select
              value={lang}
              onChange={(e) => handleLangChange(e.target.value as SupportedLanguage)}
              className="bg-transparent border-none outline-none pr-4 cursor-pointer font-black"
            >
              {Object.keys(languageLabels).map((langKey) => (
                <option key={langKey} value={langKey}>
                  {languageLabels[langKey as SupportedLanguage]}
                </option>
              ))}
            </select>
          </div>

          <Link to="/login" className="text-xs font-black text-slate-650 hover:text-indigo-650 px-3.5 py-2.5 border-2 border-transparent hover:border-slate-100 rounded-2xl transition-all">
            {t.login} 🔑
          </Link>
          <Link to="/register" className="bg-gradient-to-r from-indigo-500 to-blue-500 border-b-4 border-indigo-700 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-sm hover-pop active:border-b-0 active:mt-1">
            {t.register} 🚀
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Playful Floating elements */}
        <span className="absolute top-10 left-[15%] text-6xl opacity-20 select-none animate-float">🎈</span>
        <span className="absolute top-[40%] right-[10%] text-6xl opacity-25 select-none animate-float" style={{ animationDelay: '1.5s' }}>🦄</span>
        <span className="absolute bottom-5 left-[30%] text-5xl opacity-15 select-none">✏️</span>

        <div className="lg:col-span-7 space-y-8 relative text-left">
          <div className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-yellow-250 text-yellow-800 font-black px-4.5 py-2 rounded-full text-xs shadow-sm rotate-[-1deg]">
            <Sparkles className="w-4 h-4 text-yellow-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI Literacy Adventure For Kids!</span>
          </div>

          <h1 className="text-5xl lg:text-6.5xl font-black text-slate-850 leading-[1.1] tracking-tight">
            Read, Speak & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">Play with Words!</span>
          </h1>

          <p className="text-base lg:text-lg text-slate-500 max-w-xl font-bold leading-relaxed">
            Welcome to your magical literacy lab! NeoLit is an educational playground that helps you master letters, trace sentence structures, and practice voice conversations with interactive sticker rewards!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/register" className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 border-b-6 border-orange-600 text-slate-900 text-base font-black px-8 py-4.5 rounded-3xl shadow-md text-center transition-all hover-pop active:border-b-0 active:mt-1.5 cursor-pointer">
              Start Learning Game 🚀
            </Link>
            <a href="#features" className="bg-white border-2 border-b-4 border-slate-200 text-slate-700 font-black px-8 py-4.5 rounded-3xl text-center shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:border-b-0 active:mt-1">
              <span>View Playground Features 👇</span>
            </a>
          </div>
        </div>

        {/* Visual Mock Showcase (Sticker Board Mock) */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="bg-white border-4 border-b-8 border-slate-100 p-7 rounded-[40px] shadow-xl w-full max-w-sm relative z-10 hover:scale-[1.02] transition-transform duration-300">
            {/* Mascot Image Illustration */}
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-100 to-indigo-100 p-2 border-4 border-indigo-200 shadow-lg flex items-center justify-center">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=neolit-mascot" alt="NeoLit Kid Mascot" className="w-full h-full object-contain animate-bounce-slow" />
              </div>
            </div>
            
            {/* Mock Chat Card with AI tutor */}
            <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4 mb-4">
              <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-lg rotate-[-5deg]">🤖</div>
              <div className="text-left">
                <h4 className="font-extrabold text-sm text-slate-800">Neo - AI Playmate</h4>
                <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> ONLINE & READY
                </p>
              </div>
            </div>

            <div className="space-y-3.5 mb-5 font-bold text-xs text-slate-650">
              <div className="bg-slate-50 border border-slate-100 text-slate-800 p-3.5 rounded-3xl rounded-tl-none max-w-[85%] text-left">
                Say: <b>"LITERACY"</b>! 🗣️
              </div>
              <div className="bg-indigo-500 text-white p-3.5 rounded-3xl rounded-tr-none max-w-[85%] ml-auto text-right shadow-sm">
                "Lit-er-a-cy" 🎤
              </div>
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-3xl rounded-tl-none max-w-[85%] text-left flex items-center gap-2">
                <span>🌟 Super! Score: <b>98%</b>!</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer animate-bounce hover:brightness-105">
                🎤
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Playground Feature Cards with Illustrations */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t-4 border-slate-100">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3.5xl font-black text-slate-850 tracking-tight">🎒 NeoLit Learning Playground</h2>
          <p className="text-slate-500 font-extrabold text-sm">Tap any section to explore interactive visual exercises for students!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Reading */}
          <div className="bg-white p-6 rounded-[36px] border-4 border-b-8 border-slate-200/60 shadow-sm hover-pop transition-all text-left">
            <div className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="/vocab_book.png" alt="Reading Illustration" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-850 mb-2">📖 Reading Matches</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Play matching cards to connect sounds, letters, and words with beautiful picture sticker blocks.</p>
          </div>

          {/* Card 2: Writing */}
          <div className="bg-white p-6 rounded-[36px] border-4 border-b-8 border-slate-200/60 shadow-sm hover-pop transition-all text-left">
            <div className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="/level_sentences_1783340032385.png" alt="Writing Illustration" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-850 mb-2">✍️ Tracing Sentences</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Practice writing sentences and study capitalization rules with real-time spelling check tips.</p>
          </div>

          {/* Card 3: Speaking */}
          <div className="bg-white p-6 rounded-[36px] border-4 border-b-8 border-slate-200/60 shadow-sm hover-pop transition-all text-left">
            <div className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="/level_alphabet_1783340004005.png" alt="Speaking Illustration" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-850 mb-2">🎤 Voice Pronunciation</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Speak aloud into your microphone! Get immediate scores showing syllable stress advice and timing.</p>
          </div>

          {/* Card 4: AI recommendation */}
          <div className="bg-white p-6 rounded-[36px] border-4 border-b-8 border-slate-200/60 shadow-sm hover-pop transition-all text-left">
            <div className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="/level_mastery_1783340074714.png" alt="AI Recommendation Illustration" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-850 mb-2">🤖 Smart Study Recommendations</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">The AI tutor checks your quiz logs and dynamically suggests the best two lessons in your level to complete next.</p>
          </div>

          {/* Card 5: Sticker book */}
          <div className="bg-white p-6 rounded-[36px] border-4 border-b-8 border-slate-200/60 shadow-sm hover-pop transition-all text-left">
            <div className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="/vocab_banana.png" alt="Sticker Book Illustration" className="w-32 h-32 object-contain animate-float" />
            </div>
            <h3 className="text-lg font-black text-slate-850 mb-2">🎨 Sticker Album</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Unlock cool animal, fruit, and tool stickers for your profile album by passing reading and talking drills!</p>
          </div>

          {/* Card 6: Champions League */}
          <div className="bg-white p-6 rounded-[36px] border-4 border-b-8 border-slate-200/60 shadow-sm hover-pop transition-all text-left">
            <div className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="/level_stories_1783340046772.png" alt="Champions League Illustration" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="text-lg font-black text-slate-850 mb-2">🏆 Weekly Champions League</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Compete with online friends, maintain your daily study streaks, and rank at the top of the leaderboards!</p>
          </div>

        </div>
      </section>

      {/* Bubbly Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t-4 border-slate-950 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-xs font-black tracking-widest text-slate-500 uppercase">Magical Literacy Playground © 2026</p>
          <p className="text-[10px] text-slate-650 font-bold max-w-md mx-auto leading-relaxed">Created to help children and basic learners build reading, writing, and communication confidence with gaming UI feedback.</p>
        </div>
      </footer>

    </div>
  );
}
