import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowRight, Home, Star } from 'lucide-react';

export default function AIComparison() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  // Mock data
  const beforeScores = { reading: 45, writing: 60, comprehension: 50 };
  const afterScores = { reading: 85, writing: 75, comprehension: 80 };
  
  const overallBefore = Math.round((beforeScores.reading + beforeScores.writing + beforeScores.comprehension) / 3);
  const overallAfter = Math.round((afterScores.reading + afterScores.writing + afterScores.comprehension) / 3);
  const diff = overallAfter - overallBefore;
  const isImproved = diff >= 10;

  const [counter, setCounter] = useState(overallBefore);

  useEffect(() => {
    // Simple counter animation
    if (counter < overallAfter) {
      const timer = setTimeout(() => setCounter(c => Math.min(c + 2, overallAfter)), 50);
      return () => clearTimeout(timer);
    }
  }, [counter, overallAfter]);

  const renderSkillComparison = (name: string, before: number, after: number, emoji: string) => {
    const d = after - before;
    const isUp = d > 0;
    const isDown = d < 0;

    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-slate-100 flex items-center gap-4 relative overflow-hidden">
        <div className="text-4xl bg-slate-50 p-3 rounded-2xl border-2 border-slate-100">{emoji}</div>
        
        <div className="flex-1">
          <h3 className="text-xl font-black text-slate-700 capitalize mb-2">{name}</h3>
          
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-slate-400 opacity-60 line-through">{before}</div>
            <ArrowRight className="w-5 h-5 text-slate-300" />
            <div className={`text-3xl font-black ${isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-slate-500'}`}>
              {after}
            </div>
            
            <div className={`ml-auto px-3 py-1 rounded-xl text-sm font-black flex items-center gap-1 ${
              isUp ? 'bg-green-100 text-green-700' : isDown ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {isUp ? <TrendingUp className="w-4 h-4"/> : isDown ? <TrendingDown className="w-4 h-4"/> : <Minus className="w-4 h-4"/>}
              {Math.abs(d)}
            </div>
          </div>
        </div>

        {/* Animated Background Bar */}
        <div 
          className={`absolute bottom-0 left-0 h-2 transition-all duration-1000 ${isUp ? 'bg-green-400' : isDown ? 'bg-red-400' : 'bg-slate-300'}`} 
          style={{ width: `${after}%` }} 
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8 font-nunito flex flex-col items-center pb-24 relative overflow-hidden">
      
      {/* CSS Confetti if improved */}
      {isImproved && (
        <div className="absolute inset-0 pointer-events-none opacity-50 z-0" 
             style={{ backgroundImage: 'radial-gradient(circle, #fca5a5 2px, transparent 2px), radial-gradient(circle, #86efac 2px, transparent 2px)', backgroundSize: '100px 100px, 120px 120px', backgroundPosition: '0 0, 50px 50px' }}>
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mt-6 mb-8 text-center z-10">
        Your Progress Report 📊
      </h1>

      {/* Main Overall Card */}
      <div className="w-full max-w-4xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-indigo-100 text-center mb-10 z-10 relative">
        <Trophy className={`w-24 h-24 mx-auto mb-6 ${isImproved ? 'text-yellow-400 animate-bounce' : 'text-slate-300'}`} />
        
        <div className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-2">Overall Score</div>
        
        <div className="flex justify-center items-center gap-6 mb-4">
          <div className="text-5xl font-black text-slate-300">{overallBefore}</div>
          <ArrowRight className="w-10 h-10 text-indigo-300" />
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 scale-110">
            {counter}
          </div>
        </div>

        <div className={`inline-block px-6 py-2 rounded-full text-2xl font-black mb-8 border-2 ${
          isImproved ? 'bg-green-100 text-green-600 border-green-200' : 'bg-amber-100 text-amber-600 border-amber-200'
        }`}>
          {diff > 0 ? `+${diff}% Improvement! 🎉` : `${diff}% Change`}
        </div>

        <p className="text-2xl font-bold text-slate-700 max-w-lg mx-auto">
          {isImproved 
            ? "🎉 Congratulations! You've unlocked new lessons! You are a learning superstar! ⭐" 
            : "You're making progress! Let's practice a bit more to reach the next level! 💪"}
        </p>

        {/* Rewards Box */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-3 flex items-center gap-3 shadow-inner">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            <span className="text-xl font-black text-amber-700">+{isImproved ? 100 : 25} XP</span>
          </div>
          {isImproved && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl px-6 py-3 flex items-center gap-3 shadow-inner">
              <span className="text-2xl">🪙</span>
              <span className="text-xl font-black text-yellow-700">+50 Coins</span>
            </div>
          )}
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 z-10">
        {renderSkillComparison('Reading', beforeScores.reading, afterScores.reading, '📖')}
        {renderSkillComparison('Writing', beforeScores.writing, afterScores.writing, '✍️')}
        {renderSkillComparison('Comprehension', beforeScores.comprehension, afterScores.comprehension, '🧠')}
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-6 z-10 w-full max-w-2xl px-4">
        <button 
          onClick={() => navigate('/learn-with-ai')}
          className="flex-1 bg-white border-4 border-slate-200 text-slate-700 font-black text-xl px-8 py-5 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
        >
          <Home className="w-6 h-6" /> Back to Dashboard
        </button>
        
        {isImproved ? (
          <button 
            onClick={() => navigate('/learn-with-ai')}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 border-b-8 border-indigo-800 text-white font-black text-xl px-8 py-5 rounded-2xl shadow-xl hover:-translate-y-1 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-center gap-3"
          >
            Continue Learning <ArrowRight className="w-6 h-6" />
          </button>
        ) : (
          <button 
            onClick={() => navigate(`/learn-with-ai/plan/${sessionId}`)}
            className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 border-b-8 border-amber-600 text-white font-black text-xl px-8 py-5 rounded-2xl shadow-xl hover:-translate-y-1 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-center gap-3"
          >
            Try Again <ArrowRight className="w-6 h-6" />
          </button>
        )}
      </div>

    </div>
  );
}
