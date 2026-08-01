import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Champion } from '../../data/dashboardData';

interface LeaderboardWidgetProps {
  champions: Champion[];
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ champions }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900 font-black text-base font-poppins">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Champions League</span>
        </div>
        <Link to="/leaderboard" className="text-xs font-black text-[#6C4DFF] hover:underline font-poppins">
          View All
        </Link>
      </div>

      <div className="space-y-2.5">
        {champions.slice(0, 5).map((c) => (
          <div key={c.rank} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-150 hover:bg-slate-100 transition-all">
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center font-poppins ${
                c.rank === 1 ? 'bg-amber-400 text-slate-950' : c.rank === 2 ? 'bg-slate-300 text-slate-900' : c.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {c.rank}
              </span>
              <span className="text-xl">{c.avatar}</span>
              <div>
                <h5 className="font-black text-xs text-slate-900 font-poppins">{c.name}</h5>
                <p className="text-[10px] font-bold text-slate-400">Level {c.level} • {c.xp} XP</p>
              </div>
            </div>
            <span className="font-baloo text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              {c.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
