import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ProgressCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Card 1: Reading */}
      <div className="bg-white/90 backdrop-blur border-4 border-indigo-100 p-4.5 rounded-[28px] shadow-lg shadow-indigo-100/40 flex items-center justify-between hover-pop">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-indigo-200">
            📖
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-poppins">Reading</div>
            <div className="text-2xl font-black text-indigo-950 font-baloo leading-none my-0.5">78%</div>
            <p className="text-[10px] font-bold text-indigo-600">Great! Keep it up! 🔥</p>
          </div>
        </div>
        <button onClick={() => navigate('/learn-with-ai')} className="w-9 h-9 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center cursor-pointer shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card 2: Writing */}
      <div className="bg-white/90 backdrop-blur border-4 border-pink-100 p-4.5 rounded-[28px] shadow-lg shadow-pink-100/40 flex items-center justify-between hover-pop">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-100 text-pink-700 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-pink-200">
            ✏️
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-poppins">Writing</div>
            <div className="text-2xl font-black text-pink-950 font-baloo leading-none my-0.5">45%</div>
            <p className="text-[10px] font-bold text-pink-600">Keep practicing! 💪</p>
          </div>
        </div>
        <button onClick={() => navigate('/learn-with-ai')} className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center cursor-pointer shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card 3: Speaking */}
      <div className="bg-white/90 backdrop-blur border-4 border-sky-100 p-4.5 rounded-[28px] shadow-lg shadow-sky-100/40 flex items-center justify-between hover-pop">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-100 to-blue-100 text-sky-700 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-sky-200">
            🎙️
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-poppins">Speaking</div>
            <div className="text-2xl font-black text-sky-950 font-baloo leading-none my-0.5">67%</div>
            <p className="text-[10px] font-bold text-sky-600">Good progress! 🌈</p>
          </div>
        </div>
        <button onClick={() => navigate('/voice-practice')} className="w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 flex items-center justify-center cursor-pointer shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card 4: Sticker Book */}
      <div className="bg-white/90 backdrop-blur border-4 border-emerald-100 p-4.5 rounded-[28px] shadow-lg shadow-emerald-100/40 flex items-center justify-between hover-pop cursor-pointer" onClick={() => navigate('/vocabulary')}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center text-2xl shrink-0 shadow-sm border border-emerald-200">
            🌸
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-poppins">Sticker Power</div>
            <div className="text-xl font-black text-emerald-950 font-poppins leading-none my-0.5">Explore</div>
            <p className="text-[10px] font-bold text-emerald-600">Collect & unlock stickers</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
