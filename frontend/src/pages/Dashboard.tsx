import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { SupportedLanguage, translations } from '../utils/translationHelper';
import { 
  BookOpen, Mic, Trophy, Calendar, LogOut, 
  Settings, Bell, Search, Sparkles, TrendingUp,
  Flame, Coins, Award, Lock, ChevronRight, Play, Check, Shield
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  const [activeLevel, setActiveLevel] = useState<string>('Beginner');
  
  const [profile, setProfile] = useState<any>({
    fullName: username.toUpperCase(),
    avatar: '🧑‍🎓',
    xp: 249,
    coins: 80,
    streak: 1,
    level: 3,
    badges: ['First Lesson', '7 Day Streak', 'Level Explorer', 'Reading Star', 'Perfect Score'],
    completedLessons: [1, 2]
  });

  const [lessons, setLessons] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [lang, setLang] = useState<SupportedLanguage>('english');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const savedLang = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (savedLang) {
      setLang(savedLang);
    }

    const fetchData = async () => {
      try {
        const prof = await apiClient.getProfile(username);
        if (prof) {
          setProfile({
            ...prof,
            fullName: (prof.fullName || username).toUpperCase()
          });
        }

        const less = await apiClient.getLessons();
        setLessons(less || []);

        const lb = await apiClient.getGamificationLeaderboard();
        if (lb && lb.leaderboard) {
          setLeaderboard(lb.leaderboard);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [username, navigate]);

  const t = translations[lang] || translations.english;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const championsList = [
    { rank: 1, name: 'Adarsh', level: 5, xp: 1560, avatar: '👨‍🎓' },
    { rank: 2, name: 'Siddharth', level: 5, xp: 1480, avatar: '👨‍🎓' },
    { rank: 3, name: 'Priya', level: 5, xp: 1350, avatar: '👩‍🎓' },
    { rank: 4, name: 'Aashi', level: 4, xp: 1200, avatar: '👧' },
    { rank: 5, name: 'Yashwi', level: 4, xp: 1100, avatar: '👦' },
  ];

  const continueLessons = [
    { id: 1, title: 'Reading Comprehension', subtitle: 'Module 2 • Lesson 4', progress: 75, color: 'from-purple-500 to-indigo-600', icon: '📖' },
    { id: 2, title: 'Creative Writing', subtitle: 'Module 1 • Lesson 3', progress: 40, color: 'from-pink-500 to-rose-600', icon: '✍️' },
    { id: 3, title: 'Spoken English', subtitle: 'Module 3 • Lesson 1', progress: 60, color: 'from-sky-500 to-blue-600', icon: '🗣️' },
    { id: 4, title: 'Vocabulary Builder', subtitle: 'Module 2 • Lesson 6', progress: 30, color: 'from-emerald-500 to-teal-600', icon: '📚' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EAF7FF] via-[#F5FAFF] to-[#FDFDFF] text-slate-800 font-nunito p-4 md:p-6 relative overflow-x-hidden">
      
      {/* Animated Sky Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-8 left-[20%] text-4xl opacity-30 animate-float select-none">☁️</span>
        <span className="absolute top-16 right-[15%] text-5xl opacity-30 animate-float select-none" style={{ animationDelay: '1.5s' }}>☁️</span>
        <span className="absolute top-32 left-[45%] text-3xl opacity-20 animate-float select-none" style={{ animationDelay: '2.5s' }}>🎈</span>
        <span className="absolute top-48 right-[30%] text-3xl opacity-25 animate-float select-none">✨</span>
      </div>

      <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row gap-6 relative z-10">
        
        {/* ================= SIDEBAR (280px, Glass Effect, rounded-32px) ================= */}
        <aside className="w-full lg:w-[280px] bg-white/90 backdrop-blur-xl border-4 border-white shadow-2xl shadow-indigo-100 rounded-[32px] p-5 flex flex-col justify-between shrink-0 space-y-6">
          
          <div className="space-y-6">
            {/* Animated Logo */}
            <div className="flex items-center gap-3 px-2 cursor-pointer hover-pop" onClick={() => navigate('/')}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-3xl shadow-lg border-2 border-yellow-200 animate-bounce-slow">
                ⭐
              </div>
              <div>
                <h1 className="text-2xl font-black text-indigo-900 tracking-tight font-poppins leading-none">NeoLit</h1>
                <span className="text-sm font-black text-amber-500 tracking-wider uppercase font-poppins">Game</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <Link 
                to="/dashboard" 
                className="flex items-center justify-between bg-gradient-to-r from-[#6C4DFF] to-[#8B5CFF] text-white font-black px-4 py-3 rounded-2xl text-sm shadow-lg shadow-purple-200 transition-all hover-pop border-b-4 border-indigo-900"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🏠</span>
                  <span>Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white" />
              </Link>

              <Link 
                to="/learn-with-ai" 
                className="flex items-center justify-between bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🧠</span>
                  <span>Learn with AI</span>
                </div>
                <span className="bg-pink-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">NEW</span>
              </Link>

              <Link 
                to="/learn-with-ai" 
                className="flex items-center justify-between bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎯</span>
                  <span>आज के लक्ष्य</span>
                </div>
              </Link>

              <Link 
                to="/vocabulary" 
                className="flex items-center justify-between bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎨</span>
                  <span>Sticker Book</span>
                </div>
              </Link>

              <Link 
                to="/reports" 
                className="flex items-center justify-between bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📊</span>
                  <span>My Progress</span>
                </div>
              </Link>

              <Link 
                to="/store" 
                className="flex items-center justify-between bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎁</span>
                  <span>Rewards Store</span>
                </div>
              </Link>

              <Link 
                to="/leaderboard" 
                className="flex items-center justify-between bg-white hover:bg-yellow-50 text-slate-700 hover:text-yellow-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🏆</span>
                  <span>Leaderboard</span>
                </div>
              </Link>

              <Link 
                to="/reports" 
                className="flex items-center justify-between bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🛡️</span>
                  <span>My Badges</span>
                </div>
              </Link>

              <Link 
                to="/admin" 
                className="flex items-center justify-between bg-white hover:bg-slate-100 text-slate-700 font-extrabold px-4 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚙️</span>
                  <span>Admin Desk</span>
                </div>
              </Link>
            </nav>
          </div>

          {/* Bottom Sidebar Mascots & Daily Tip Card */}
          <div className="space-y-4 pt-4 border-t-2 border-slate-100">
            {/* Waving Dragon Mascot */}
            <div className="relative bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl p-4 text-white flex items-center justify-between shadow-lg overflow-hidden border-2 border-purple-300">
              <div className="flex items-center gap-3 z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur p-1 overflow-hidden shrink-0 flex items-center justify-center">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=dino-mascot" alt="Dino Mascot" className="w-full h-full object-contain animate-bounce-slow" />
                </div>
                <div>
                  <div className="bg-white text-indigo-900 font-black text-[10px] px-2 py-0.5 rounded-full inline-block shadow-sm">
                    You Are Amazing!
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Tip Card */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 rounded-3xl space-y-1 shadow-md border border-purple-400/40">
              <h5 className="font-black text-xs text-yellow-300 flex items-center gap-1">
                <span>💡</span> Daily Tip
              </h5>
              <p className="text-xs font-bold text-purple-100 leading-snug">
                Small steps today, big dreams tomorrow! 🌟
              </p>
            </div>
          </div>

        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* TOP NAVIGATION BAR (90px height, Floating Glass Bar) */}
          <header className="h-[90px] bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] px-6 flex items-center justify-between shadow-xl shadow-indigo-100 gap-4">
            
            {/* Search Bar with AI Voice Button */}
            <div className="flex items-center gap-2 bg-slate-100/80 border-2 border-slate-200/80 px-4 py-2.5 rounded-full max-w-md w-full focus-within:border-indigo-400 transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for lessons, games and more..." 
                className="bg-transparent text-sm font-bold w-full focus:outline-none placeholder:text-slate-400" 
              />
              <button 
                onClick={() => navigate('/voice-practice')}
                className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-90"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Stats & Profile Pills */}
            <div className="flex items-center gap-3">
              {/* Streak Pill */}
              <div className="flex items-center gap-2 bg-orange-50 border-2 border-orange-200 px-3.5 py-2 rounded-full shadow-sm text-orange-600 font-black text-xs hover-pop">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>1 Day Streak</span>
              </div>

              {/* Coins Pill */}
              <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 px-3.5 py-2 rounded-full shadow-sm text-amber-600 font-black text-xs hover-pop">
                <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-baloo text-sm">{profile.coins} Coins</span>
              </div>

              {/* XP Pill */}
              <div className="flex items-center gap-2 bg-purple-50 border-2 border-purple-200 px-3.5 py-2 rounded-full shadow-sm text-purple-600 font-black text-xs hover-pop">
                <span className="text-base">💎</span>
                <span className="font-baloo text-sm">{profile.xp} XP</span>
              </div>

              {/* Notification Pill */}
              <button className="relative w-10 h-10 bg-slate-100 border-2 border-slate-200 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-all hover-pop">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {/* Profile Avatar Pill */}
              <div className="flex items-center gap-2.5 bg-indigo-50 border-2 border-indigo-200 pl-1.5 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer hover-pop" onClick={() => navigate('/profile-setup')}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=poluytre" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-left leading-tight">
                  <h4 className="font-black text-xs text-indigo-900 truncate max-w-[80px]">{profile.fullName}</h4>
                  <p className="text-[10px] font-extrabold text-indigo-500 uppercase">Level {profile.level}</p>
                </div>
              </div>
            </div>

          </header>

          {/* ================= HERO SECTION (Split 2 Cards) ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Card 1: Welcome Card (Pink -> Purple Gradient) */}
            <div className="xl:col-span-7 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-[32px] p-6 text-white shadow-xl shadow-purple-200 relative overflow-hidden border-b-8 border-indigo-900 flex flex-col justify-between min-h-[220px]">
              <div className="absolute right-[-10%] bottom-[-20%] text-9xl opacity-15 pointer-events-none select-none">🚀</div>
              
              <div className="relative z-10 flex items-center gap-5">
                <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur border-4 border-white/40 shadow-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=helmet-robot" alt="Robot Mascot" className="w-full h-full object-contain animate-bounce-slow" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-900 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider border border-yellow-300">
                    <span>⭐ SUPER LEARNER MODE</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight font-poppins">
                    आपका स्वागत है, {profile.fullName}!
                  </h2>
                  <p className="text-xs md:text-sm font-bold text-purple-100 max-w-md leading-relaxed">
                    Let's play and learn! Unlock new stages, earn rewards and become a superstar! 🌟
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 flex justify-start pl-32">
                <button 
                  onClick={() => navigate('/lesson/1')}
                  className="bg-yellow-400 hover:bg-yellow-300 active:translate-y-1 text-slate-900 font-black text-sm px-6 py-3 rounded-2xl shadow-lg border-b-4 border-yellow-600 flex items-center gap-2 transition-all cursor-pointer hover-pop"
                >
                  <span>Start Adventure 🎮</span>
                </button>
              </div>
            </div>

            {/* Card 2: AI Tutor Card (Blue -> Purple Gradient) */}
            <div className="xl:col-span-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden border-b-8 border-purple-950 flex flex-col justify-between min-h-[220px]">
              <div className="absolute right-2 top-2 w-28 h-28 opacity-90 pointer-events-none select-none">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=ai-tutor-bot" alt="AI Bot" className="w-full h-full object-contain animate-float" />
              </div>

              <div className="relative z-10 space-y-2 max-w-xs">
                <div className="inline-flex items-center gap-1.5 bg-indigo-500/80 border border-indigo-300/40 text-yellow-300 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  <span>🤖 AI TUTOR</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight font-poppins">
                  Learn with AI Tutor 🤖
                </h3>
                <p className="text-xs font-bold text-indigo-100 leading-relaxed">
                  Personalized lessons, instant help, and fun practice made just for you! ✨
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button 
                  onClick={() => navigate('/learn-with-ai')}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-lg border-b-4 border-indigo-900 flex items-center gap-2 transition-all cursor-pointer hover-pop"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                  <span>Start AI Tutor 🚀</span>
                </button>
              </div>
            </div>

          </div>

          {/* ================= PROGRESS CARDS (4 Bubbly Cards) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Reading */}
            <div className="bg-white/90 backdrop-blur border-4 border-indigo-100 p-4.5 rounded-[28px] shadow-lg shadow-indigo-100/50 flex items-center justify-between hover-pop">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl shrink-0">
                  📖
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reading</div>
                  <div className="text-2xl font-black text-indigo-900 font-baloo">78%</div>
                  <p className="text-[10px] font-bold text-indigo-600">Great! Keep it up! 🔥</p>
                </div>
              </div>
              <button onClick={() => navigate('/learn-with-ai')} className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Card 2: Writing */}
            <div className="bg-white/90 backdrop-blur border-4 border-pink-100 p-4.5 rounded-[28px] shadow-lg shadow-pink-100/50 flex items-center justify-between hover-pop">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl shrink-0">
                  ✏️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Writing</div>
                  <div className="text-2xl font-black text-pink-900 font-baloo">45%</div>
                  <p className="text-[10px] font-bold text-pink-600">Keep practicing! 💪</p>
                </div>
              </div>
              <button onClick={() => navigate('/learn-with-ai')} className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Card 3: Speaking */}
            <div className="bg-white/90 backdrop-blur border-4 border-sky-100 p-4.5 rounded-[28px] shadow-lg shadow-sky-100/50 flex items-center justify-between hover-pop">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl shrink-0">
                  🎙️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Speaking</div>
                  <div className="text-2xl font-black text-sky-900 font-baloo">67%</div>
                  <p className="text-[10px] font-bold text-sky-600">Good progress! 🌈</p>
                </div>
              </div>
              <button onClick={() => navigate('/voice-practice')} className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Card 4: Sticker Book */}
            <div className="bg-white/90 backdrop-blur border-4 border-emerald-100 p-4.5 rounded-[28px] shadow-lg shadow-emerald-100/50 flex items-center justify-between hover-pop cursor-pointer" onClick={() => navigate('/vocabulary')}>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
                  🌸
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sticker Power</div>
                  <div className="text-xl font-black text-emerald-900 font-poppins">Explore</div>
                  <p className="text-[10px] font-bold text-emerald-600">Collect & unlock stickers</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* ================= MIDDLE GRID (Adventure Map + Right Widgets) ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: LEARNING ADVENTURE MAP (8 Cols) */}
            <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  <h3 className="text-xl font-black text-slate-800 font-poppins">Learning Adventure Map</h3>
                </div>

                {/* Level Tabs */}
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full text-xs font-black">
                  <button 
                    onClick={() => setActiveLevel('Beginner')}
                    className={`px-4 py-1.5 rounded-full transition-all ${activeLevel === 'Beginner' ? 'bg-[#6C4DFF] text-white shadow-md' : 'text-slate-600'}`}
                  >
                    🔮 Beginner
                  </button>
                  <button disabled className="px-4 py-1.5 rounded-full text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Intermediate
                  </button>
                  <button disabled className="px-4 py-1.5 rounded-full text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Advanced
                  </button>
                </div>
              </div>

              {/* Fantasy Island Map Visual Card */}
              <div className="relative bg-gradient-to-b from-sky-200 via-emerald-100 to-indigo-100 rounded-[32px] p-8 min-h-[380px] flex flex-col justify-between overflow-hidden border-4 border-sky-300 shadow-inner">
                {/* Visual decorations */}
                <div className="absolute top-4 left-6 text-4xl opacity-40 animate-float">🏰</div>
                <div className="absolute top-8 right-12 text-4xl opacity-40 animate-float" style={{ animationDelay: '1s' }}>🎈</div>
                <div className="absolute bottom-6 left-12 text-4xl opacity-30">🌈</div>

                {/* Curved Stage Nodes */}
                <div className="relative z-10 flex flex-wrap justify-between items-center gap-6 my-auto">
                  
                  {/* Stage 1 */}
                  <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/lesson/1')}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 border-4 border-white shadow-xl flex items-center justify-center text-3xl text-white font-black animate-glow">
                      📖
                    </div>
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-md border border-emerald-200">
                      <div className="text-xs font-black text-slate-800">Stage 1</div>
                      <div className="text-[10px] font-bold text-slate-500">Start Your Journey</div>
                      <div className="text-xs">⭐⭐⭐</div>
                    </div>
                  </div>

                  {/* Daily Challenge */}
                  <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/learn-with-ai')}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 border-4 border-white shadow-xl flex items-center justify-center text-2xl text-white font-black">
                      ⭐
                    </div>
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-md border border-purple-200">
                      <div className="text-xs font-black text-purple-900">Daily Challenge</div>
                      <div className="text-[10px] font-bold text-purple-600">Unlocked</div>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/lesson/2')}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-sky-500 border-4 border-white shadow-xl flex items-center justify-center text-3xl text-white font-black">
                      🚀
                    </div>
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-md border border-blue-200">
                      <div className="text-xs font-black text-slate-800">Stage 2</div>
                      <div className="text-[10px] font-bold text-slate-500">Keep Going!</div>
                      <div className="text-xs">⭐⭐</div>
                    </div>
                  </div>

                  {/* Stage 3 (Locked) */}
                  <div className="flex flex-col items-center gap-2 opacity-70">
                    <div className="w-16 h-16 rounded-full bg-slate-400 border-4 border-white shadow-md flex items-center justify-center text-2xl text-white font-black">
                      🔒
                    </div>
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-sm border border-slate-200">
                      <div className="text-xs font-black text-slate-600">Stage 3</div>
                      <div className="text-[10px] font-bold text-slate-400">Coming Soon</div>
                    </div>
                  </div>

                  {/* Grand Mission Chest */}
                  <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/store')}>
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 border-4 border-white shadow-2xl flex items-center justify-center text-5xl animate-bounce-slow">
                      🎁
                    </div>
                    <div className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-center shadow-md font-black text-xs border border-amber-300">
                      Grand Mission
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDEBAR WIDGETS (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Daily Goal / Mission Widget */}
              <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                    <span>Daily Goal</span>
                  </div>
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    5 / 7 Days
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-500">Study 6 Days</p>

                {/* Weekday checkmark pills */}
                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={day} className="text-center space-y-1">
                      <div className={`h-9 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                        idx < 5 
                          ? 'bg-gradient-to-b from-[#6C4DFF] to-[#8B5CFF] text-white shadow-md' 
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}>
                        {idx < 5 ? <Check className="w-4 h-4" /> : ''}
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Champions League (Leaderboard) Widget */}
              <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Champions League</span>
                  </div>
                  <Link to="/leaderboard" className="text-xs font-black text-indigo-600 hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {championsList.map((c) => (
                    <div key={c.rank} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-150 hover:bg-slate-100 transition-all">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center ${
                          c.rank === 1 ? 'bg-amber-400 text-slate-900' : c.rank === 2 ? 'bg-slate-300 text-slate-800' : c.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {c.rank}
                        </span>
                        <span className="text-xl">{c.avatar}</span>
                        <div>
                          <h5 className="font-black text-xs text-slate-800">{c.name}</h5>
                          <p className="text-[10px] font-bold text-slate-400">Level {c.level} • {c.xp} XP</p>
                        </div>
                      </div>
                      <span className="font-baloo text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        {c.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ================= BOTTOM ROW GRID (3 Cols: Badges, Store, Milestone) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Col 1: My Badges */}
            <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <span>My Badges</span>
                </div>
                <Link to="/reports" className="text-xs font-black text-indigo-600 hover:underline">
                  View All
                </Link>
              </div>

              {/* 3D Trading Cards Badges */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
                {[
                  { title: 'First Lesson', icon: '🥇', bg: 'from-amber-400 to-yellow-500' },
                  { title: '7 Day Streak', icon: '🔥', bg: 'from-rose-500 to-pink-600' },
                  { title: 'Level Explorer', icon: '🚀', bg: 'from-emerald-400 to-teal-500' },
                  { title: 'Reading Star', icon: '⭐', bg: 'from-purple-500 to-indigo-600' },
                  { title: 'Perfect Score', icon: '🏅', bg: 'from-sky-400 to-blue-500' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 hover-pop cursor-pointer">
                    <div className={`w-14 h-16 rounded-2xl bg-gradient-to-b ${b.bg} border-2 border-white shadow-md flex items-center justify-center text-2xl`}>
                      {b.icon}
                    </div>
                    <span className="text-[10px] font-black text-slate-700 truncate max-w-[65px] text-center">{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 2: Rewards Store */}
            <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                  <span className="text-xl">🎁</span>
                  <span>Rewards Store</span>
                </div>
                <Link to="/store" className="text-xs font-black text-indigo-600 hover:underline">
                  View All
                </Link>
              </div>

              <div className="flex items-center gap-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                <div className="text-4xl animate-bounce-slow">🎁</div>
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-amber-900">Earn XP and coins to unlock exciting rewards!</p>
                  <div className="w-full bg-amber-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '40%' }} />
                  </div>
                  <span className="text-[10px] font-black text-amber-700">80 / 500 Coins</span>
                </div>
              </div>
            </div>

            {/* Col 3: Upcoming Milestone */}
            <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                <span className="text-xl">🎯</span>
                <span>Upcoming Milestone</span>
              </div>

              <p className="text-xs font-bold text-slate-500">Keep your streak alive!</p>

              {/* Stepper Path */}
              <div className="flex items-center justify-between pt-2">
                {[
                  { days: '3 Days', active: true },
                  { days: '7 Days', active: true },
                  { days: '14 Days', active: false },
                  { days: '30 Days', active: false },
                ].map((m, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      m.active ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-600">{m.days}</span>
                  </div>
                ))}
                <div className="text-2xl animate-float">🏆</div>
              </div>
            </div>

          </div>

          {/* ================= BOTTOM CAROUSEL: CONTINUE LEARNING + DINO BOOSTER ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Carousel (9 Cols) */}
            <div className="lg:col-span-9 bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                <span className="text-xl">📖</span>
                <span>Continue Learning</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {continueLessons.map((item) => (
                  <div key={item.id} className="bg-slate-50 border-2 border-slate-150 p-4 rounded-2xl space-y-3 hover-pop cursor-pointer" onClick={() => navigate(`/lesson/${item.id}`)}>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{item.progress}%</span>
                    </div>
                    <div>
                      <h5 className="font-black text-xs text-slate-800 leading-tight truncate">{item.title}</h5>
                      <p className="text-[10px] font-bold text-slate-400">{item.subtitle}</p>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className={`bg-gradient-to-r ${item.color} h-full rounded-full`} style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dino Booster (3 Cols) */}
            <div className="lg:col-span-3 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[32px] p-6 text-white shadow-xl flex items-center justify-between border-b-6 border-indigo-950">
              <div className="space-y-1">
                <h4 className="font-black text-sm text-yellow-300">Keep Going! 💜</h4>
                <p className="text-xs font-bold text-purple-100">You're doing great!</p>
              </div>
              <div className="w-16 h-16 shrink-0">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=purple-dino" alt="Purple Dino" className="w-full h-full object-contain animate-bounce-slow" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
