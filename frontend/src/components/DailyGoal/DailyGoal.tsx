import React from 'react';
import { Flame, Check } from 'lucide-react';

export const DailyGoal: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-black text-base">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span>Daily Goal</span>
        </div>
        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          5 / 7 Days
        </span>
      </div>

      <p className="text-xs font-bold text-slate-500">Study 6 Days</p>

      {/* Weekday checkmark pills */}
      <div className="grid grid-cols-7 gap-1.5 pt-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
          <div key={day} className="text-center space-y-1">
            <div className={`h-9 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
              idx < 5 
                ? 'bg-gradient-to-b from-[#6C4DFF] to-[#8B5CFF] text-white shadow-md' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}>
              {idx < 5 ? <Check className="w-4 h-4" /> : ''}
            </div>
            <span className="text-[10px] font-extrabold text-slate-400">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
