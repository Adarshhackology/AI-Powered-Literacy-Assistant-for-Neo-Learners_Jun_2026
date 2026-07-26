import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { apiClient } from '../utils/api';

interface ModuleData {
  id: string | number;
  skill: string;
  status: string;
  questions?: any[];
  score?: number;
}

export default function AILearningPlan() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [weakSkills, setWeakSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndGeneratePlan = async () => {
      try {
        setLoading(true);
        const data = await apiClient.generateAIModules(Number(sessionId));
        
        let loadedModules: ModuleData[] = [];
        let loadedWeak: string[] = [];

        if (data && data.modules && data.modules.length > 0) {
          loadedModules = data.modules;
          loadedWeak = data.weak_areas || loadedModules.filter(m => m.status === 'pending' || (m.questions && m.questions.length > 0)).map(m => m.skill);
        }

        // Fallback default if modules array is empty
        if (loadedModules.length === 0) {
          loadedModules = [
            { id: '1', skill: 'reading', status: 'pending', questions: [1,2,3,4,5,6] },
            { id: '2', skill: 'writing', status: 'pending', questions: [1,2,3,4,5,6] },
            { id: '3', skill: 'comprehension', status: 'completed', questions: [], score: 100 }
          ];
          loadedWeak = ['reading', 'writing'];
        }

        setModules(loadedModules);
        setWeakSkills(loadedWeak);
        localStorage.setItem(`plan_${sessionId}`, JSON.stringify({ modules: loadedModules, weak_skills: loadedWeak }));
      } catch (err: any) {
        console.warn('Using fallback local plan data');
        const fallback = [
          { id: '1', skill: 'reading', status: 'pending', questions: [1,2,3,4,5,6] },
          { id: '2', skill: 'comprehension', status: 'pending', questions: [1,2,3,4,5,6] }
        ];
        setModules(fallback);
        setWeakSkills(['reading', 'comprehension']);
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
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-100 flex flex-col items-center justify-center p-6 font-nunito">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-2xl font-black text-slate-700 animate-pulse">Creating your AI magic plan... ✨</h2>
      </div>
    );
  }

  const assignedModules = modules.filter(m => m.status === 'pending' || m.status === 'in_progress' || (m.questions && m.questions.length > 0 && m.status !== 'completed'));
  const completedCount = modules.filter(m => m.status === 'completed' && m.questions && m.questions.length > 0).length;
  const firstIncomplete = modules.find(m => m.status === 'pending' || m.status === 'in_progress');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-sky-100/40 p-6 font-nunito">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4 animate-bounce-slow">
            Your AI Learning Plan 📚
          </h1>
          <p className="text-xl text-slate-600 font-bold bg-white/60 inline-block px-6 py-2 rounded-full shadow-sm">
            Progress: {completedCount} of {assignedModules.length || 1} modules completed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {allSkills.map((skill) => {
            const moduleData = modules.find(m => m.skill === skill.type);
            const isAssigned = moduleData ? (moduleData.status === 'pending' || moduleData.status === 'in_progress' || (moduleData.questions && moduleData.questions.length > 0 && moduleData.status !== 'completed')) : weakSkills.includes(skill.type);
            const isDone = moduleData?.status === 'completed' && moduleData.score !== 100;
            
            return (
              <div 
                key={skill.type}
                className={`relative bg-white rounded-3xl p-6 border-4 transition-transform hover:scale-105 shadow-xl ${
                  isAssigned ? 'border-indigo-400 shadow-indigo-200/50' : 'border-slate-200 opacity-70 grayscale-[30%]'
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-4 -right-4">
                  {isAssigned ? (
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
                  
                  {isAssigned ? (
                    <div className="mt-4 space-y-2 w-full">
                      <div className="bg-indigo-50 rounded-xl p-3 text-sm font-bold text-indigo-700 flex justify-between items-center border border-indigo-100">
                        <span>Questions:</span>
                        <span className="bg-indigo-200 px-2.5 py-1 rounded-lg">6</span>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-3 text-sm font-bold text-indigo-700 flex justify-between items-center border border-indigo-100">
                        <span>Time:</span>
                        <span className="bg-indigo-200 px-2 py-1 rounded-lg">~10 min</span>
                      </div>
                      {isDone && (
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
              Begin Practice Module →
            </button>
          ) : (
            <button 
              onClick={() => {
                const firstMod = modules[0] || { id: '1' };
                navigate(`/learn-with-ai/practice/${sessionId}/${firstMod.id}`);
              }}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 border-b-8 border-indigo-700 text-white font-black text-2xl px-12 py-6 rounded-3xl shadow-xl hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all flex items-center gap-3"
            >
              Begin Practice Module →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
