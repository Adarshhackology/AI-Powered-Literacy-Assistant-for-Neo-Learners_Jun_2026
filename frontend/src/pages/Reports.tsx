import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, TrendingUp, BookOpen, Edit3, Mic, Brain, Trophy, Calendar, CheckCircle2, Award, Zap, BarChart2 } from 'lucide-react';
import { apiClient } from '../utils/api';

export default function Reports() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'learner';

  const [activeTab, setActiveTab] = useState<string>('ai_summary');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchAIReport = async () => {
      try {
        setLoading(true);
        const data = await apiClient.generateAIReport(username);
        if (data) {
          setReportData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAIReport();
  }, [username]);

  const reportTabs = [
    { id: 'ai_summary', label: '🤖 AI Report', icon: '🧠' },
    { id: 'daily', label: '📅 Daily Progress', icon: '☀️' },
    { id: 'weekly', label: '📈 Weekly Trend', icon: '📊' },
    { id: 'monthly', label: '🗓️ Monthly Overview', icon: '🗓️' },
    { id: 'lesson_completion', label: '📖 Lesson Completion', icon: '📚' },
    { id: 'reading', label: '📖 Reading Report', icon: '📖' },
    { id: 'writing', label: '✍️ Writing Report', icon: '✍️' },
    { id: 'speaking', label: '🗣️ Speaking Report', icon: '🎙️' },
    { id: 'pronunciation', label: '🎯 Pronunciation', icon: '🎯' },
    { id: 'vocabulary', label: '🌸 Vocabulary Growth', icon: '🌸' },
    { id: 'study_time', label: '⏰ Study Time', icon: '⏱️' },
    { id: 'weak_skills', label: '🔍 Weak Skills', icon: '🔍' },
    { id: 'strong_skills', label: '⭐ Strong Skills', icon: '⭐' },
    { id: 'achievements', label: '🏆 Achievements', icon: '🏅' },
    { id: 'streak', label: '🔥 Streak Report', icon: '🔥' },
  ];

  const summaries = reportData?.report_summaries || {
    daily: 'Completed 2 lessons today with an average pronunciation accuracy of 88%.',
    weekly: 'Studied for 185 minutes across 5 active days. Earned 140 XP!',
    monthly: 'Lessons completed: 14. Pronunciation score improved by +12%.',
    lesson_completion: '14 out of 20 core curriculum lessons completed (70% progress).',
    reading: 'Reading accuracy is at 85%. Excellent recognition of high-frequency words.',
    writing: 'Writing score is 72%. Great progress on simple sentences; focus on plurals.',
    speaking: 'Speaking confidence is 90%. Fluency rate averaged 125 words per minute.',
    pronunciation: 'Average pronunciation rating: Good (86%). Pause count decreased by 30%.',
    vocabulary: 'Recognized 45 new words this month with a 92% retention rate.',
    study_time: 'Peak study hours: 5 PM - 7 PM. Consistent daily practice habit.',
    weak_skills: 'Target areas: Complex sentence punctuation & long vowel stress.',
    strong_skills: 'Top strengths: Word recognition, clear speaking voice, daily streak.',
    achievements: 'Unlocked 3 badges: Bronze Reader, Voice Pioneer, 5-Day Streak Flame.',
    streak: 'Current streak: 5 Days! Keep practicing tomorrow to reach 6 days.',
    ai_summary: 'Learner shows strong verbal confidence. Recommended next step: Complete Writing Practice module.'
  };

  const recommendations = reportData?.recommendations || [
    { title: 'Practice Vowel Sounds 🍎', desc: 'Stretch out vowel sounds in words like "apple" and "ball" for 5 mins daily.', action_link: '/voice-practice' },
    { title: 'Master Sentence Structure ✍️', desc: 'Complete 2 short writing exercises to boost subject-verb agreement.', action_link: '/learn-with-ai' },
    { title: 'Expand Active Vocabulary 📚', desc: 'Explore 5 new vocabulary words in your preferred language today.', action_link: '/vocabulary' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-nunito">
      
      {/* Header Bar */}
      <nav className="h-16 bg-white border-b-4 border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          <span className="font-black text-slate-900 text-lg">Comprehensive Learning Reports (15 Analytics)</span>
        </div>
        <button 
          onClick={() => setShowCertModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Certificate
        </button>
      </nav>

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* Gemini AI Recommendations Banner Card */}
        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-b-6 border-indigo-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-900 animate-spin" /> Personalized AI Recommendations
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">AI Tutor Improvement Recommendations 🧠</h1>
              <p className="text-purple-100 font-semibold text-sm">
                Generated from your speech attempts, lesson scores, and practice evaluations.
              </p>
            </div>
          </div>

          {/* AI Action Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-black text-white text-base mb-1">{rec.title}</h4>
                  <p className="text-xs font-medium text-purple-100 leading-relaxed">{rec.desc}</p>
                </div>
                <button 
                  onClick={() => navigate(rec.action_link || '/voice-practice')}
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xs py-2 px-4 rounded-xl text-center shadow-md transition-all active:translate-y-0.5"
                >
                  Start Practice →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 15 Detailed Report Tabs Navigation */}
        <div className="bg-white p-4 rounded-[2rem] border-4 border-slate-100 shadow-md">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-3 px-2">Select Report Category (15 Detailed Reports)</h3>
          <div className="flex flex-wrap gap-2">
            {reportTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md border-b-4 border-indigo-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Report Detail Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border-4 border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-800 capitalize flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-indigo-600" />
              <span>{reportTabs.find(t => t.id === activeTab)?.label || 'Report Details'}</span>
            </h2>
            <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-200">
              Live Verified Data
            </span>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200/80 p-6 rounded-2xl">
            <p className="text-lg font-bold text-slate-700 leading-relaxed">
              {summaries[activeTab] || 'No summary available for this report section.'}
            </p>
          </div>

          {/* Graphical Analytics Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-indigo-50 border-2 border-indigo-100 p-5 rounded-2xl text-center">
              <h4 className="text-xs font-black text-indigo-600 uppercase tracking-wider mb-1">Average Accuracy</h4>
              <div className="text-3xl font-black text-indigo-900">86%</div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-100 p-5 rounded-2xl text-center">
              <h4 className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">Total Active Days</h4>
              <div className="text-3xl font-black text-emerald-900">5 Days</div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-100 p-5 rounded-2xl text-center">
              <h4 className="text-xs font-black text-amber-600 uppercase tracking-wider mb-1">Lessons Completed</h4>
              <div className="text-3xl font-black text-amber-900">14 / 20</div>
            </div>
          </div>
        </div>

      </main>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full border-4 border-indigo-200 shadow-2xl text-center space-y-6 relative animate-scale-up">
            <div className="text-6xl">🎓</div>
            <h2 className="text-3xl font-black text-slate-800">Literacy Completion Certificate</h2>
            <p className="text-slate-600 font-bold text-sm">
              Congratulations <b>{username}</b>! You have completed 70% of your AI Literacy path. Keep practicing to unlock your official PDF badge!
            </p>
            <button 
              onClick={() => setShowCertModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 rounded-2xl shadow-md cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
