import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { SupportedLanguage, translations } from '../utils/translationHelper';
import { 
  BookOpen, Mic, Trophy, Calendar, LogOut, 
  Settings, Bell, Search, Sparkles, TrendingUp 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  const [activeLevel, setActiveLevel] = useState<string>('Beginner');
  
  const [profile, setProfile] = useState<any>({
    fullName: username,
    avatar: '🧑‍🎓',
    xp: 150,
    coins: 45,
    streak: 15,
    level: 2,
    badges: ['First Lesson', '7 Day Streak'],
    completedLessons: [1]
  });

  useEffect(() => {
    if (profile && profile.level) {
      const levels = ['Beginner', 'Intermediate', 'Advanced'];
      const currentLevelName = levels[Math.min(profile.level - 1, levels.length - 1)] || 'Beginner';
      setActiveLevel(currentLevelName);
    }
  }, [profile]);

  const [lessons, setLessons] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [lang, setLang] = useState<SupportedLanguage>('english');

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
        setProfile(prof);

        const less = await apiClient.getLessons();
        setLessons(less);

        const lb = await apiClient.getLeaderboard();
        setLeaderboard(lb);
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

  const getLevelName = (lvl: number) => {
    const levels = ['Beginner 🎈', 'Learner 🦄', 'Explorer 🚀', 'Achiever 🏆', 'Master 👑'];
    return levels[Math.min(lvl - 1, levels.length - 1)] || 'Learner 🦄';
  };

  const filteredLessons = lessons.filter(l => l.difficulty.toLowerCase() === activeLevel.toLowerCase());
  const displayedLessons = filteredLessons;

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r-4 border-slate-100 hidden md:flex flex-col justify-between py-6 px-4 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-yellow-400 via-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md rotate-[-3deg] animate-float">
              📚
            </div>
            <span className="text-xl font-black text-slate-850 tracking-tight">NeoLit Game</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 bg-indigo-50 border-2 border-indigo-150 text-indigo-700 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all hover-pop"
            >
              <Trophy className="w-5 h-5 text-indigo-600" />
              <span>🏠 {t.dashboard}</span>
            </Link>

            <Link 
              to="/learn-with-ai" 
              className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-purple-400 text-white font-black px-4 py-3 rounded-2xl text-sm transition-all hover-pop shadow-md shadow-purple-200"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span>🧠 Learn with AI</span>
            </Link>
            
            <Link 
              to="/lesson/1" 
              className="flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-600 hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all hover-pop"
            >
              <BookOpen className="w-5 h-5 text-sky-500" />
              <span>📖 {t.lessons}</span>
            </Link>
            
            <Link 
              to="/voice-practice" 
              className="flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-600 hover:border-pink-300 hover:text-pink-700 hover:bg-pink-50 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all hover-pop"
            >
              <Mic className="w-5 h-5 text-pink-500" />
              <span>🎙️ {t.voiceLearning}</span>
            </Link>

            <Link 
              to="/vocabulary" 
              className="flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all hover-pop"
            >
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span>🎨 Sticker Book</span>
            </Link>

            <Link 
              to="/reports" 
              className="flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all hover-pop"
            >
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <span>📊 My Progress</span>
            </Link>

            <Link 
              to="/admin" 
              className="flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-600 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all hover-pop"
            >
              <Settings className="w-5 h-5 text-slate-400" />
              <span>🛠️ Admin Desk</span>
            </Link>
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="space-y-4 pt-6 border-t-2 border-slate-100">
          <div className="bg-slate-50 border-2 border-slate-100/80 p-3.5 rounded-3xl flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border-2 border-indigo-200/80 flex items-center justify-center text-3xl shadow-sm rotate-[4deg]">
              {profile.avatar}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-850 truncate max-w-[110px]">{profile.fullName}</h4>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">Level {profile.level}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 border-2 border-rose-100 text-rose-600 hover:bg-rose-100 font-extrabold py-3 rounded-2xl text-xs transition-all cursor-pointer active-pop"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Stats bar */}
        <header className="bg-white border-b-4 border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-100 px-4 py-2 rounded-2xl max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input type="text" placeholder="Search stages..." className="bg-transparent text-sm w-full focus:outline-none font-bold placeholder:text-slate-400/80" />
          </div>

          <div className="flex items-center gap-4">
            {/* Playful stats */}
            <div className="flex items-center gap-3 text-xs font-black">
              <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 border-2 border-orange-100 px-3.5 py-2 rounded-2xl shadow-sm hover-pop">
                🔥 <span>{profile.streak} Days</span>
              </span>
              <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 border-2 border-yellow-100 px-3.5 py-2 rounded-2xl shadow-sm hover-pop">
                🪙 <span>{profile.coins}</span>
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 border-2 border-indigo-100 px-3.5 py-2 rounded-2xl shadow-sm hover-pop">
                🏆 <span>{profile.xp} XP</span>
              </span>
            </div>

            <button className="relative w-10 h-10 bg-slate-50 border-2 border-slate-150 hover:bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center transition-all hover-pop">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          
          {/* Welcome Kids Banner */}
          <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-[36px] p-6 md:p-8 text-white shadow-xl shadow-indigo-500/10 overflow-hidden border-b-6 border-indigo-700/60">
            {/* Decorative items */}
            <div className="absolute right-[-5%] top-[-10%] text-9xl opacity-15 pointer-events-none animate-float select-none">🎈</div>
            <div className="absolute left-[30%] bottom-[-15%] text-7xl opacity-10 pointer-events-none select-none">✨</div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <span className="bg-yellow-400/90 text-slate-900 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-yellow-300">
                  {getLevelName(profile.level)}
                </span>
                <h1 className="text-3xl font-black tracking-tight">{t.welcomeBack}, {profile.fullName}! 👋</h1>
                <p className="text-indigo-100 font-semibold max-w-md">Let's play and learn! Go to your map below to unlock stages and earn stars!</p>
              </div>

              {lessons.length > 0 && (
                <div className="bg-white/10 backdrop-blur border-2 border-white/20 p-5 rounded-3xl space-y-3.5 shrink-0 max-w-[280px]">
                  <h4 className="text-xs font-black text-yellow-300 uppercase tracking-wider">🌟 Up Next Stage</h4>
                  <p className="font-extrabold text-sm truncate">{lessons[0].title}</p>
                  <Link
                    to={`/lesson/${lessons[0].id}`}
                    className="inline-block w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-center py-3 rounded-2xl text-xs transition-all shadow-md active-pop"
                  >
                    Play Stage 🚀
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Learn with AI Featured Hero Banner */}
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-[32px] p-6 text-white shadow-lg border-b-6 border-indigo-900 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 text-9xl opacity-10 pointer-events-none select-none">🧠</div>
            <div className="space-y-2 max-w-xl z-10">
              <span className="bg-yellow-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">NEW MODULE 🚀</span>
              <h2 className="text-2xl md:text-3xl font-black">Learn with AI Tutor 🧠</h2>
              <p className="text-purple-100 text-sm font-semibold">
                Personalized skill assessment in Reading, Writing & Comprehension with AI-generated practice modules in 14+ languages!
              </p>
            </div>
            <Link
              to="/learn-with-ai"
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg hover-pop border-b-4 border-yellow-600 shrink-0 z-10 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-indigo-700 animate-spin" />
              <span>Start AI Tutor Session →</span>
            </Link>
          </div>

          {/* Quick Metrics (Bubbly Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            <div className="bg-yellow-50/50 border-4 border-yellow-100 p-5 rounded-[28px] shadow-sm flex items-center gap-4 hover-pop">
              <div className="w-12 h-12 rounded-2xl bg-yellow-150 text-yellow-600 flex items-center justify-center shrink-0 shadow-sm text-2xl font-bold">
                📖
              </div>
              <div>
                <h4 className="text-yellow-600 font-extrabold text-xs uppercase tracking-wider">Reading</h4>
                <p className="text-xl font-black text-slate-800 mt-0.5">78%</p>
              </div>
            </div>

            <div className="bg-rose-50/50 border-4 border-rose-100 p-5 rounded-[28px] shadow-sm flex items-center gap-4 hover-pop">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 shadow-sm text-2xl font-bold">
                ✍️
              </div>
              <div>
                <h4 className="text-rose-600 font-extrabold text-xs uppercase tracking-wider">Writing</h4>
                <p className="text-xl font-black text-slate-800 mt-0.5">45%</p>
              </div>
            </div>

            <div className="bg-sky-50/50 border-4 border-sky-100 p-5 rounded-[28px] shadow-sm flex items-center gap-4 hover-pop">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-650 flex items-center justify-center shrink-0 shadow-sm text-2xl font-bold">
                🗣️
              </div>
              <div>
                <h4 className="text-sky-650 font-extrabold text-xs uppercase tracking-wider">Speaking</h4>
                <p className="text-xl font-black text-slate-800 mt-0.5">67%</p>
              </div>
            </div>

            <Link to="/vocabulary" className="bg-emerald-50/50 border-4 border-emerald-100 p-5 rounded-[28px] shadow-sm flex items-center gap-4 hover-pop transition-all hover:shadow-md cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm text-2xl font-bold">
                🌸
              </div>
              <div>
                <h4 className="text-emerald-650 font-extrabold text-xs uppercase tracking-wider">Sticker Book</h4>
                <p className="text-xl font-black text-slate-800 mt-0.5">Explore</p>
              </div>
            </Link>

          </div>

          {/* Child-Friendly Game Board and Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Playful Game Winding Path Map */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-850 flex items-center gap-2">
                  <span>🗺️ Learning Adventure Map</span>
                </h3>

                {/* Level Tabs Selectors */}
                <div className="flex flex-wrap gap-2.5 mb-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvlName, idx) => {
                    const lvlNum = idx + 1;
                    const isUnlocked = profile.level >= lvlNum;
                    const isActive = activeLevel === lvlName;
                    return (
                      <button
                        key={lvlName}
                        disabled={!isUnlocked}
                        onClick={() => setActiveLevel(lvlName)}
                        className={`px-4.5 py-2.5 rounded-2xl text-xs font-black border-2 border-b-6 transition-all hover-pop active:border-b-0 active:mt-1.5 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500 to-blue-500 border-indigo-750 text-white shadow-md'
                            : isUnlocked
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {lvlName === 'Beginner' ? '🎈' : lvlName === 'Intermediate' ? '🦄' : '🚀'} {lvlName} {isUnlocked ? '' : '🔒'}
                      </button>
                    );
                  })}
                </div>

                {/* Game Path Layout (Scrollable showing ~5 stages in preview) */}
                <div className="bg-gradient-to-b from-sky-100 via-indigo-50/60 to-purple-100/60 p-8 rounded-[40px] border-4 border-dashed border-indigo-250 relative h-[580px] overflow-y-auto flex flex-col items-center shadow-inner scroll-smooth">
                  {/* Decorative background visual cues */}
                  <span className="absolute top-4 right-6 text-5xl opacity-20 select-none animate-float">🎈</span>
                  <span className="absolute bottom-6 left-6 text-5xl opacity-20 select-none">🏡</span>
                  <span className="absolute top-[40%] left-4 text-5xl opacity-15 select-none">🦕</span>

                  <div className="flex flex-col gap-12 items-center w-full max-w-sm relative z-10 py-6">
                    {displayedLessons.map((les, index) => {
                      const isCompleted = profile.completedLessons?.includes(les.id);
                      const isNext = !isCompleted && (index === 0 || profile.completedLessons?.includes(displayedLessons[index - 1]?.id));
                      const offsetClass = index % 2 === 0 ? 'translate-x-12' : '-translate-x-12';

                      return (
                        <div key={les.id} className={`flex flex-col items-center transition-all ${offsetClass} hover-pop relative`}>
                          
                          {/* Connection dash line for stages */}
                          <div className="absolute bottom-[-50px] w-1.5 h-12 border-l-4 border-dashed border-indigo-300 pointer-events-none" />

                          <Link
                            to={`/lesson/${les.id}`}
                            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-b-6 shadow-lg transition-all text-3xl font-black active:border-b-0 active:mt-1.5 ${
                              isCompleted
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-emerald-600 text-white hover:brightness-105 shadow-emerald-250/30'
                                : isNext
                                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 border-amber-600 text-white animate-bounce shadow-amber-300/40'
                                  : 'bg-white border-slate-300 text-slate-350 cursor-not-allowed pointer-events-none'
                            }`}
                          >
                            {isCompleted ? '⭐' : isNext ? '🎯' : '🔒'}
                          </Link>
                          <div className="mt-2.5 text-center max-w-[130px]">
                            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none">Stage {index + 1}</p>
                            <h5 className="font-extrabold text-[11px] text-slate-800 leading-snug mt-0.5">{les.title}</h5>
                          </div>
                        </div>
                      );
                    })}

                    {/* Level Test Path Node */}
                    <div className="flex flex-col items-center translate-x-0 hover-pop mt-6 relative">
                      <Link
                        to={`/assessment?levelTest=true&level=${activeLevel}`}
                        className="w-22 h-22 rounded-3xl bg-gradient-to-tr from-yellow-400 to-amber-500 border-b-8 border-amber-600 shadow-xl flex items-center justify-center text-4xl font-black animate-pulse hover:brightness-105 active:border-b-0 active:mt-1.5"
                      >
                        🎓
                      </Link>
                      <div className="mt-2 text-center max-w-[150px]">
                        <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest leading-none">Graduation Test</p>
                        <h5 className="font-extrabold text-[11px] text-slate-800 leading-snug mt-0.5">Unlock Next Level! 🏆</h5>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Right Sideboards: Sticker album & Leaderboard */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Achievement Badge Sticker Book showcase */}
              <div className="bg-white p-6 rounded-[32px] border-4 border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-850 flex items-center gap-1.5">
                  <span>🏆 Badge Sticker Album</span>
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { badge: '🏅', title: 'First Lesson', desc: 'Finished 1 lesson' },
                    { badge: '🔥', title: '7 Day Streak', desc: 'Study 7 days consecutive' },
                    { badge: '📚', title: 'Reading Expert', desc: 'Completed reading path' },
                    { badge: '🎤', title: 'Voice Master', desc: '90%+ speech score' },
                    { badge: '🏆', title: 'Lvl 2 Explorer', desc: 'Reached level 2' },
                    { badge: '🎖', title: 'Perfect Score', desc: '100% on assessments' }
                  ].map((bg, idx) => {
                    const userHasBadge = profile.badges?.some((b: string) => b.toLowerCase().includes(bg.title.toLowerCase()) || b.toLowerCase().includes(bg.title.split(' ')[0].toLowerCase()));
                    return (
                      <div key={idx} className={`space-y-1.5 transition-opacity ${userHasBadge ? 'opacity-100' : 'opacity-25'}`} title={bg.desc}>
                        <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl bg-slate-50 border-2 ${
                          userHasBadge ? 'border-amber-300 bg-amber-50/50 shadow-sm rotate-[3deg]' : 'border-slate-100'
                        } hover-pop`}>
                          {bg.badge}
                        </div>
                        <h5 className="text-[10px] font-black text-slate-800 leading-none truncate max-w-[70px] mx-auto">{bg.title}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly target progress bar visual */}
              <div className="bg-white p-6 rounded-[32px] border-4 border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-850 flex items-center gap-1.5">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <span>Weekly Goal progress</span>
                </h3>
                <div className="flex justify-between items-center text-xs font-black">
                  <span>Goal: Study 5 Days</span>
                  <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">5/7 Days</span>
                </div>
                <div className="flex justify-between gap-2 pt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={idx} className="flex-1 text-center space-y-1">
                      <div className={`h-8 rounded-xl flex items-center justify-center text-xs font-black border-b-4 border-2 transition-all ${
                        idx < 5 
                          ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white border-blue-600 border-b-blue-700 shadow-sm' 
                          : 'bg-slate-50 text-slate-350 border-slate-150 border-b-slate-200'
                      }`}>
                        {idx < 5 ? '⭐' : '•'}
                      </div>
                      <span className="text-[10px] font-black text-slate-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Champions List */}
              <div className="bg-white p-6 rounded-[32px] border-4 border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-850 flex items-center gap-1.5">
                  <Trophy className="w-5 h-5 text-amber-500 animate-float" />
                  <span>Champions League</span>
                </h3>

                <div className="space-y-3.5">
                  {leaderboard.slice(0, 5).map((lb, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-bold bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 font-black text-xs rounded-xl flex items-center justify-center text-center shadow-sm ${
                          idx === 0 
                            ? 'bg-amber-400 text-slate-900 border-b-4 border-amber-600' 
                            : idx === 1 
                              ? 'bg-slate-300 text-slate-800 border-b-4 border-slate-500' 
                              : idx === 2 
                                ? 'bg-amber-700 text-white border-b-4 border-amber-900' 
                                : 'bg-white text-slate-400 border border-slate-200'
                        }`}>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                        </span>
                        <div>
                          <h5 className="font-extrabold text-slate-800 text-xs leading-none">{lb.name}</h5>
                          <p className="text-[9px] font-extrabold text-slate-400 mt-1">Level {lb.level} • {lb.streak}d streak</p>
                        </div>
                      </div>
                      <span className="font-black text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg text-[10px]">
                        {lb.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
