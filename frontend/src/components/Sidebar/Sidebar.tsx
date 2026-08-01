import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-full lg:w-[280px] bg-white/90 backdrop-blur-xl border-4 border-white shadow-2xl shadow-indigo-100/60 rounded-[32px] p-5 flex flex-col justify-between shrink-0 space-y-6">
      
      <div className="space-y-6">
        {/* Animated Star Mascot Logo */}
        <div className="flex items-center gap-3 px-2 cursor-pointer hover-pop" onClick={() => navigate('/')}>
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-400 flex items-center justify-center text-4xl shadow-lg border-2 border-yellow-200 animate-bounce-slow">
            ⭐
          </div>
          <div className="leading-tight">
            <h1 className="text-2xl font-black text-indigo-900 tracking-tight font-poppins drop-shadow-sm">NeoLit</h1>
            <span className="text-sm font-black text-amber-500 tracking-wider uppercase font-poppins">Game</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {/* Active Dashboard Button */}
          <Link 
            to="/dashboard" 
            className="flex items-center justify-between bg-gradient-to-r from-[#6C4DFF] to-[#8B5CFF] text-white font-black px-4.5 py-3.5 rounded-2xl text-sm shadow-xl shadow-purple-200 transition-all hover-pop border-b-4 border-indigo-900"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🏠</span>
              <span className="font-poppins tracking-wide">Dashboard</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </Link>

          <Link 
            to="/learn-with-ai" 
            className="flex items-center justify-between bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🧠</span>
              <span>Learn with AI</span>
            </div>
            <span className="bg-pink-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">NEW</span>
          </Link>

          <Link 
            to="/learn-with-ai" 
            className="flex items-center justify-between bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <span>आज के लक्ष्य</span>
            </div>
          </Link>

          <Link 
            to="/vocabulary" 
            className="flex items-center justify-between bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎨</span>
              <span>Sticker Book</span>
            </div>
          </Link>

          <Link 
            to="/reports" 
            className="flex items-center justify-between bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span>My Progress</span>
            </div>
          </Link>

          <Link 
            to="/store" 
            className="flex items-center justify-between bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎁</span>
              <span>Rewards Store</span>
            </div>
          </Link>

          <Link 
            to="/leaderboard" 
            className="flex items-center justify-between bg-white hover:bg-yellow-50 text-slate-700 hover:text-yellow-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <span>Leaderboard</span>
            </div>
          </Link>

          <Link 
            to="/reports" 
            className="flex items-center justify-between bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🛡️</span>
              <span>My Badges</span>
            </div>
          </Link>

          <Link 
            to="/admin" 
            className="flex items-center justify-between bg-white hover:bg-slate-100 text-slate-700 font-extrabold px-4.5 py-3 rounded-2xl text-sm border-2 border-slate-100 transition-all hover-pop shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⚙️</span>
              <span>Admin Desk</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Bottom Sidebar Waving Green Dino & Daily Tip */}
      <div className="space-y-4 pt-4 border-t-2 border-slate-100">
        
        {/* Waving Green Dino with Purple Backpack */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-4 text-white flex items-center justify-between shadow-xl overflow-hidden border-2 border-purple-300">
          <div className="flex items-center gap-3 z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur p-1 overflow-hidden shrink-0 flex items-center justify-center">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=green-dino-backpack" alt="Green Dino" className="w-full h-full object-contain animate-bounce-slow" />
            </div>
            <div>
              <div className="bg-white text-indigo-950 font-black text-[11px] px-3 py-1 rounded-full inline-block shadow-md border border-indigo-200">
                You Are Amazing!
              </div>
            </div>
          </div>
        </div>

        {/* Daily Tip Card */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 rounded-3xl space-y-1 shadow-md border border-purple-400/40">
          <h5 className="font-black text-xs text-yellow-300 flex items-center gap-1.5 font-poppins">
            <span>💡</span> Daily Tip
          </h5>
          <p className="text-xs font-bold text-purple-100 leading-snug">
            Small steps today, big dreams tomorrow! 🌟
          </p>
        </div>

      </div>

    </aside>
  );
};
