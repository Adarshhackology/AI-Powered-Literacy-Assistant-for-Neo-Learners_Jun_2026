import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Crown, Flame, ArrowLeft, Star, Award, Zap } from 'lucide-react';
import { apiClient } from '../utils/api';

interface LeaderEntry {
  rank: number;
  username: string;
  name: string;
  xp: number;
  level: number;
  coins: number;
  avatar: string;
  badges: string[];
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getLeaderboard();
        if (data && data.leaderboard) {
          setLeaders(data.leaderboard);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const topThree = leaders.slice(0, 3);
  const remaining = leaders.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white font-nunito p-6 pt-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 text-white font-black hover:bg-white/20 transition-all mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-1.5 rounded-full font-black text-sm mb-3 border border-yellow-400/30">
            <Trophy className="w-4 h-4" /> Global Learner Leaderboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Top Literacy Champions 🏆
          </h1>
          <p className="text-lg text-purple-200 font-bold max-w-lg mx-auto">
            Earn XP by completing voice practice, reading lessons, and AI assessments to climb the weekly ranks!
          </p>
        </div>

        {/* Podium View (Top 3) */}
        {topThree.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 md:gap-8 items-end mb-12 max-w-2xl mx-auto pt-6">
            
            {/* Rank 2 - Silver */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-slate-300 to-slate-100 rounded-full p-1 shadow-lg flex items-center justify-center text-4xl">
                  {topThree[1].avatar}
                </div>
                <div className="absolute -top-3 bg-slate-200 text-slate-800 font-black text-xs px-3 py-1 rounded-full border border-white shadow-md flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5 text-slate-600" /> #2
                </div>
              </div>
              <div className="w-full bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-t-3xl p-4 text-center shadow-2xl h-40 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-white truncate">{topThree[1].name}</h3>
                  <div className="text-xs font-bold text-slate-400">Level {topThree[1].level}</div>
                </div>
                <div className="bg-slate-700/60 py-2 rounded-xl text-yellow-300 font-black text-lg">
                  {topThree[1].xp} XP
                </div>
              </div>
            </div>

            {/* Rank 1 - Gold (Center Highest) */}
            <div className="flex flex-col items-center transform -translate-y-4">
              <div className="relative mb-3 flex flex-col items-center">
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce absolute -top-9" />
                <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-amber-200 rounded-full p-1.5 shadow-2xl shadow-yellow-500/50 flex items-center justify-center text-5xl border-4 border-yellow-300">
                  {topThree[0].avatar}
                </div>
                <div className="absolute -top-3 bg-yellow-400 text-yellow-950 font-black text-sm px-3.5 py-1 rounded-full border-2 border-white shadow-lg flex items-center gap-1">
                  🥇 #1
                </div>
              </div>
              <div className="w-full bg-gradient-to-b from-amber-900/90 to-slate-800/90 backdrop-blur-md border-2 border-yellow-400/60 rounded-t-3xl p-5 text-center shadow-2xl h-52 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-xl text-yellow-300 truncate">{topThree[0].name}</h3>
                  <div className="text-sm font-bold text-amber-200">Level {topThree[0].level}</div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-400/40 py-2.5 rounded-xl text-yellow-300 font-black text-xl">
                  {topThree[0].xp} XP
                </div>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-700 to-amber-500 rounded-full p-1 shadow-lg flex items-center justify-center text-4xl">
                  {topThree[2].avatar}
                </div>
                <div className="absolute -top-3 bg-amber-600 text-white font-black text-xs px-3 py-1 rounded-full border border-white shadow-md flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5 text-amber-200" /> #3
                </div>
              </div>
              <div className="w-full bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-t-3xl p-4 text-center shadow-2xl h-36 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-white truncate">{topThree[2].name}</h3>
                  <div className="text-xs font-bold text-slate-400">Level {topThree[2].level}</div>
                </div>
                <div className="bg-slate-700/60 py-2 rounded-xl text-yellow-300 font-black text-lg">
                  {topThree[2].xp} XP
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Leaderboard Table (Remaining Ranks) */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/80 rounded-[2.5rem] p-6 shadow-2xl">
          <h2 className="text-2xl font-black text-white mb-6 pl-2 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" /> Rank Standings
          </h2>

          <div className="space-y-3">
            {leaders.map((entry) => (
              <div 
                key={entry.rank}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  entry.rank <= 3
                    ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/40'
                    : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-full font-black text-lg flex items-center justify-center ${
                    entry.rank === 1 ? 'bg-yellow-400 text-yellow-950' : entry.rank === 2 ? 'bg-slate-300 text-slate-900' : entry.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {entry.rank}
                  </span>

                  <span className="text-3xl">{entry.avatar}</span>

                  <div>
                    <h3 className="font-black text-lg text-white">{entry.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                      <span>Level {entry.level}</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">{entry.badges[0] || 'Learner'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-yellow-400">{entry.xp} XP</div>
                  <div className="text-xs font-bold text-slate-400">🪙 {entry.coins} Coins</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
