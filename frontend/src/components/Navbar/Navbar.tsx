import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flame, Coins, Bell } from 'lucide-react';
import { ProfileData } from '../../data/dashboardData';

interface NavbarProps {
  profile: ProfileData;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <header className="h-[90px] bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] px-6 flex items-center justify-between shadow-xl shadow-indigo-100/60 gap-4">
      
      {/* Huge Rounded Search Bar */}
      <div className="flex items-center gap-3 bg-slate-100/90 border-2 border-slate-200/80 px-5 py-3 rounded-full max-w-lg w-full focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-inner">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for lessons, games and more..." 
          className="bg-transparent text-sm font-bold w-full focus:outline-none placeholder:text-slate-400 font-nunito" 
        />
        <button 
          onClick={() => navigate('/voice-practice')}
          className="w-9 h-9 rounded-full bg-[#8B5CFF] hover:bg-[#6C4DFF] text-white flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Stats & Avatar Pills */}
      <div className="flex items-center gap-3">
        
        {/* Streak Pill */}
        <div className="flex items-center gap-2 bg-orange-50 border-2 border-orange-200 px-4 py-2 rounded-full shadow-sm text-orange-600 font-black text-xs hover-pop">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
          <span className="font-poppins">{profile.streak} Day Streak</span>
        </div>

        {/* Coins Pill */}
        <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 px-4 py-2 rounded-full shadow-sm text-amber-600 font-black text-xs hover-pop">
          <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-baloo text-sm">{profile.coins} Coins</span>
        </div>

        {/* XP Pill */}
        <div className="flex items-center gap-2 bg-purple-50 border-2 border-purple-200 px-4 py-2 rounded-full shadow-sm text-purple-700 font-black text-xs hover-pop">
          <span className="text-base">💎</span>
          <span className="font-baloo text-sm">{profile.xp} XP</span>
        </div>

        {/* Notification Bell Pill */}
        <button className="relative w-11 h-11 bg-slate-100/90 border-2 border-slate-200 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-all hover-pop cursor-pointer">
          <Bell className="w-5 h-5 text-indigo-900" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow-md">
            3
          </span>
        </button>

        {/* Avatar Profile Pill */}
        <div 
          className="flex items-center gap-3 bg-indigo-50 border-2 border-indigo-200/90 pl-1.5 pr-5 py-1.5 rounded-full shadow-sm cursor-pointer hover-pop"
          onClick={() => navigate('/profile-setup')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-md overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=poluytre" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="text-left leading-tight">
            <h4 className="font-black text-xs text-indigo-950 font-poppins truncate max-w-[90px]">{profile.fullName}</h4>
            <p className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-wide">Level {profile.level}</p>
          </div>
        </div>

      </div>

    </header>
  );
};
