import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, ArrowRight, Target, Sparkles, BookOpen, Edit3, Brain } from 'lucide-react';

export default function AIScoreResults() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [scores, setScores] = useState({ reading: 0, writing: 0, comprehension: 0 });
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    // Confetti effect could go here
    const timer = setTimeout(() => setAnimating(false), 2000);
    
    // Fetch scores
    const fetchScores = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/learn-ai/session/${sessionId}/`);
        if (response.ok) {
          const data = await response.json();
          if (data.scores) setScores(data.scores);
        } else {
          // Fallback to local storage
          const local = localStorage.getItem(`assessment_result_${sessionId}`);
          if (local) setScores(JSON.parse(local));
        }
      } catch (e) {
        const local = localStorage.getItem(`assessment_result_${sessionId}`);
        if (local) setScores(JSON.parse(local));
      }
    };
    fetchScores();
    return () => clearTimeout(timer);
  }, [sessionId]);

  const overall = Math.round((scores.reading + scores.writing + scores.comprehension) / 3);
  
  const getLevel = (score: number) => {
    if (score >= 80) return { label: 'Advanced 🏆', color: 'text-green-500' };
    if (score >= 50) return { label: 'Intermediate ⭐', color: 'text-amber-500' };
    return { label: 'Beginner 🌱', color: 'text-blue-500' };
  };

  const getRingColor = (score: number) => {
    if (score >= 75) return 'text-green-500';
    if (score >= 45) return 'text-amber-500';
    return 'text-red-500';
  };

  const level = getLevel(overall);

  return (
    <div className="min-h-screen bg-slate-50 font-['Nunito'] p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative background blurbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-in slide-in-from-top-8 duration-700">
          <div className="inline-block bg-white p-4 rounded-full shadow-lg mb-6 transform hover:rotate-12 transition-transform">
            <Trophy className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-800 mb-4 tracking-tight">
            Awesome Job! 🎉
          </h1>
          <p className="text-2xl text-slate-600 font-bold">
            Here are your magical AI results
          </p>
        </div>

        {/* Main Score Card */}
        <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border-4 border-white mb-12">
          
          <div className="text-center mb-12">
            <p className="text-slate-500 font-black tracking-widest uppercase mb-2">Overall Level</p>
            <div className={`text-4xl sm:text-5xl font-black ${level.color} bg-slate-50 inline-block px-8 py-4 rounded-3xl shadow-inner border-2 border-slate-100`}>
              {level.label}
            </div>
            <div className="mt-6 text-7xl font-black text-slate-800">
              {overall}<span className="text-4xl text-slate-400">/100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Reading', score: scores.reading, icon: BookOpen },
              { label: 'Writing', score: scores.writing, icon: Edit3 },
              { label: 'Comprehension', score: scores.comprehension, icon: Brain },
            ].map((skill, idx) => (
              <div key={skill.label} className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 hover:border-indigo-200 transition-colors">
                <skill.icon className={`w-10 h-10 mb-4 ${getRingColor(skill.score)}`} />
                <h3 className="text-xl font-black text-slate-700 mb-4">{skill.label}</h3>
                
                {/* Circular Progress (Simplified CSS version) */}
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-white shadow-inner">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" className="text-slate-100" strokeWidth="12" stroke="currentColor" fill="none" />
                    <circle cx="64" cy="64" r="56" className={`${getRingColor(skill.score)} transition-all duration-1000 ease-out`} strokeWidth="12" strokeDasharray="351.85" strokeDashoffset={351.85 - (351.85 * skill.score) / 100} strokeLinecap="round" stroke="currentColor" fill="none" />
                  </svg>
                  <span className="text-3xl font-black text-slate-800 absolute">
                    {skill.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/learn-with-ai/weak-areas/${sessionId}`)}
            className="group flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-full font-black text-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <Target className="w-8 h-8" />
            View My Weak Areas
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
