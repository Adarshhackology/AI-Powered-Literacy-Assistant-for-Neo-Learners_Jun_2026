import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Target, Zap, CheckCircle2, XCircle, ArrowRight, Star } from 'lucide-react';

interface SkillResult {
  name: string;
  score: number;
  icon: string;
}

export default function AIWeakAreas() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [skills, setSkills] = useState<SkillResult[]>([]);

  useEffect(() => {
    // Fetch or read from local storage
    const local = localStorage.getItem(`assessment_result_${sessionId}`);
    if (local) {
      const data = JSON.parse(local);
      setSkills([
        { name: 'Reading', score: data.reading || 0, icon: '📖' },
        { name: 'Writing', score: data.writing || 0, icon: '✍️' },
        { name: 'Comprehension', score: data.comprehension || 0, icon: '🧠' }
      ]);
    } else {
      setSkills([
        { name: 'Reading', score: 85, icon: '📖' },
        { name: 'Writing', score: 40, icon: '✍️' },
        { name: 'Comprehension', score: 60, icon: '🧠' }
      ]);
    }
  }, [sessionId]);

  const weakCount = skills.filter(s => s.score < 60).length;

  return (
    <div className="min-h-screen bg-sky-50 font-['Nunito'] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 mb-4 flex items-center justify-center gap-4">
            Let's Find Where You Need Help! 🔍
          </h1>
          <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            Don't worry! Everyone has areas to improve. Let's build a learning plan together! 💪
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          {skills.map((skill, index) => {
            const isStrong = skill.score >= 60;
            return (
              <div 
                key={skill.name}
                className={`p-6 sm:p-8 rounded-[2rem] border-4 flex flex-col sm:flex-row items-center gap-6 transition-transform hover:scale-[1.02]
                  ${isStrong ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-inner
                  ${isStrong ? 'bg-green-200' : 'bg-red-200'}
                `}>
                  {skill.icon}
                </div>
                
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{skill.name}</h3>
                  <div className="w-full bg-white rounded-full h-6 mb-2 border-2 border-slate-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out
                        ${isStrong ? 'bg-green-500' : 'bg-red-500'}
                      `}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-bold text-slate-500">Score: {skill.score}/100</p>
                </div>

                <div className={`flex flex-col items-center justify-center w-full sm:w-auto p-4 rounded-2xl
                  ${isStrong ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                `}>
                  {isStrong ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 mb-1" />
                      <span className="font-black text-center leading-tight">Strong!<br/>Great job!</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-8 h-8 mb-1" />
                      <span className="font-black text-center leading-tight">Needs<br/>Practice</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-center text-white shadow-xl relative overflow-hidden">
          <Star className="absolute top-4 right-8 w-12 h-12 text-yellow-300 opacity-50 animate-spin-slow" />
          <Star className="absolute bottom-4 left-8 w-8 h-8 text-yellow-300 opacity-50 animate-bounce" />
          
          <h2 className="text-3xl font-black mb-4 relative z-10">
            AI detected {weakCount} weak {weakCount === 1 ? 'area' : 'areas'}.
          </h2>
          <p className="text-xl font-semibold mb-8 text-indigo-100 relative z-10">
            Let's turn those weaknesses into super strengths! 🦸‍♂️🦸‍♀️
          </p>
          
          <button
            onClick={() => navigate(`/learn-with-ai/plan/${sessionId}`)}
            className="relative z-10 inline-flex items-center gap-3 bg-yellow-400 text-slate-900 px-10 py-5 rounded-full font-black text-2xl shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:scale-105 hover:bg-yellow-300 transition-all active:scale-95"
          >
            Start My Learning Plan
            <ArrowRight className="w-8 h-8" />
          </button>
        </div>

      </div>
    </div>
  );
}
