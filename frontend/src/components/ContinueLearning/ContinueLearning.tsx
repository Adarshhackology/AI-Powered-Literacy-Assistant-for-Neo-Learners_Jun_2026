import React from 'react';
import { useNavigate } from 'react-router-dom';
import { continueLessons } from '../../data/dashboardData';

export const ContinueLearning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Carousel (9 Cols) */}
      <div className="lg:col-span-9 bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-black text-base">
          <span className="text-xl">📖</span>
          <span>Continue Learning</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {continueLessons.map((item) => (
            <div key={item.id} className="bg-slate-50 border-2 border-slate-150 p-4 rounded-2xl space-y-3 hover-pop cursor-pointer" onClick={() => navigate(`/lesson/${item.id}`)}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{item.progress}%</span>
              </div>
              <div>
                <h5 className="font-black text-xs text-slate-800 leading-tight truncate">{item.title}</h5>
                <p className="text-[10px] font-bold text-slate-400">{item.subtitle}</p>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className={`bg-gradient-to-r ${item.color} h-full rounded-full`} style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dino Booster (3 Cols) */}
      <div className="lg:col-span-3 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[32px] p-6 text-white shadow-xl flex items-center justify-between border-b-6 border-indigo-950">
        <div className="space-y-1">
          <h4 className="font-black text-sm text-yellow-300">Keep Going! 💜</h4>
          <p className="text-xs font-bold text-purple-100">You're doing great!</p>
        </div>
        <div className="w-16 h-16 shrink-0">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=purple-dino" alt="Purple Dino" className="w-full h-full object-contain animate-bounce-slow" />
        </div>
      </div>

    </div>
  );
};
