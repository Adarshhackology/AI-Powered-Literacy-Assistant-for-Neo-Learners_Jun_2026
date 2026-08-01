import React from 'react';
import { Link } from 'react-router-dom';

export const RewardsWidget: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-black text-base">
          <span className="text-xl">🎁</span>
          <span>Rewards Store</span>
        </div>
        <Link to="/store" className="text-xs font-black text-indigo-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="flex items-center gap-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
        <div className="text-4xl animate-bounce-slow">🎁</div>
        <div className="space-y-1">
          <p className="text-xs font-extrabold text-amber-900">Earn XP and coins to unlock exciting rewards!</p>
          <div className="w-full bg-amber-200 h-3 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '40%' }} />
          </div>
          <span className="text-[10px] font-black text-amber-700">80 / 500 Coins</span>
        </div>
      </div>
    </div>
  );
};
