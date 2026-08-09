import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Languages, BookOpen, User, 
  ShieldAlert, Award, TrendingUp, Search, UserCheck, Star, Sparkles 
} from 'lucide-react';
import { apiClient } from '../utils/api';

export interface LessonAdmin {
  id: number;
  title: string;
  difficulty: string;
  time: string;
  category: string;
  content: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'languages' | 'reports' | 'learners'>('overview');
  const [lessons, setLessons] = useState<LessonAdmin[]>([]);
  const [learnersList, setLearnersList] = useState<any[]>([]);
  const [selectedLearner, setSelectedLearner] = useState<any | null>(null);
  
  // Lesson Form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [time, setTime] = useState('10 mins');
  const [category, setCategory] = useState('Reading');
  const [content, setContent] = useState('');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Languages state
  const [languages, setLanguages] = useState([
    { code: 'english', name: 'English', active: true },
    { code: 'hindi', name: 'Hindi (हिंदी)', active: true },
    { code: 'telugu', name: 'Telugu (తెలుగు)', active: true },
    { code: 'tamil', name: 'Tamil (தமிழ்)', active: true },
    { code: 'kannada', name: 'Kannada (ಕನ್ನಡ)', active: true },
    { code: 'malayalam', name: 'Malayalam (മലയാളം)', active: true },
    { code: 'marathi', name: 'Marathi (मराठी)', active: true },
    { code: 'bengali', name: 'Bengali (বাংলা)', active: true },
    { code: 'gujarati', name: 'Gujarati (ગુજરાતી)', active: false },
    { code: 'punjabi', name: 'Punjabi (ਪੰਜਾਬੀ)', active: false }
  ]);

  const mockProfiles = [
    { username: 'adarsh', fullName: 'Adarsh Kumar', age: 24, education: 'Secondary School', occupation: 'Farmer', preferredLanguage: 'english', level: 3, xp: 320, coins: 40, streak: 15, readingScore: 78, writingScore: 45, comprehensionScore: 72, badges: ['First Lesson', '7 Day Streak'], completedLessons: [1, 2], avatar: '🧑‍🎓' },
    { username: 'siddharth', fullName: 'Siddharth Patel', age: 31, education: 'Primary School', occupation: 'Shopkeeper', preferredLanguage: 'hindi', level: 2, xp: 280, coins: 30, streak: 9, readingScore: 65, writingScore: 50, comprehensionScore: 60, badges: ['First Lesson'], completedLessons: [1], avatar: '👩‍🏫' },
    { username: 'priya', fullName: 'Priya Sharma', age: 19, education: 'Self-Taught', occupation: 'Artisan', preferredLanguage: 'telugu', level: 2, xp: 250, coins: 25, streak: 12, readingScore: 70, writingScore: 40, comprehensionScore: 58, badges: ['First Lesson'], completedLessons: [1], avatar: '🧭' },
    { username: 'amit', fullName: 'Amit Singh', age: 45, education: 'No Formal Education', occupation: 'Laborer', preferredLanguage: 'marathi', level: 1, xp: 190, coins: 15, streak: 5, readingScore: 40, writingScore: 30, comprehensionScore: 45, badges: [], completedLessons: [], avatar: '🦉' },
  ];

  useEffect(() => {
    fetchLessons();
    fetchLearners();
  }, []);

  const fetchLessons = async () => {
    try {
      const data = await apiClient.getLessons();
      setLessons(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLearners = () => {
    const saved = localStorage.getItem('profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge mock data with local storage data for a rich view
      const merged = [...parsed];
      mockProfiles.forEach(mock => {
        if (!merged.find(m => m.username === mock.username)) {
          merged.push(mock);
        }
      });
      setLearnersList(merged);
    } else {
      localStorage.setItem('profiles', JSON.stringify(mockProfiles));
      setLearnersList(mockProfiles);
    }
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const newLesson = {
        title,
        difficulty,
        time,
        category,
        content,
        audioText: content.substring(0, 100),
        examples: []
      };
      
      await apiClient.saveLesson(newLesson);
      await fetchLessons();
      
      setTitle('');
      setContent('');
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [generatingAI, setGeneratingAI] = useState(false);

  const handleGenerateAILesson = async () => {
    const topic = window.prompt('Enter topic for AI Lesson Generator (e.g. "Space Exploration", "Rainforest Animals", "Market Shopping"):', 'Space Exploration & Planets');
    if (!topic) return;

    setGeneratingAI(true);
    try {
      const newLesson = await apiClient.generateAILesson({
        topic,
        difficulty: 'Beginner',
        category: 'Reading',
        language: 'English',
        save: true
      });
      alert(`🎉 AI Lesson Generated Successfully!\n\nTitle: ${newLesson.title}\nImage URL: ${newLesson.imageUrl || 'Generated'}`);
      await fetchLessons();
    } catch (err) {
      console.error(err);
      alert('Failed to generate AI lesson. Check console.');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleDeleteLesson = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await apiClient.deleteLesson(id);
        await fetchLessons();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleLanguage = (code: string) => {
    setLanguages(prev => prev.map(lang => 
      lang.code === code ? { ...lang, active: !lang.active } : lang
    ));
  };

  const handleAwardXP = (username: string) => {
    const updated = learnersList.map(learner => {
      if (learner.username === username) {
        const nextXp = (learner.xp || 0) + 50;
        const nextCoins = (learner.coins || 0) + 10;
        const newLearner = { ...learner, xp: nextXp, coins: nextCoins };
        if (selectedLearner && selectedLearner.username === username) {
          setSelectedLearner(newLearner);
        }
        return newLearner;
      }
      return learner;
    });
    setLearnersList(updated);
    localStorage.setItem('profiles', JSON.stringify(updated));
    alert('Successfully awarded +50 XP and +10 Coins to the learner!');
  };

  const filteredLearners = learnersList.filter(l => 
    l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      display: 'flex',
      color: '#1E1040',
      fontFamily: 'Nunito, sans-serif',
      padding: '16px',
      gap: '16px',
    }}>
      {/* Admin Sidebar */}
      <aside style={{
        width: '240px', minWidth: '240px',
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid #EAECF5',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '20px 14px',
      }}>
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">⚙️</div>
            <span className="text-xl font-black text-slate-900 font-poppins">NeoLit Admin</span>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 font-bold px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Overview Stats</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('learners');
                setSelectedLearner(null);
              }}
              className={`w-full flex items-center gap-3 font-bold px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'learners' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Manage Learners</span>
            </button>

            <button
              onClick={() => setActiveTab('lessons')}
              className={`w-full flex items-center gap-3 font-bold px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'lessons' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Manage Lessons</span>
            </button>

            <button
              onClick={() => setActiveTab('languages')}
              className={`w-full flex items-center gap-3 font-bold px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'languages' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Languages className="w-5 h-5" />
              <span>Manage Languages</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 font-bold px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer ${
                activeTab === 'reports' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>System Reports</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 px-3">
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100 font-bold py-3 rounded-2xl text-sm transition-all border border-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Learner Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 space-y-4">
        <header style={{
          height: '64px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid rgba(255,255,255,0.6)',
        }}>
          <span className="font-black text-slate-900 text-lg font-poppins">System Management Console</span>
          <span className="bg-red-100 text-red-700 border border-red-200 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
            SuperAdmin Mode 🛡️
          </span>
        </header>

        <main style={{
          flex: 1,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                  <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Total Active Learners</h4>
                  <p className="text-3xl font-black text-slate-950">{learnersList.length + 14280}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                  <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Active Regional Modules</h4>
                  <p className="text-3xl font-black text-slate-950">8 / 10</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                  <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Today's Active Sessions</h4>
                  <p className="text-3xl font-black text-slate-950">3,124</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                  <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Lesson Completion Rate</h4>
                  <p className="text-3xl font-black text-slate-950">72.4%</p>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Assessment Submissions Trend</h3>
                <div className="h-64 flex items-end justify-center relative pt-4">
                  <svg className="w-full h-full" viewBox="0 0 500 200">
                    <line x1="50" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="50" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="50" y1="160" x2="480" y2="160" stroke="#f1f5f9" strokeWidth="1" />
                    
                    <text x="15" y="25" className="text-[10px] font-bold text-slate-400" fill="currentColor">100%</text>
                    <text x="15" y="95" className="text-[10px] font-bold text-slate-400" fill="currentColor">50%</text>
                    <text x="15" y="165" className="text-[10px] font-bold text-slate-400" fill="currentColor">0%</text>

                    <polygon
                      points="60,140 150,110 240,60 340,80 460,30 460,160 60,160"
                      fill="rgba(37, 99, 235, 0.1)"
                    />
                    
                    <path
                      d="M 60,140 Q 140,120 200,80 T 340,80 T 460,30"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                    />

                    <circle cx="60" cy="140" r="4.5" fill="#2563eb" />
                    <circle cx="150" cy="110" r="4.5" fill="#2563eb" />
                    <circle cx="240" cy="60" r="4.5" fill="#2563eb" />
                    <circle cx="340" cy="80" r="4.5" fill="#2563eb" />
                    <circle cx="460" cy="30" r="4.5" fill="#2563eb" />

                    <text x="50" y="185" className="text-[10px] font-bold text-slate-400" fill="currentColor">Jan</text>
                    <text x="140" y="185" className="text-[10px] font-bold text-slate-400" fill="currentColor">Feb</text>
                    <text x="230" y="185" className="text-[10px] font-bold text-slate-400" fill="currentColor">Mar</text>
                    <text x="330" y="185" className="text-[10px] font-bold text-slate-400" fill="currentColor">Apr</text>
                    <text x="440" y="185" className="text-[10px] font-bold text-slate-400" fill="currentColor">May</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Manage Learners tab (NEW feature user details) */}
          {activeTab === 'learners' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
              {/* Left Column: Learners List */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-lg">Active Learners Profile</h3>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search learners by name or username..."
                    className="w-full text-sm font-semibold bg-transparent focus:outline-none"
                  />
                </div>

                {/* List cards */}
                <div className="space-y-4">
                  {filteredLearners.map((learner) => (
                    <div
                      key={learner.username}
                      onClick={() => setSelectedLearner(learner)}
                      className={`p-5 rounded-3xl border cursor-pointer transition-all hover:translate-x-1 ${
                        selectedLearner?.username === learner.username
                          ? 'border-blue-600 bg-blue-50/35 shadow-sm'
                          : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl">
                            {learner.avatar || '🧑‍🎓'}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-base">{learner.fullName}</h4>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Level {learner.level || 1} • {learner.education}</p>
                          </div>
                        </div>

                        <span className="bg-blue-50 text-blue-600 border border-blue-100 font-extrabold px-3 py-1 rounded-full text-xs">
                          {learner.xp || 0} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed Performance View */}
              <div className="lg:col-span-6">
                {selectedLearner ? (
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 animate-fade-in">
                    
                    {/* Header profile */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                      <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-4xl shadow-sm">
                        {selectedLearner.avatar || '🧑‍🎓'}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-950 text-xl leading-none">{selectedLearner.fullName}</h3>
                        <p className="text-sm font-semibold text-slate-400 mt-1">Username: @{selectedLearner.username}</p>
                      </div>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Streak</span>
                        <p className="text-base font-extrabold text-amber-600 mt-0.5">🔥 {selectedLearner.streak || 0} days</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase">XP score</span>
                        <p className="text-base font-extrabold text-blue-600 mt-0.5">🏆 {selectedLearner.xp || 0}</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Coins</span>
                        <p className="text-base font-extrabold text-yellow-600 mt-0.5">🪙 {selectedLearner.coins || 0}</p>
                      </div>
                    </div>

                    {/* Scores performance list */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Skill Performance Metrics</h4>

                      <div className="space-y-3">
                        {/* Reading */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Reading Score</span>
                            <span className="text-blue-600">{selectedLearner.readingScore || 0}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${selectedLearner.readingScore || 0}%` }} />
                          </div>
                        </div>

                        {/* Writing */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Writing Score</span>
                            <span className="text-emerald-600">{selectedLearner.writingScore || 0}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${selectedLearner.writingScore || 0}%` }} />
                          </div>
                        </div>

                        {/* Comprehension */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Comprehension Score</span>
                            <span className="text-indigo-600">{selectedLearner.comprehensionScore || 0}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${selectedLearner.comprehensionScore || 0}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Extra profile details */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-bold space-y-2.5 text-slate-600">
                      <div className="flex justify-between">
                        <span>Age / Gender:</span>
                        <span className="text-slate-800">{selectedLearner.age || 'N/A'} • {selectedLearner.gender || 'Male'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preferred Language:</span>
                        <span className="text-slate-800 uppercase">{selectedLearner.preferredLanguage || 'English'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupation:</span>
                        <span className="text-slate-800">{selectedLearner.occupation || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed Lessons:</span>
                        <span className="text-slate-800">
                          {selectedLearner.completedLessons && selectedLearner.completedLessons.length > 0 
                            ? `IDs: ${selectedLearner.completedLessons.join(', ')}` 
                            : 'None'}
                        </span>
                      </div>
                    </div>

                    {/* Award XP button action */}
                    <button
                      onClick={() => handleAwardXP(selectedLearner.username)}
                      className="w-full bg-slate-900 hover:bg-black text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Star className="w-4.5 h-4.5 text-yellow-400 fill-current" />
                      <span>Award Onboarding XP Bonus (+50 XP)</span>
                    </button>

                  </div>
                ) : (
                  <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-bold text-sm h-full flex flex-col items-center justify-center">
                    <UserCheck className="w-12 h-12 text-slate-300 mb-3" />
                    <p>Select a learner from the profile roster list to analyze detailed performance charts and scores.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900 text-lg">Curriculum Syllabus List</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGenerateAILesson}
                    disabled={generatingAI}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4.5 h-4.5 animate-spin" />
                    <span>{generatingAI ? 'AI Generating Lesson & Image...' : '✨ Generate with AI (Text + Image)'}</span>
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>Create Lesson</span>
                  </button>
                </div>
              </div>

              {/* Table list */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      <th className="p-4 pl-6">ID</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Difficulty</th>
                      <th className="p-4">Est Time</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {lessons.map((les) => (
                      <tr key={les.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 pl-6 text-slate-400">#{les.id}</td>
                        <td className="p-4 text-slate-950 font-extrabold">{les.title}</td>
                        <td className="p-4">{les.category}</td>
                        <td className="p-4">
                          <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-black ${
                            les.difficulty === 'Beginner' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {les.difficulty}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{les.time}</td>
                        <td className="p-4 flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleDeleteLesson(les.id)}
                            className="text-red-500 hover:text-red-700 p-1 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 text-lg">Active Localized Dialects</h3>
                <p className="text-slate-400 font-semibold text-xs">Enable or disable regional Indian languages available for assessment guides.</p>
              </div>

              {/* Language Grid Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {languages.map((lang) => (
                  <div key={lang.code} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{lang.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Code: {lang.code}</p>
                    </div>

                    <button
                      onClick={() => toggleLanguage(lang.code)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        lang.active ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          lang.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Key Performance Metrics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="border border-slate-100 p-5 rounded-2xl space-y-1 text-center font-semibold">
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Top Languages</h5>
                    <p className="font-extrabold text-slate-800 text-sm">Hindi, Marathi, Bengali</p>
                  </div>

                  <div className="border border-slate-100 p-5 rounded-2xl space-y-1 text-center">
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Average Assessment Score</h5>
                    <p className="font-extrabold text-blue-600 text-lg">58.5%</p>
                  </div>

                  <div className="border border-slate-100 p-5 rounded-2xl space-y-1 text-center font-semibold">
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Most Active Hour</h5>
                    <p className="font-extrabold text-emerald-600 text-sm">8:00 AM - 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Lesson Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 backdrop-blur bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
            <h3 className="font-extrabold text-slate-950 text-xl">Create New Lesson</h3>
            
            <form onSubmit={handleAddLesson} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-semibold"
                  placeholder="e.g. Alphabets Part 2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none font-semibold"
                  >
                    <option value="Reading">Reading</option>
                    <option value="Writing">Writing</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Comprehension">Comprehension</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none font-semibold"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Lesson Text Content</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-semibold"
                  placeholder="Type the full lesson script..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-xs"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
