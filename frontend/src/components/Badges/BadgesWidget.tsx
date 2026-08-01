import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { badgesList } from '../../data/dashboardData';

export const BadgesWidget: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-black text-base">
          <Shield className="w-5 h-5 text-indigo-600" />
          <span>My Badges</span>
        </div>
        <Link to="/reports" className="text-xs font-black text-indigo-600 hover:underline">
          View All
        </Link>
      </div>

      {/* 3D Trading Cards Badges */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
        {badgesList.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 hover-pop cursor-pointer">
            <div className={`w-14 h-16 rounded-2xl bg-gradient-to-b ${b.bg} border-2 border-white shadow-md flex items-center justify-center text-2xl`}>
              {b.icon}
            </div>
            <span className="text-[10px] font-black text-slate-700 truncate max-w-[65px] text-center">{b.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
