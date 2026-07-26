import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Loader2, CheckCircle2, XCircle, Award } from 'lucide-react';
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
        
        let loadedModules: ModuleData[] = [];
        let loadedWeak: string[] = [];

        // Try reading updated plan from localStorage first
        const savedPlanStr = localStorage.getItem(`plan_${sessionId}`);
        if (savedPlanStr) {
          try {
            const savedPlan = JSON.parse(savedPlanStr);
            if (savedPlan.modules && savedPlan.modules.length > 0) {
              loadedModules = savedPlan.modules;
              loadedWeak = savedPlan.weak_skills || loadedModules.map(m => m.skill);
            }
          } catch (e) {
            console.error(e);
          }
        }

        if (loadedModules.length === 0) {
          const data = await apiClient.generateAIModules(Number(sessionId));
          if (data && data.modules && data.modules.length > 0) {
            loadedModules = data.modules;
            loadedWeak = data.weak_areas || loadedModules.map(m => m.skill);
          }
        }

        // Fallback default if modules array is empty
        if (loadedModules.length === 0) {
          loadedModules = [
            { id: '1', skill: 'reading', status: 'pending', questions: [1,2,3,4,5,6] },
            { id: '2', skill: 'writing', status: 'pending', questions: [1,2,3,4,5,6] },
            { id: '3', skill: 'comprehension', status: 'skipped', questions: [], score: 100 }
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
          { id: '2', skill: 'writing', status: 'pending', questions: [1,2,3,4,5,6] }
        ];
        setModules(fallback);
        setWeakSkills(['reading', 'writing']);
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
        <h2 className="text-2xl font-black text-slate-700 animate-pulse">Loading your AI learning plan... ✨</h2>
      </div>
    );
  }

  // Assigned modules are ones that have questions or are in weakSkills
  const assignedModules = modules.filter(m => (m.questions && m.questions.length > 0) || weakSkills.includes(m.skill) || m.status === 'pending' || m.status === 'completed');
  const completedCount = modules.filter(m => m.status === 'completed' && ((m.questions && m.questions.length > 0) || weakSkills.includes(m.skill))).length;
  const firstIncomplete = assignedModules.find(m => m.status !== 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-sky-100/40 p-6 font-nunito">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4 animate-bounce-slow">
            Your AI Learning Plan 📚
          </h1>
          <p className="text-xl text-slate-600 font-bold bg-white/80 border-2 border-indigo-100 inline-block px-6 py-2.5 rounded-full shadow-sm">
            Progress: <span className="text-indigo-600 font-black">{completedCount}</span> of <span className="text-indigo-600 font-black">{assignedModules.length}</span> modules completed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {allSkills.map((skill) => {
            const moduleData = modules.find(m => m.skill === skill.type);
            const isCompleted = moduleData?.status === 'completed';
            const isAssigned = moduleData ? (moduleData.status !== 'skipped' && (moduleData.status === 'pending' || moduleData.status === 'completed' || (moduleData.questions && moduleData.questions.length > 0))) : weakSkills.includes(skill.type);
            
            return (
              <div 
                key={skill.type}
                className={`relative bg-white rounded-3xl p-6 border-4 transition-all hover:scale-105 shadow-xl ${
                  isCompleted 
                    ? 'border-emerald-400 bg-emerald-50/30 shadow-emerald-200/50'
                    : isAssigned 
                      ? 'border-indigo-400 shadow-indigo-200/50' 
                      : 'border-slate-200 opacity-60 grayscale-[40%]'
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-4 -right-4">
                  {isCompleted ? (
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1 border-2 border-white">
                      <Award className="w-4 h-4 text-yellow-300" /> Completed!
                    </div>
                  ) : isAssigned ? (
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1 border-2 border-white animate-pulse">
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
                  
                  {isCompleted ? (
                    <div className="mt-4 space-y-2 w-full">
                      <div className="bg-emerald-100/80 border border-emerald-200 p-3 rounded-2xl text-emerald-800 font-black text-center text-base shadow-sm">
                        ✨ Completed! (Score: 85%)
                      </div>
                    </div>
                  ) : isAssigned ? (
                    <div className="mt-4 space-y-2 w-full">
                      <div className="bg-indigo-50 rounded-xl p-3 text-sm font-bold text-indigo-700 flex justify-between items-center border border-indigo-100">
                        <span>Questions:</span>
                        <span className="bg-indigo-200 px-2.5 py-1 rounded-lg">6</span>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-3 text-sm font-bold text-indigo-700 flex justify-between items-center border border-indigo-100">
                        <span>Time:</span>
                        <span className="bg-indigo-200 px-2 py-1 rounded-lg">~10 min</span>
                      </div>
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
              className="bg-gradient-to-r from-indigo-500 to-blue-600 border-b-8 border-indigo-800 text-white font-black text-2xl px-12 py-6 rounded-3xl shadow-xl hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all flex items-center gap-3 cursor-pointer"
            >
              Begin Practice Module ({firstIncomplete.skill.toUpperCase()}) <ArrowRight className="w-8 h-8" />
            </button>
          ) : (
            <button 
              onClick={() => navigate(`/learn-with-ai/retest/${sessionId}`)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 border-b-8 border-emerald-800 text-white font-black text-2xl px-12 py-6 rounded-3xl shadow-xl hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all flex items-center gap-3 cursor-pointer animate-pulse"
            >
              Take Final Retest <ArrowRight className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
