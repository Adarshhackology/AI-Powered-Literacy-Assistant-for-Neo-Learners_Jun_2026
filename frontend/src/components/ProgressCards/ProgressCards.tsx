import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ProgressCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Card 1: Reading */}
      <div className="bg-white/90 backdrop-blur border-4 border-indigo-100 p-4.5 rounded-[28px] shadow-lg shadow-indigo-100/50 flex items-center justify-between hover-pop">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl shrink-0">
            📖
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reading</div>
            <div className="text-2xl font-black text-indigo-900 font-baloo">78%</div>
            <p className="text-[10px] font-bold text-indigo-600">Great! Keep it up! 🔥</p>
          </div>
        </div>
        <button onClick={() => navigate('/learn-with-ai')} className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card 2: Writing */}
      <div className="bg-white/90 backdrop-blur border-4 border-pink-100 p-4.5 rounded-[28px] shadow-lg shadow-pink-100/50 flex items-center justify-between hover-pop">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl shrink-0">
            ✏️
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Writing</div>
            <div className="text-2xl font-black text-pink-900 font-baloo">45%</div>
            <p className="text-[10px] font-bold text-pink-600">Keep practicing! 💪</p>
          </div>
        </div>
        <button onClick={() => navigate('/learn-with-ai')} className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card 3: Speaking */}
      <div className="bg-white/90 backdrop-blur border-4 border-sky-100 p-4.5 rounded-[28px] shadow-lg shadow-sky-100/50 flex items-center justify-between hover-pop">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl shrink-0">
            🎙️
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Speaking</div>
            <div className="text-2xl font-black text-sky-900 font-baloo">67%</div>
            <p className="text-[10px] font-bold text-sky-600">Good progress! 🌈</p>
          </div>
        </div>
        <button onClick={() => navigate('/voice-practice')} className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center cursor-pointer">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card 4: Sticker Book */}
      <div className="bg-white/90 backdrop-blur border-4 border-emerald-100 p-4.5 rounded-[28px] shadow-lg shadow-emerald-100/50 flex items-center justify-between hover-pop cursor-pointer" onClick={() => navigate('/vocabulary')}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
            🌸
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sticker Power</div>
            <div className="text-xl font-black text-emerald-900 font-poppins">Explore</div>
            <p className="text-[10px] font-bold text-emerald-600">Collect & unlock stickers</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
