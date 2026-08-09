import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, CoinSVG, TreasureChest } from '../components/UI/Illustrations';

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
      setCoins(prev => prev - item.cost);
      setClaimedRewards(prev => [...prev, item.id]);
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
    }}>

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 12 }, { t: '12%', l: '90%', s: 16 },
          { t: '25%', l: '3%', s: 14 }, { t: '45%', l: '95%', s: 10 },
          { t: '70%', l: '4%', s: 18 }, { t: '88%', l: '92%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Top Glass Nav Bar */}
        <nav style={{
          height: '64px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid rgba(255,255,255,0.6)',
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-3d"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#1e1040', textDecoration: 'none',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
              background: '#F0F4FF', padding: '8px 16px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🎁</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              Virtual Rewards Store
            </span>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #FFFDE7, #FFF9C4)',
            border: '1.5px solid #FFD54A', borderRadius: '99px',
            padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 4px 14px rgba(255,213,74,0.3)',
          }}>
            <CoinSVG size={22} />
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>
              {coins}
            </span>
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#B45309' }}>
              Coins
            </span>
          </div>
        </nav>

        {/* Banner Header */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FFD54A 0%, #FF9F43 50%, #FF4FA3 100%)',
          padding: '24px 32px',
          color: '#1e1040',
          textAlign: 'center',
          boxShadow: '0 16px 48px rgba(255,159,67,0.35)',
          border: '2px solid rgba(255,255,255,0.4)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.85)', padding: '4px 14px', borderRadius: '99px',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#1e1040',
          }}>
            🎁 Virtual Rewards Store
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#1e1040', margin: 0, lineHeight: 1.2 }}>
            Unlock Super Power-Ups & Avatars! 🎁
          </h1>
          <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '14px', color: 'rgba(30,16,64,0.85)', margin: 0 }}>
            Spend your hard-earned coins to customize your profile, protect your streak, and unlock special badges!
          </p>
        </div>

        {/* 3-Column Store Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {storeItems.map((item) => {
            const isOwned = claimedRewards.includes(item.id);
            return (
              <div
                key={item.id}
                className="hover-lift"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '24px',
                  border: isOwned ? '2.5px solid #22C55E' : '1.5px solid rgba(255,255,255,0.6)',
                  boxShadow: isOwned ? '0 12px 30px rgba(34,197,94,0.2)' : '0 12px 30px rgba(0,0,0,0.1)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="animate-bobble" style={{
                      width: '64px', height: '64px', borderRadius: '18px',
                      background: 'linear-gradient(135deg, #EDE7F6, #FFF0F9)',
                      border: '2px solid #E8EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '36px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    }}>
                      {item.icon}
                    </div>

                    <span style={{
                      background: '#EDE7F6', color: '#6C4CFF',
                      fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: '99px', border: '1px solid #C4B5F4',
                    }}>
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: '0 0 4px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #F1F5F9', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CoinSVG size={20} />
                    <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
                      {item.cost}
                    </span>
                  </div>

                  {isOwned ? (
                    <span style={{
                      background: '#DCFCE7', color: '#166534',
                      fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                      padding: '8px 16px', borderRadius: '14px', border: '1px solid #86EFAC',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      <Check className="w-4 h-4" /> Owned
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={purchasing === item.id}
                      className="btn-3d"
                      style={{
                        background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                        color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                        padding: '10px 20px', borderRadius: '14px', border: 'none',
                        borderBottom: '3.5px solid #4D2FCC', cursor: 'pointer',
                        boxShadow: '0 6px 18px rgba(108,76,255,0.4)',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Unlock</span>
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
