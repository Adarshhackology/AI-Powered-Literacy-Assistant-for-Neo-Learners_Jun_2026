import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Zap } from 'lucide-react';
import { apiClient } from '../utils/api';
import { championsList } from '../data/dashboardData';
import { Sparkle, TrophySVG } from '../components/UI/Illustrations';

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
        const data = await apiClient.getGamificationLeaderboard();
        if (data && data.leaderboard && data.leaderboard.length > 0) {
          setLeaders(data.leaderboard);
        } else {
          // Fallback to championsList
          setLeaders(championsList.map(c => ({
            rank: c.rank,
            username: c.name.toLowerCase(),
            name: c.name,
            xp: c.xp,
            level: c.level,
            coins: 120,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${c.name}`,
            badges: ['🏆']
          })));
        }
      } catch (e) {
        console.error(e);
        setLeaders(championsList.map(c => ({
          rank: c.rank,
          username: c.name.toLowerCase(),
          name: c.name,
          xp: c.xp,
          level: c.level,
          coins: 120,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${c.name}`,
          badges: ['🏆']
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const topThree = leaders.slice(0, 3);
  const remaining = leaders.slice(3);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.3) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      padding: '20px',
      position: 'relative',
    }}>

      {/* Background Stars */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '8%', l: '6%', s: 14 }, { t: '15%', l: '92%', s: 18 },
          { t: '40%', l: '5%', s: 12 }, { t: '65%', l: '94%', s: 16 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Top Nav Bar */}
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
            <span>Back to Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrophySVG size={28} />
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              Champions Leaderboard
            </span>
          </div>
        </nav>

        {/* Title Header Card */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 50%, #FF4FA3 100%)',
          padding: '24px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 16px 48px rgba(108,76,255,0.35)',
          border: '2px solid rgba(255,255,255,0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#FFD54A', color: '#1e1040',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
            padding: '4px 14px', borderRadius: '99px',
            boxShadow: '0 4px 12px rgba(255,213,74,0.4)',
          }}>
            <Trophy className="w-3.5 h-3.5" /> GLOBAL LEARNER LEADERBOARD
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: 'white', margin: 0, lineHeight: 1.2 }}>
            Top Literacy Champions 🏆
          </h1>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.9)', margin: 0, maxWidth: '600px' }}>
            Earn XP by completing voice practice, reading lessons, and AI assessments to climb the weekly ranks!
          </p>
        </div>

        {/* Podium View (Top 3) */}
        {topThree.length >= 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'flex-end', margin: '10px 0' }}>
            
            {/* Rank 2 - Silver */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #E2E8F0, #94A3B8)',
                border: '3px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', marginBottom: '8px',
              }}>
                <img src={topThree[1].avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${topThree[1].name}`} alt="rank2" style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                borderRadius: '20px 20px 0 0', padding: '16px', width: '100%',
                textAlign: 'center', border: '1.5px solid #E8EFFF', borderBottom: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              }}>
                <span style={{ background: '#CBD5E1', color: '#1E293B', fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '99px' }}>
                  🥈 #2
                </span>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: '6px 0 2px' }}>{topThree[1].name}</h3>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>Level {topThree[1].level}</div>
                <div style={{ background: '#F1F5F9', color: '#475569', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '6px', borderRadius: '10px' }}>
                  {topThree[1].xp} XP
                </div>
              </div>
            </div>

            {/* Rank 1 - Gold */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="animate-bounce" style={{ fontSize: '24px', marginBottom: '-6px', zIndex: 2 }}>👑</div>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                border: '4px solid white', boxShadow: '0 12px 30px rgba(255,213,74,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', marginBottom: '8px', zIndex: 1,
              }}>
                <img src={topThree[0].avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${topThree[0].name}`} alt="rank1" style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{
                background: 'linear-gradient(180deg, #FFFDF0 0%, #FFFFFF 100%)',
                borderRadius: '24px 24px 0 0', padding: '20px 16px', width: '100%',
                textAlign: 'center', border: '2px solid #FFE082', borderBottom: 'none',
                boxShadow: '0 12px 40px rgba(255,213,74,0.3)',
              }}>
                <span style={{ background: '#FFD54A', color: '#78350F', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', padding: '3px 10px', borderRadius: '99px' }}>
                  🥇 #1 CHAMPION
                </span>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: '8px 0 2px' }}>{topThree[0].name}</h3>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#B45309', marginBottom: '10px' }}>Level {topThree[0].level}</div>
                <div style={{ background: 'linear-gradient(135deg, #FFD54A, #FF9F43)', color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(255,213,74,0.4)' }}>
                  {topThree[0].xp} XP
                </div>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #D97706, #B45309)',
                border: '3px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', marginBottom: '8px',
              }}>
                <img src={topThree[2].avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${topThree[2].name}`} alt="rank3" style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                borderRadius: '20px 20px 0 0', padding: '16px', width: '100%',
                textAlign: 'center', border: '1.5px solid #E8EFFF', borderBottom: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              }}>
                <span style={{ background: '#FED7AA', color: '#7C2D12', fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '99px' }}>
                  🥉 #3
                </span>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: '6px 0 2px' }}>{topThree[2].name}</h3>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>Level {topThree[2].level}</div>
                <div style={{ background: '#F1F5F9', color: '#475569', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '6px', borderRadius: '10px' }}>
                  {topThree[2].xp} XP
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Full Ranks List Table Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px',
          border: '1.5px solid #E8EFFF',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #F1F5F9', paddingBottom: '12px' }}>
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: 0 }}>
              Rank Standings
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaders.map((entry) => (
              <div 
                key={entry.rank}
                className="hover-lift"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: '16px',
                  background: entry.rank <= 3 ? '#FFFDF0' : '#F8FAFF',
                  border: entry.rank <= 3 ? '1.5px solid #FFE082' : '1.5px solid #E8EFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: entry.rank === 1 ? '#FFD54A' : entry.rank === 2 ? '#CBD5E1' : entry.rank === 3 ? '#FED7AA' : '#6C4CFF',
                    color: entry.rank <= 3 ? '#1e1040' : 'white',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {entry.rank}
                  </div>

                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: '#E2E8F0', flexShrink: 0 }}>
                    <img src={entry.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${entry.name}`} alt={entry.name} style={{ width: '100%', height: '100%' }} />
                  </div>

                  <div>
                    <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040', margin: 0 }}>{entry.name}</h4>
                    <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Level {entry.level}</span>
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #EDE7F6, #D8D0F0)',
                  color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                  padding: '6px 14px', borderRadius: '99px',
                }}>
                  {entry.xp} XP
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
