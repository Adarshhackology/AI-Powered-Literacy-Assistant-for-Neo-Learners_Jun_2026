import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, Volume2, ShieldCheck, Star, Sparkles, Languages } from 'lucide-react';
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
    english: 'English (US)',
    hindi: 'हिंदी (Hindi)',
    telugu: 'తెలుగు (Telugu)',
    tamil: 'தமிழ் (Tamil)',
    kannada: 'ಕನ್ನಡ (Kannada)',
    malayalam: 'മലയാളം (Malayalam)',
    marathi: 'मराठी (Marathi)',
    bengali: 'বাংলা (Bengali)',
    gujarati: 'ગુજરાતી (Gujarati)',
    punjabi: 'ਪੰਜਾਬੀ (Punjabi)'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-600/10">
            <span className="text-xl font-bold">📚</span>
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">NeoLit AI</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Prominent Language Selector Dropdown */}
          <div className="relative flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all">
            <Languages className="w-4 h-4 text-indigo-500" />
            <select
              value={lang}
              onChange={(e) => handleLangChange(e.target.value as SupportedLanguage)}
              className="bg-transparent border-none outline-none pr-4 cursor-pointer font-bold"
            >
              {Object.keys(languageLabels).map((langKey) => (
                <option key={langKey} value={langKey}>
                  {languageLabels[langKey as SupportedLanguage]}
                </option>
              ))}
            </select>
          </div>

          <Link to="/login" className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors px-3.5 py-2">
            {t.login}
          </Link>
          <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all">
            {t.register}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="lg:col-span-7 space-y-8 relative">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-4 py-1.5 rounded-full text-xs">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            {t.aiAssistance}
          </div>

          {/* Larger headings for adult/basic accessibility */}
          <h1 className="text-4.5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
            {t.title}
          </h1>

          <p className="text-base lg:text-lg text-slate-500 max-w-xl font-medium leading-relaxed">
            {t.subtitle} Learn words, build reading scores, and practice conversations in a simplified visual dashboard designed specifically for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-black px-8 py-4 rounded-2xl shadow-lg shadow-indigo-600/20 text-center transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
              {t.startLearning}
            </Link>
            <a href="#features" className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-2xl text-center shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <span>{t.features}</span>
              <span className="text-indigo-500 font-black">↓</span>
            </a>
          </div>
        </div>

        {/* Visual Mock Showcase */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="backdrop-blur-xl bg-white/90 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/60 w-full max-w-sm relative z-10 hover:scale-[1.02] transition-transform duration-300">
            {/* Mock Chat Card with AI tutor */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">🤖</div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">Neo - AI Tutor</h4>
                <p className="text-xs text-emerald-500 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Active Guideline
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4 font-semibold text-xs text-slate-600">
              <div className="bg-slate-50 text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] border border-slate-100">
                Hello! Let's read this word together: <b>"BEAUTIFUL"</b>. Click the microphone below and say it.
              </div>
              <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto shadow-md">
                "Beau-ti-ful" 🎤
              </div>
              <div className="bg-emerald-50/50 text-emerald-800 p-3 border border-emerald-100/50 rounded-2xl rounded-tl-none max-w-[85%]">
                🌟 Awesome job! Pronunciation: <b>92% Correct</b>. Stress was perfect on "Beau".
              </div>
            </div>

            <div className="flex items-center justify-center pt-2">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-indigo-700 animate-bounce">
                🎤
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-100/20 to-indigo-100/20 rounded-full blur-2xl -z-0" />
        </div>
      </header>

      {/* Accessible Features Cards Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{t.features}</h2>
          <p className="text-slate-500 font-semibold text-sm">Simple layouts, big audio buttons, and smart AI help you master reading and writing at your own pace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-3">📖 {t.readingPractice}</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">Interactive texts, matching exercises, and text-to-speech audio translations in regional scripts.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-3">✍ {t.writingPractice}</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">Sentence structure building, guided grammar assistance, and digital letter tracing simulations.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-3">🎤 {t.voicePractice}</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">Check your pronunciation instantly. Get helpful visual guidelines on syllable timing and stresses.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-3">🤖 {t.aiRecommendation}</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">The AI system automatically recommends custom vocab exercises based on where you face errors.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-3">📊 {t.progressTracking}</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">Simple radar and line charts that clearly show how you are improving week after week.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 mb-3">🏆 {t.achievements}</h3>
            <p className="text-slate-500 leading-relaxed text-xs font-semibold">Earn badges and digital coins as you hit streaks, keeping learning fun, regular, and engaging.</p>
          </div>
        </div>
      </section>

      {/* Impact Indicators Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">10,000+</h3>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">{t.activeLearners}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">20+</h3>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Languages</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">95%</h3>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">{t.successRate}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">24/7</h3>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Free Access</p>
          </div>
        </div>
      </section>

      {/* Localized Testimonials */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Loved by Learners</h2>
            <p className="text-slate-500 mt-2 font-semibold text-sm">Real reviews from learners who built confidence using NeoLit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex text-amber-500 gap-1"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              <p className="text-slate-600 text-xs font-semibold leading-relaxed">"I could not read notices in my village in Marathi. Now, I study 15 minutes everyday in my own language. The AI corrected my accent and helped me gain massive confidence."</p>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Ramesh Deshmukh</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Shopkeeper, Maharashtra</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex text-amber-500 gap-1"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              <p className="text-slate-600 text-xs font-semibold leading-relaxed">"Learning Hindi sentences has made it much easier for me to write bills and chat with my customers. The daily streak badges keep me excited to complete lessons."</p>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Gita Patel</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Artisan, Gujarat</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex text-amber-500 gap-1"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
              <p className="text-slate-600 text-xs font-semibold leading-relaxed">"As a first-generation college student, writing in English was difficult. The assessment and structured lessons helped me improve my reading scores quickly."</p>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Abhishek Roy</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Student, West Bengal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">📚</div>
              <span className="text-xl font-bold text-white">NeoLit AI</span>
            </div>
            <p className="text-xs leading-relaxed font-semibold">Providing high-quality accessible AI literacy training to first generation learners and adults.</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><Link to="/register" className="hover:text-white transition-colors">Select Language</Link></li>
              <li><a href="#features" className="hover:text-white transition-colors">{t.features}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Contact Info</h4>
            <p className="text-xs font-semibold">Email: help@neolit.ai</p>
            <p className="text-xs font-semibold">Helpline: +91 1800-LIT-HELP</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} NeoLit AI. Built with ❤️ for accessible education.</p>
        </div>
      </footer>
    </div>
  );
}
