import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ProfileData } from '../../data/dashboardData';

interface HeroBannerProps {
  profile: ProfileData;
  lessons: any[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile, lessons }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* Card 1: Welcome Card (Pink -> Purple Gradient) */}
      <div className="xl:col-span-7 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-[32px] p-6 text-white shadow-xl shadow-purple-200 relative overflow-hidden border-b-8 border-indigo-900 flex flex-col justify-between min-h-[220px]">
        <div className="absolute right-[-10%] bottom-[-20%] text-9xl opacity-15 pointer-events-none select-none">🚀</div>
        
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur border-4 border-white/40 shadow-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=helmet-robot" alt="Robot Mascot" className="w-full h-full object-contain animate-bounce-slow" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-900 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider border border-yellow-300">
              <span>⭐ SUPER LEARNER MODE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight font-poppins">
              आपका स्वागत है, {profile.fullName}!
            </h2>
            <p className="text-xs md:text-sm font-bold text-purple-100 max-w-md leading-relaxed">
              Let's play and learn! Unlock new stages, earn rewards and become a superstar! 🌟
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-4 flex justify-start pl-32">
          <button 
            onClick={() => navigate('/lesson/1')}
            className="bg-yellow-400 hover:bg-yellow-300 active:translate-y-1 text-slate-900 font-black text-sm px-6 py-3 rounded-2xl shadow-lg border-b-4 border-yellow-600 flex items-center gap-2 transition-all cursor-pointer hover-pop"
          >
            <span>Start Adventure 🎮</span>
          </button>
        </div>
      </div>

      {/* Card 2: AI Tutor Card (Blue -> Purple Gradient) */}
      <div className="xl:col-span-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden border-b-8 border-purple-950 flex flex-col justify-between min-h-[220px]">
        <div className="absolute right-2 top-2 w-28 h-28 opacity-90 pointer-events-none select-none">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=ai-tutor-bot" alt="AI Bot" className="w-full h-full object-contain animate-float" />
        </div>

        <div className="relative z-10 space-y-2 max-w-xs">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/80 border border-indigo-300/40 text-yellow-300 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            <span>🤖 AI TUTOR</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight font-poppins">
            Learn with AI Tutor 🤖
          </h3>
          <p className="text-xs font-bold text-indigo-100 leading-relaxed">
            Personalized lessons, instant help, and fun practice made just for you! ✨
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <button 
            onClick={() => navigate('/learn-with-ai')}
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-lg border-b-4 border-indigo-900 flex items-center gap-2 transition-all cursor-pointer hover-pop"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>Start AI Tutor 🚀</span>
          </button>
        </div>
      </div>

    </div>
  );
};
