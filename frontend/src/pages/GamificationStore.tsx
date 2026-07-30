import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Coins, Sparkles, Award, Shield, Check, Flame, ArrowLeft } from 'lucide-react';
import { apiClient } from '../utils/api';

export default function GamificationStore() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'learner';

  const [coins, setCoins] = useState(120);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    const loadGamification = async () => {
      const data = await apiClient.getGamification(username);
      if (data) {
        setCoins(data.coins ?? 120);
        setClaimedRewards(data.claimed_rewards || []);
      }
    };
    loadGamification();
  }, [username]);

  const storeItems = [
    { id: 'avatar_lion', title: 'Royal Lion Avatar', category: 'Avatar', cost: 30, icon: '🦁', desc: 'Unlock the majestic Royal Lion profile avatar!' },
    { id: 'avatar_unicorn', title: 'Starlight Unicorn Avatar', category: 'Avatar', cost: 40, icon: '🦄', desc: 'Shine bright with a magical unicorn avatar frame.' },
    { id: 'avatar_rocket', title: 'Cosmic Rocket Avatar', category: 'Avatar', cost: 50, icon: '🚀', desc: 'Blast off to learning excellence with a rocket icon.' },
    { id: 'streak_shield', title: 'Streak Repair Shield', category: 'Powerup', cost: 25, icon: '🛡️', desc: 'Protect your daily learning streak if you miss 1 day.' },
    { id: 'badge_star', title: 'Star Orator Badge', category: 'Badge', cost: 35, icon: '⭐', desc: 'Show off a shiny Star Orator badge on your profile.' },
    { id: 'mascot_robot', title: 'AI Robot Companion', category: 'Companion', cost: 60, icon: '🤖', desc: 'Unlock a playful robot companion to guide your lessons.' }
  ];

  const handleBuy = async (item: typeof storeItems[0]) => {
    if (coins < item.cost) {
      alert('Not enough coins! Complete lessons to earn more coins. 🪙');
      return;
    }
    setPurchasing(item.id);
    try {
      const res = await apiClient.claimReward(username, item.id, item.cost);
      if (res && res.current_coins !== undefined) {
        setCoins(res.current_coins);
        setClaimedRewards(res.claimed_rewards || [...claimedRewards, item.id]);
      } else {
        setCoins(prev => prev - item.cost);
        setClaimedRewards(prev => [...prev, item.id]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-indigo-100 p-6 font-nunito pt-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-sm border-2 border-slate-200 text-slate-700 font-black hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </button>

          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border-2 border-amber-300 flex items-center gap-3">
            <Coins className="w-8 h-8 text-amber-500 animate-bounce" />
            <span className="text-3xl font-black text-amber-600">{coins}</span>
            <span className="text-sm font-bold text-amber-800 uppercase tracking-wider">Coins Available</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full font-black text-sm mb-3">
            <ShoppingBag className="w-4 h-4" /> Virtual Rewards Store
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">
            Unlock Super Power-Ups & Avatars! 🎁
          </h1>
          <p className="text-lg text-slate-600 font-bold max-w-xl mx-auto">
            Spend your hard-earned coins to customize your profile, protect your streak, and unlock special badges!
          </p>
        </div>

        {/* Grid of Store Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {storeItems.map((item) => {
            const isOwned = claimedRewards.includes(item.id);
            return (
              <div 
                key={item.id}
                className={`relative bg-white/90 backdrop-blur-sm rounded-[2rem] p-6 border-4 shadow-xl transition-all duration-300 hover:scale-[1.03] flex flex-col justify-between ${
                  isOwned ? 'border-emerald-400 bg-emerald-50/20' : 'border-indigo-100 hover:border-indigo-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-6xl animate-bounce-slow">{item.icon}</span>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-black px-3 py-1 rounded-full border border-indigo-100 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 font-bold text-sm mb-6 leading-relaxed">{item.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-amber-600 font-black text-xl">
                    <Coins className="w-6 h-6" /> {item.cost}
                  </div>

                  {isOwned ? (
                    <span className="bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1">
                      <Check className="w-5 h-5" /> Owned
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleBuy(item)}
                      disabled={purchasing === item.id}
                      className="bg-indigo-600 hover:bg-indigo-700 active:translate-y-1 text-white font-black px-6 py-2.5 rounded-xl shadow-md border-b-4 border-indigo-800 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" /> Unlock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
