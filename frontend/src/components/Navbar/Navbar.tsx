import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Flame, Coins, Bell } from 'lucide-react';
import { ProfileData } from '../../data/dashboardData';

interface NavbarProps {
  profile: ProfileData;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <header className="h-[90px] bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] px-6 flex items-center justify-between shadow-xl shadow-indigo-100 gap-4">
      
      {/* Search Bar with AI Voice Button */}
      <div className="flex items-center gap-2 bg-slate-100/80 border-2 border-slate-200/80 px-4 py-2.5 rounded-full max-w-md w-full focus-within:border-indigo-400 transition-all">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for lessons, games and more..." 
          className="bg-transparent text-sm font-bold w-full focus:outline-none placeholder:text-slate-400" 
        />
        <button 
          onClick={() => navigate('/voice-practice')}
          className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-90"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Stats & Profile Pills */}
      <div className="flex items-center gap-3">
        {/* Streak Pill */}
        <div className="flex items-center gap-2 bg-orange-50 border-2 border-orange-200 px-3.5 py-2 rounded-full shadow-sm text-orange-600 font-black text-xs hover-pop">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
          <span>{profile.streak} Day Streak</span>
        </div>

        {/* Coins Pill */}
        <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 px-3.5 py-2 rounded-full shadow-sm text-amber-600 font-black text-xs hover-pop">
          <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-baloo text-sm">{profile.coins} Coins</span>
        </div>

        {/* XP Pill */}
        <div className="flex items-center gap-2 bg-purple-50 border-2 border-purple-200 px-3.5 py-2 rounded-full shadow-sm text-purple-600 font-black text-xs hover-pop">
          <span className="text-base">💎</span>
          <span className="font-baloo text-sm">{profile.xp} XP</span>
        </div>

        {/* Notification Pill */}
        <button className="relative w-10 h-10 bg-slate-100 border-2 border-slate-200 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-all hover-pop">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        {/* Profile Avatar Pill */}
        <div className="flex items-center gap-2.5 bg-indigo-50 border-2 border-indigo-200 pl-1.5 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer hover-pop" onClick={() => navigate('/profile-setup')}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=poluytre" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="text-left leading-tight">
            <h4 className="font-black text-xs text-indigo-900 truncate max-w-[80px]">{profile.fullName}</h4>
            <p className="text-[10px] font-extrabold text-indigo-500 uppercase">Level {profile.level}</p>
          </div>
        </div>
      </div>

    </header>
  );
};
