import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, Volume2, ShieldCheck, HelpCircle, Star, Sparkles, Languages } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <span className="text-xl font-bold">📚</span>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">NeoLit AI</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#statistics" className="hover:text-blue-600 transition-colors">Impact</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Success Stories</a>
          <Link to="/select-language" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Languages className="w-4 h-4 text-blue-500" />
            Languages
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            Join Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="lg:col-span-7 space-y-8 relative">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-xs animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-500" />
            AI-Powered Literacy Tutor
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
            Learn Reading, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Writing & Speaking</span> with Your Personal AI Tutor
          </h1>

          <p className="text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
            Empowering adult learners and first-generation students with personalized literacy tools. Study in your native language with active voice guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/select-language" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 text-center transition-all hover:-translate-y-0.5 active:translate-y-0">
              Start Learning Free
            </Link>
            <a href="#demo" className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-2xl text-center shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <span>Watch Demo</span>
              <span className="text-blue-500">▶</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center relative">
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-sm relative z-10 hover:rotate-2 transition-transform duration-500">
            {/* Mock Chat Card with AI tutor */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">🤖</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Neo - AI Tutor</h4>
                <p className="text-xs text-emerald-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Online Now
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-slate-100 text-slate-800 text-xs p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                Hello! Let's read this word together: <b>"BEAUTIFUL"</b>. Click the microphone below and say it.
              </div>
              <div className="bg-blue-600 text-white text-xs p-3 rounded-2xl rounded-tr-none max-w-[85%] ml-auto shadow-md">
                "Beau-ti-ful" 🎤
              </div>
              <div className="bg-emerald-50 text-emerald-800 text-xs p-3 border border-emerald-100 rounded-2xl rounded-tl-none max-w-[85%]">
                🌟 Awesome job! Pronunciation: <b>92% Correct</b>. Stress was perfect on "Beau".
              </div>
            </div>

            <div className="flex items-center justify-center pt-2">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-blue-700 animate-bounce">
                🎤
              </div>
            </div>
          </div>
          {/* Decorative backdrop blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-60 -z-0" />
        </div>
      </header>

      {/* Features Cards Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Interactive Features Built For Beginners</h2>
          <p className="text-slate-600 font-medium">Simple layouts, audio guides, and smart AI help you master reading and writing at your own pace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">📖 Reading Practice</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Interactive texts, matching exercises, and text-to-speech audio translations in regional scripts.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">✍ Writing Practice</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Sentence structure building, guided grammar assistance, and digital letter tracing simulations.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">🎤 Voice Learning</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Check your pronunciation instantly. Get helpful visual guidelines on syllable timing and stresses.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">🤖 AI Recommendation</h3>
            <p className="text-slate-600 leading-relaxed text-sm">The AI system automatically recommends custom vocab exercises based on where you face errors.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">📊 Progress Tracking</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Simple radar and line charts that clearly show how you are improving week after week.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-3">🏆 Achievements</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Earn badges and digital coins as you hit streaks, keeping learning fun, regular, and engaging.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">10,000+</h3>
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Active Learners</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">20+</h3>
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Regional Languages</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">95%</h3>
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Success Rate</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-black">24/7</h3>
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">AI Tutor Availability</p>
          </div>
        </div>
      </section>

      {/* Watch Demo Mock Section */}
      <section id="demo" className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">See How It Works</h2>
          <p className="text-slate-600">A short visual presentation showing how to navigate the platform in 3 easy steps.</p>
        </div>
        <div className="max-w-3xl mx-auto bg-slate-800 rounded-3xl aspect-video relative overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer border-4 border-white">
          {/* Mock Video Placeholder with image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-blue-900/30" />
          
          <div className="relative z-10 w-20 h-20 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl transition-all group-hover:scale-110">
            ▶
          </div>
          
          <div className="absolute bottom-4 left-6 text-left z-10 text-white">
            <p className="font-bold text-lg">AI Tutor Live Assessment Walkthrough</p>
            <p className="text-xs text-slate-300">Run Time: 2 mins 15 secs</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">Loved by Learners Across India</h2>
            <p className="text-slate-600 mt-2 font-medium">Real reviews from adult learners who built confidence using NeoLit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex text-amber-500 gap-1"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
              <p className="text-slate-700 text-sm italic font-medium">"I could not read notices in my village in Marathi. Now, I study 15 minutes everyday in my own language. The AI corrected my accent and helped me gain massive confidence."</p>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">Ramesh Deshmukh</h4>
                <p className="text-xs text-slate-500">Shopkeeper, Maharashtra</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex text-amber-500 gap-1"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
              <p className="text-slate-700 text-sm italic font-medium">"Learning Hindi sentences has made it much easier for me to write bills and chat with my customers. The daily streak badges keep me excited to complete lessons."</p>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">Gita Patel</h4>
                <p className="text-xs text-slate-500">Artisan, Gujarat</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex text-amber-500 gap-1"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
              <p className="text-slate-700 text-sm italic font-medium">"As a first-generation college student, writing in English was difficult. The assessment and structured lessons helped me improve my reading scores quickly."</p>
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">Abhishek Roy</h4>
                <p className="text-xs text-slate-500">Student, West Bengal</p>
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
            <p className="text-sm leading-relaxed">Providing high-quality accessible AI literacy training to first generation learners and adults.</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/select-language" className="hover:text-white transition-colors">Select Language</Link></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#statistics" className="hover:text-white transition-colors">Impact stats</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Info</h4>
            <p className="text-sm">Email: help@neolit.ai</p>
            <p className="text-sm">Helpline: +91 1800-LIT-HELP</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NeoLit AI. Built with ❤️ for accessible education.</p>
        </div>
      </footer>
    </div>
  );
}
