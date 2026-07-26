import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, History, ChevronRight, Brain, AlertCircle } from 'lucide-react';

interface Session {
  id: string;
  language: string;
  date: string;
  status: string;
  overall_score: number;
}

export default function LearnWithAI() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const username = localStorage.getItem('username') || 'guest';
        const response = await fetch(`http://127.0.0.1:8000/api/learn-ai/history/${username}/`);
        if (!response.ok) throw new Error('Failed to fetch sessions');
        const data = await response.json();
        setSessions(data.sessions || []);
      } catch (err) {
        console.error(err);
        // Fallback to local storage if API fails
        const local = localStorage.getItem('ai_sessions');
        if (local) {
          setSessions(JSON.parse(local));
        } else {
          setError('Could not load past sessions.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 p-6 font-['Nunito'] text-white">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-white/80 hover:text-white flex items-center gap-2 font-bold transition-colors"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 shadow-xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce duration-1000">
            <span className="text-6xl">🧠</span>
          </div>
          <h1 className="text-5xl font-black mb-4 tracking-tight">AI Learning Hub! ✨</h1>
          <p className="text-xl text-white/90 mb-8 font-semibold max-w-2xl mx-auto">
            Ready for a magical adventure? Let our smart AI friend help you learn new languages and get super smart!
          </p>
          <button 
            onClick={() => navigate('/learn-with-ai/language')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-8 py-4 rounded-full font-black text-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(251,146,60,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            Start New Learning Session
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 text-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-8 h-8 text-indigo-500" />
            <h2 className="text-3xl font-black text-slate-800">Your Learning Journey 🗺️</h2>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <Brain className="w-12 h-12 text-indigo-500 animate-spin" />
            </div>
          ) : error && sessions.length === 0 ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 font-bold">
              <AlertCircle className="w-6 h-6" /> {error}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <span className="text-6xl mb-4 block">🌱</span>
              <h3 className="text-2xl font-black text-slate-400 mb-2">No sessions yet!</h3>
              <p className="text-slate-500 font-bold">Start your first AI learning adventure above!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => navigate(session.status === 'completed' ? `/learn-with-ai/scores/${session.id}` : `/learn-with-ai/assessment/${session.id}`)}
                  className="flex items-center justify-between p-5 bg-slate-50 hover:bg-indigo-50 rounded-2xl border-2 border-slate-100 hover:border-indigo-200 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">
                      {session.language === 'English' ? '🇺🇸' : '🇮🇳'}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-1">{session.language} Module</h3>
                      <p className="text-sm font-bold text-slate-400">{new Date(session.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-400">Score</p>
                      <p className={`text-2xl font-black ${session.overall_score >= 75 ? 'text-green-500' : session.overall_score >= 45 ? 'text-amber-500' : 'text-red-500'}`}>
                        {session.overall_score > 0 ? `${session.overall_score}%` : '--'}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-bold text-sm ${session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {session.status === 'completed' ? 'Done ✅' : 'Resume 🔄'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
