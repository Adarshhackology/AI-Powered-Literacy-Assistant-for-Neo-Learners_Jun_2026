import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface Module {
  id: string;
  skill_type: 'reading' | 'writing' | 'comprehension';
  is_completed: boolean;
  score: number;
}

interface PlanData {
  modules: Module[];
  weak_skills: string[];
}

export default function AILearningPlan() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<PlanData | null>(null);

  useEffect(() => {
    const fetchAndGeneratePlan = async () => {
      try {
        setLoading(true);
        // First try to generate/get modules
        const response = await fetch('http://127.0.0.1:8000/api/learn-ai/generate-modules/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate modules');
        }
        
        const data = await response.json();
        // Fallback to localStorage if API doesn't return full structure
        if (data.modules) {
          setPlanData(data);
          localStorage.setItem(`plan_${sessionId}`, JSON.stringify(data));
        } else {
          // Mock data for demo if backend isn't fully ready
          const mockData: PlanData = {
            modules: [
              { id: 'mod_1', skill_type: 'reading', is_completed: false, score: 0 },
              { id: 'mod_2', skill_type: 'comprehension', is_completed: false, score: 0 }
            ],
            weak_skills: ['reading', 'comprehension']
          };
          setPlanData(mockData);
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        // Try to load from localStorage
        const saved = localStorage.getItem(`plan_${sessionId}`);
        if (saved) setPlanData(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchAndGeneratePlan();
    }
  }, [sessionId]);

  const allSkills = [
    { type: 'reading', label: 'Reading', icon: <BookOpen className="w-8 h-8 text-blue-500" />, emoji: '📖' },
    { type: 'writing', label: 'Writing', icon: <Edit3 className="w-8 h-8 text-purple-500" />, emoji: '✍️' },
    { type: 'comprehension', label: 'Comprehension', icon: <Brain className="w-8 h-8 text-amber-500" />, emoji: '🧠' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-100 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-2xl font-black text-slate-700 animate-pulse">Creating your magic plan... ✨</h2>
      </div>
    );
  }

  const weakSkills = planData?.weak_skills || [];
  const modules = planData?.modules || [];
  const completedCount = modules.filter(m => m.is_completed).length;
  const firstIncomplete = modules.find(m => !m.is_completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-sky-100/40 p-6 font-nunito">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4 animate-bounce-slow">
            Your AI Learning Plan 📚
          </h1>
          <p className="text-xl text-slate-600 font-bold bg-white/60 inline-block px-6 py-2 rounded-full shadow-sm">
            Progress: {completedCount} of {modules.length} modules completed
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-8 font-bold border-2 border-red-200">
            {error} - Using offline/demo mode.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {allSkills.map((skill) => {
            const isWeak = weakSkills.includes(skill.type);
            const moduleData = modules.find(m => m.skill_type === skill.type);
            
            return (
              <div 
                key={skill.type}
                className={`relative bg-white rounded-3xl p-6 border-4 transition-transform hover:scale-105 shadow-xl ${
                  isWeak ? 'border-indigo-400 shadow-indigo-200/50' : 'border-slate-200 opacity-70 grayscale-[50%]'
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-4 -right-4">
                  {isWeak ? (
                    <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1 border-2 border-white animate-pulse">
                      <CheckCircle2 className="w-4 h-4" /> Assigned
                    </div>
                  ) : (
                    <div className="bg-slate-200 text-slate-500 font-black text-xs px-4 py-2 rounded-full shadow-sm flex items-center gap-1 border-2 border-white">
                      <XCircle className="w-4 h-4" /> Skipped
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner mb-4">
                    {skill.emoji}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 capitalize mb-2">{skill.label}</h3>
                  
                  {isWeak ? (
                    <div className="mt-4 space-y-2 w-full">
                      <div className="bg-indigo-50 rounded-xl p-3 text-sm font-bold text-indigo-700 flex justify-between items-center border border-indigo-100">
                        <span>Questions:</span>
                        <span className="bg-indigo-200 px-2 py-1 rounded-lg">6</span>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-3 text-sm font-bold text-indigo-700 flex justify-between items-center border border-indigo-100">
                        <span>Time:</span>
                        <span className="bg-indigo-200 px-2 py-1 rounded-lg">~10 min</span>
                      </div>
                      {moduleData?.is_completed && (
                        <div className="text-green-500 font-black mt-2">✨ Completed!</div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 p-4 bg-slate-100 rounded-xl text-slate-500 font-bold border border-slate-200">
                      You're already great at this! 🌟
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          {firstIncomplete ? (
            <button 
              onClick={() => navigate(`/learn-with-ai/practice/${sessionId}/${firstIncomplete.id}`)}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 border-b-8 border-indigo-700 text-white font-black text-2xl px-12 py-6 rounded-3xl shadow-xl hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all flex items-center gap-3"
            >
              Begin First Module <ArrowRight className="w-8 h-8" />
            </button>
          ) : (
            <button 
              onClick={() => navigate(`/learn-with-ai/retest/${sessionId}`)}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 border-b-8 border-emerald-600 text-white font-black text-2xl px-12 py-6 rounded-3xl shadow-xl hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all flex items-center gap-3"
            >
              Take Final Retest <ArrowRight className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
