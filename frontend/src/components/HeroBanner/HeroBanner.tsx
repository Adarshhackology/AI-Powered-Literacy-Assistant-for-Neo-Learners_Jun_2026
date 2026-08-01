import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ProfileData } from '../../data/dashboardData';

interface HeroBannerProps {
  profile: ProfileData;
  lessons: any[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* Card 1: Welcome Card (Pink -> Purple Gradient) */}
      <div className="xl:col-span-7 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-[32px] p-6 md:p-7 text-white shadow-xl shadow-purple-200/50 relative overflow-hidden border-b-8 border-indigo-950 flex flex-col justify-between min-h-[230px]">
        {/* Rocket ship flying right background item */}
        <div className="absolute right-[5%] bottom-[10%] w-32 h-32 opacity-80 pointer-events-none select-none">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=rocket-space" alt="Rocket" className="w-full h-full object-contain animate-float" />
        </div>
        
        <div className="relative z-10 flex items-center gap-5">
          {/* Orange/Red Helmet Robot Mascot */}
          <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur border-4 border-white/40 shadow-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=helmet-orange-robot" alt="Robot Mascot" className="w-full h-full object-contain animate-bounce-slow" />
          </div>

          <div className="space-y-2">
            {/* Ribbon Tag */}
            <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider border border-yellow-300 shadow-sm font-poppins">
              <span>⭐ SUPER LEARNER MODE</span>
            </div>
            
            {/* Hindi Greeting */}
            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight font-poppins drop-shadow-sm">
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
            className="bg-yellow-400 hover:bg-yellow-300 active:translate-y-1 text-slate-950 font-black text-sm px-7 py-3.5 rounded-2xl shadow-xl border-b-4 border-yellow-600 flex items-center gap-2 transition-all cursor-pointer hover-pop font-poppins"
          >
            <span>Start Adventure 🎮</span>
          </button>
        </div>
      </div>

      {/* Card 2: AI Tutor Card (Deep Space Royal Blue -> Purple Gradient) */}
      <div className="xl:col-span-5 bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 rounded-[32px] p-6 md:p-7 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden border-b-8 border-purple-950 flex flex-col justify-between min-h-[230px]">
        
        {/* Floating AI Robot & Books */}
        <div className="absolute right-3 top-3 w-32 h-32 opacity-95 pointer-events-none select-none">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=white-ai-tutor" alt="AI Robot" className="w-full h-full object-contain animate-float" />
        </div>

        <div className="relative z-10 space-y-2 max-w-xs">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/80 border border-indigo-300/40 text-yellow-300 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
            <span>🤖 AI TUTOR</span>
          </div>
          <h3 className="text-xl md:text-2.5xl font-black tracking-tight font-poppins">
            Learn with AI Tutor 🤖
          </h3>
          <p className="text-xs font-bold text-indigo-100 leading-relaxed">
            Personalized lessons, instant help, and fun practice made just for you! ✨
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <button 
            onClick={() => navigate('/learn-with-ai')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-sm px-7 py-3.5 rounded-2xl shadow-xl border-b-4 border-indigo-950 flex items-center gap-2 transition-all cursor-pointer hover-pop font-poppins"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>Start AI Tutor 🚀</span>
          </button>
        </div>
      </div>

    </div>
  );
};
