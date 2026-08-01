import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface AdventureMapProps {
  activeLevel: string;
  setActiveLevel: (lvl: string) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ activeLevel, setActiveLevel }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          <h3 className="text-xl font-black text-slate-800 font-poppins">Learning Adventure Map</h3>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full text-xs font-black">
          <button 
            onClick={() => setActiveLevel('Beginner')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeLevel === 'Beginner' ? 'bg-[#6C4DFF] text-white shadow-md' : 'text-slate-600'}`}
          >
            🔮 Beginner
          </button>
          <button disabled className="px-4 py-1.5 rounded-full text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Intermediate
          </button>
          <button disabled className="px-4 py-1.5 rounded-full text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Advanced
          </button>
        </div>
      </div>

      {/* Fantasy Island Map Visual Card */}
      <div className="relative bg-gradient-to-b from-sky-200 via-emerald-100 to-indigo-100 rounded-[32px] p-8 min-h-[380px] flex flex-col justify-between overflow-hidden border-4 border-sky-300 shadow-inner">
        {/* Visual decorations */}
        <div className="absolute top-4 left-6 text-4xl opacity-40 animate-float">🏰</div>
        <div className="absolute top-8 right-12 text-4xl opacity-40 animate-float" style={{ animationDelay: '1s' }}>🎈</div>
        <div className="absolute bottom-6 left-12 text-4xl opacity-30">🌈</div>

        {/* Curved Stage Nodes */}
        <div className="relative z-10 flex flex-wrap justify-between items-center gap-6 my-auto">
          
          {/* Stage 1 */}
          <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/lesson/1')}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 border-4 border-white shadow-xl flex items-center justify-center text-3xl text-white font-black animate-glow">
              📖
            </div>
            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-md border border-emerald-200">
              <div className="text-xs font-black text-slate-800">Stage 1</div>
              <div className="text-[10px] font-bold text-slate-500">Start Your Journey</div>
              <div className="text-xs">⭐⭐⭐</div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/learn-with-ai')}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 border-4 border-white shadow-xl flex items-center justify-center text-2xl text-white font-black">
              ⭐
            </div>
            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-md border border-purple-200">
              <div className="text-xs font-black text-purple-900">Daily Challenge</div>
              <div className="text-[10px] font-bold text-purple-600">Unlocked</div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/lesson/2')}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-sky-500 border-4 border-white shadow-xl flex items-center justify-center text-3xl text-white font-black">
              🚀
            </div>
            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-md border border-blue-200">
              <div className="text-xs font-black text-slate-800">Stage 2</div>
              <div className="text-[10px] font-bold text-slate-500">Keep Going!</div>
              <div className="text-xs">⭐⭐</div>
            </div>
          </div>

          {/* Stage 3 (Locked) */}
          <div className="flex flex-col items-center gap-2 opacity-70">
            <div className="w-16 h-16 rounded-full bg-slate-400 border-4 border-white shadow-md flex items-center justify-center text-2xl text-white font-black">
              🔒
            </div>
            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-center shadow-sm border border-slate-200">
              <div className="text-xs font-black text-slate-600">Stage 3</div>
              <div className="text-[10px] font-bold text-slate-400">Coming Soon</div>
            </div>
          </div>

          {/* Grand Mission Chest */}
          <div className="flex flex-col items-center gap-2 hover-pop cursor-pointer" onClick={() => navigate('/store')}>
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 border-4 border-white shadow-2xl flex items-center justify-center text-5xl animate-bounce-slow">
              🎁
            </div>
            <div className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-center shadow-md font-black text-xs border border-amber-300">
              Grand Mission
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
