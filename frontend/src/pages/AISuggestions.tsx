import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Target, Zap, Trophy, ArrowRight, BookOpen, Star } from 'lucide-react';

export default function AISuggestions() {
  const { sessionId, moduleId } = useParams();
  const navigate = useNavigate();
  
  const [nextModuleId, setNextModuleId] = useState<string | null>(null);
  const [nextSkillName, setNextSkillName] = useState<string>('Advanced Practice');

  useEffect(() => {
    // Read plan from localStorage to calculate real next module
    const planStr = localStorage.getItem(`plan_${sessionId}`);
    if (planStr) {
      try {
        const plan = JSON.parse(planStr);
        const mods = plan.modules || [];
        
        // Find next incomplete module that is not current moduleId
        const nextMod = mods.find((m: any) => String(m.id) !== String(moduleId) && m.status !== 'completed');
        
        if (nextMod) {
          setNextModuleId(String(nextMod.id));
          const s = (nextMod.skill || nextMod.skill_type || 'reading').toLowerCase();
          setNextSkillName(s.includes('write') ? '✍️ Writing Practice' : s.includes('comp') ? '🧠 Comprehension Practice' : '📖 Reading Practice');
        } else {
          setNextModuleId(null);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [sessionId, moduleId]);

  const score = 85;
  const tips = [
    { title: "Watch your vowels!", desc: "You're doing great, but stretch out vowel sounds in tricky words.", icon: <Target className="w-6 h-6 text-pink-500" />, bg: "bg-pink-100" },
    { title: "Pacing is perfect", desc: "Your reading and writing speed is right where it should be. Keep it up!", icon: <Zap className="w-6 h-6 text-amber-500" />, bg: "bg-amber-100" },
    { title: "Vocabulary master", desc: "You correctly answered the challenging questions in this module.", icon: <Trophy className="w-6 h-6 text-emerald-500" />, bg: "bg-emerald-100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-sky-100 p-6 flex flex-col items-center font-nunito pt-12">
      
      {/* Header Mascot */}
      <div className="relative mb-12 flex flex-col items-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-7xl shadow-xl border-4 border-indigo-200 z-10 animate-bounce-slow">
          🤖
        </div>
        <div className="bg-indigo-600 text-white font-black text-xl md:text-2xl px-8 py-4 rounded-3xl -mt-6 pt-10 shadow-lg text-center max-w-lg relative border-b-4 border-indigo-800">
          "Fantastic work! Here's how you can become even better!"
          <div className="absolute -top-4 right-10 text-3xl animate-pulse">✨</div>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Score Card */}
        <div className="md:col-span-4 bg-white rounded-[2rem] p-8 shadow-xl border-4 border-slate-100 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-black text-slate-700 mb-6">Module Score</h2>
          
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
              <circle 
                cx="50" cy="50" r="40" fill="transparent" 
                stroke="#8b5cf6" strokeWidth="12" 
                strokeDasharray={`${score * 2.51} 251`} 
                strokeLinecap="round" 
                className="transition-all duration-1500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-violet-600">{score}%</span>
              <span className="text-lg font-bold text-slate-400 mt-1">Great Job!</span>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-2xl font-black text-slate-800 pl-2">AI Feedback & Tips</h2>
          
          {tips.map((tip, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-100 flex gap-5 items-center hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${tip.bg} rounded-2xl flex items-center justify-center shrink-0 shadow-inner`}>
                {tip.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 mb-1">{tip.title}</h3>
                <p className="text-slate-600 font-bold text-lg leading-snug">{tip.desc}</p>
              </div>
            </div>
          ))}

          {/* Recommended Next Module / Retest Card */}
          <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] p-1 shadow-lg transform hover:scale-[1.02] transition-transform">
            <div className="bg-white/95 backdrop-blur-sm rounded-[1.8rem] p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-sm font-black text-indigo-500 uppercase tracking-wider mb-1 flex items-center gap-1 justify-center md:justify-start">
                  <Star className="w-4 h-4" /> Up Next
                </div>
                <h3 className="text-2xl font-black text-slate-800">{nextModuleId ? nextSkillName : 'Final Skills Retest'}</h3>
                <p className="text-slate-600 font-bold mt-1">Expected improvement: +15%</p>
              </div>
              <button 
                onClick={() => {
                  if (nextModuleId) {
                    navigate(`/learn-with-ai/practice/${sessionId}/${nextModuleId}`);
                  } else {
                    navigate(`/learn-with-ai/retest/${sessionId}`);
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl px-8 py-4 rounded-xl shadow-md transition-colors flex items-center gap-2 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 w-full md:w-auto justify-center cursor-pointer"
              >
                {nextModuleId ? 'Next Module' : 'Take Retest'} <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-slate-500 font-bold text-xl pb-10">
        You're getting better every day! Keep it up! 🚀
      </div>
    </div>
  );
}
