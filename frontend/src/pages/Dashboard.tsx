import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { SupportedLanguage, translations } from '../utils/translationHelper';
import { 
  BookOpen, Mic, Trophy, Calendar, Star, LogOut, 
  Settings, User, Bell, Search, Sparkles, Award, TrendingUp, ShieldAlert 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  
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

  // Find next uncompleted lesson
  const getNextLesson = () => {
    if (lessons.length === 0) return null;
    const completedIds = profile.completedLessons || [];
    const next = lessons.find(l => !completedIds.includes(l.id));
    return next || lessons[0];
  };

  const nextLesson = getNextLesson();

  const getLevelName = (lvl: number) => {
    const levels = ['Beginner', 'Learner', 'Explorer', 'Achiever', 'Master'];
    return levels[Math.min(lvl - 1, levels.length - 1)] || 'Learner';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col justify-between py-6 px-4 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 px-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">📚</div>
            <span className="text-xl font-black text-blue-600">NeoLit AI</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <Link to="/dashboard" className="flex items-center gap-3 bg-blue-50 text-blue-700 font-extrabold px-4 py-3 rounded-2xl text-sm transition-all">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span>{t.dashboard}</span>
            </Link>
            
            <Link to="/lesson/1" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold px-4 py-3 rounded-2xl text-sm transition-all">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <span>{t.lessons}</span>
            </Link>
            
            <Link to="/voice-practice" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold px-4 py-3 rounded-2xl text-sm transition-all">
              <Mic className="w-5 h-5 text-slate-400" />
              <span>{t.voiceLearning}</span>
            </Link>

            <Link to="/reports" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold px-4 py-3 rounded-2xl text-sm transition-all">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              <span>{t.reports}</span>
            </Link>

            <Link to="/admin" className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold px-4 py-3 rounded-2xl text-sm transition-all">
              <Settings className="w-5 h-5 text-slate-400" />
              <span>{t.admin} Dashboard</span>
            </Link>
          </nav>
        </div>

        {/* User profile / Logout */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">{profile.avatar}</div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 truncate max-w-[120px]">{profile.fullName}</h4>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Level {profile.level}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-700 font-bold py-3 rounded-2xl text-sm transition-all border border-slate-100 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-18 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input type="text" placeholder="Search lessons..." className="bg-transparent text-sm w-full focus:outline-none font-semibold" />
          </div>

          <div className="flex items-center gap-6">
            {/* Gamification Stats */}
            <div className="flex items-center gap-4 text-sm font-extrabold">
              <span className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100" title="Daily Streak">
                🔥 <span>{profile.streak} Days</span>
              </span>
              <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100" title="Gold Coins">
                🪙 <span>{profile.coins}</span>
              </span>
              <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100" title="XP Score">
                🏆 <span>{profile.xp} XP</span>
              </span>
            </div>

            <button className="relative w-10 h-10 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Mobile Sidebar Trigger placeholder / User avatar */}
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl cursor-pointer md:hidden" onClick={() => navigate('/select-language')}>
              🌐
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Welcome banner */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-blue-500/10 overflow-hidden">
            {/* Backdrop highlights */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <span className="bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
                  Skill Level: {getLevelName(profile.level)} (Lvl {profile.level})
                </span>
                <h1 className="text-3xl font-black tracking-tight">{t.welcomeBack}, {profile.fullName}!</h1>
                <p className="text-blue-100 font-medium max-w-md">Your personalized AI learning path is ready. Keep building your daily habit!</p>
              </div>

              {nextLesson && (
                <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-2xl space-y-3 shrink-0 max-w-[280px]">
                  <h4 className="text-xs font-bold text-blue-200 uppercase tracking-wider">Up Next</h4>
                  <p className="font-extrabold text-sm truncate">{nextLesson.title}</p>
                  <Link
                    to={`/lesson/${nextLesson.id}`}
                    className="inline-block w-full bg-white hover:bg-slate-100 text-blue-700 font-black text-center py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
                  >
                    Start Lesson
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Reading Score</h4>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">78%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Writing Score</h4>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">45%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Speaking Score</h4>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">67%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Vocabulary</h4>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">72%</p>
              </div>
            </div>
          </div>

          {/* Detailed Panels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Lessons list & Badges */}
            <div className="lg:col-span-8 space-y-8">
              {/* Learning Path */}
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">Learning Paths</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lessons.map((les) => {
                    const isCompleted = profile.completedLessons?.includes(les.id);
                    return (
                      <div key={les.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              les.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {les.difficulty}
                            </span>
                            {isCompleted && (
                              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                                ✓ Finished
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-slate-950 text-base leading-snug">{les.title}</h4>
                          <p className="text-xs text-slate-400 font-semibold">{les.category} • {les.time}</p>
                        </div>
                        <div className="pt-4 flex justify-end">
                          <Link
                            to={`/lesson/${les.id}`}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              isCompleted
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                            }`}
                          >
                            {isCompleted ? 'Review' : 'Start'}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievements Showcase */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">Achievements Badges</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
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
                      <div key={idx} className={`space-y-1 ${userHasBadge ? 'opacity-100' : 'opacity-30'}`} title={bg.desc}>
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl bg-slate-50 border ${userHasBadge ? 'border-amber-200 bg-amber-50/50 shadow-sm' : 'border-slate-100'}`}>
                          {bg.badge}
                        </div>
                        <h5 className="text-[10px] font-black text-slate-800 leading-none truncate">{bg.title}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Leaderboard & Activity */}
            <div className="lg:col-span-4 space-y-8">
              {/* Daily Streak target */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Weekly Target progress</span>
                </h3>
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span>Weekly Goal: Study 5 Days</span>
                  <span className="text-blue-600 font-extrabold">5/7 Days</span>
                </div>
                <div className="flex justify-between gap-1.5 pt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={idx} className="flex-1 text-center space-y-1">
                      <div className={`h-8 rounded-lg flex items-center justify-center text-xs font-black border ${
                        idx < 5 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10' 
                          : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        ✓
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard panel */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>Leaderboard (Top Learners)</span>
                </h3>

                <div className="space-y-3.5">
                  {leaderboard.slice(0, 5).map((lb, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 font-black text-xs rounded-full flex items-center justify-center text-center ${
                          idx === 0 ? 'bg-amber-500 text-white' : idx === 1 ? 'bg-slate-300 text-slate-800' : idx === 2 ? 'bg-amber-700 text-white' : 'text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="font-extrabold text-slate-900">{lb.name}</h5>
                          <p className="text-[10px] font-semibold text-slate-400">Level {lb.level} • {lb.streak}d streak</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg text-xs">
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
