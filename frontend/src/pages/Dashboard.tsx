import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Navbar } from '../components/Navbar/Navbar';
import { HeroBanner } from '../components/HeroBanner/HeroBanner';
import { ProgressCards } from '../components/ProgressCards/ProgressCards';
import { AdventureMap } from '../components/AdventureMap/AdventureMap';
import { DailyGoal } from '../components/DailyGoal/DailyGoal';
import { LeaderboardWidget } from '../components/Leaderboard/LeaderboardWidget';
import { BadgesWidget } from '../components/Badges/BadgesWidget';
import { RewardsWidget } from '../components/Rewards/RewardsWidget';
import { ContinueLearning } from '../components/ContinueLearning/ContinueLearning';
import { defaultProfile, championsList, ProfileData } from '../data/dashboardData';
import { Cloud, Sparkle } from '../components/UI/Illustrations';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  const [activeLevel, setActiveLevel] = useState('Beginner');
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [lessons, setLessons] = useState<any[]>([]);
  const [champions, setChampions] = useState<any[]>(championsList);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) { navigate('/login'); return; }
    const fetchData = async () => {
      try {
        const prof = await apiClient.getProfile(username);
        if (prof) setProfile({ ...defaultProfile, ...prof, fullName: (prof.fullName || username).toUpperCase() });
        const less = await apiClient.getLessons();
        setLessons(less || []);
        const lb = await apiClient.getGamificationLeaderboard();
        if (lb?.leaderboard) setChampions(lb.leaderboard);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, [username, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #F0F4FF 0%, #EEF2FF 30%, #F6F0FF 60%, #FFF0F9 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── ANIMATED BACKGROUND ELEMENTS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Floating clouds */}
        <div className="animate-cloud-drift" style={{ position: 'absolute', top: '5%', left: '8%', opacity: 0.6 }}>
          <Cloud size={100} color="#E8F0FF" />
        </div>
        <div className="animate-cloud-drift" style={{ position: 'absolute', top: '8%', right: '12%', opacity: 0.5, animationDelay: '2s' }}>
          <Cloud size={130} color="#F0EAFF" />
        </div>
        <div className="animate-cloud-drift" style={{ position: 'absolute', top: '25%', right: '5%', opacity: 0.35, animationDelay: '4s' }}>
          <Cloud size={80} color="#E8F4FF" />
        </div>

        {/* Floating sparkles */}
        {[
          { t: '10%', l: '5%', delay: '0s', size: 20 },
          { t: '20%', l: '92%', delay: '0.8s', size: 16 },
          { t: '50%', l: '2%', delay: '1.6s', size: 18 },
          { t: '70%', l: '96%', delay: '2.4s', size: 14 },
          { t: '85%', l: '8%', delay: '3.2s', size: 22 },
          { t: '40%', l: '94%', delay: '1.2s', size: 16 },
        ].map((s, i) => (
          <div key={i} className="animate-twinkle" style={{ position: 'absolute', top: s.t, left: s.l, animationDelay: s.delay }}>
            <Sparkle size={s.size} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}

        {/* Background gradient blobs */}
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,76,255,0.06) 0%, transparent 70%)',
          top: '-15%', right: '-10%',
          animation: 'float 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,79,163,0.05) 0%, transparent 70%)',
          bottom: '10%', left: '-8%',
          animation: 'floatSlow 15s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', width: '350px', height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,157,255,0.06) 0%, transparent 70%)',
          top: '40%', right: '-5%',
          animation: 'floatFast 10s ease-in-out infinite',
        }} />
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        maxWidth: '1720px',
        margin: '0 auto',
        display: 'flex',
        gap: '20px',
        position: 'relative',
        zIndex: 1,
        alignItems: 'flex-start',
      }}>

        {/* ══ SIDEBAR ══ */}
        <Sidebar />

        {/* ══ MAIN CONTENT ══ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>

          {/* TOP NAVBAR */}
          <Navbar profile={profile} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* HERO BANNER */}
          <HeroBanner profile={profile} lessons={lessons} />

          {/* PROGRESS CARDS ROW */}
          <ProgressCards />

          {/* MIDDLE GRID: Adventure Map (Left) + Right Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: '20px', alignItems: 'flex-start' }}>

            {/* Adventure Map */}
            <AdventureMap activeLevel={activeLevel} setActiveLevel={setActiveLevel} />

            {/* Right Widgets Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <DailyGoal />
              <LeaderboardWidget champions={champions} />
            </div>
          </div>

          {/* BOTTOM GRID: Badges + Rewards + Milestone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

            {/* My Badges */}
            <BadgesWidget />

            {/* Rewards Store */}
            <RewardsWidget />

            {/* Upcoming Milestone */}
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '24px',
              border: '2px solid #E8EFFF',
              padding: '20px',
              boxShadow: '0 8px 28px rgba(108,76,255,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ fontSize: '20px' }}>🎯</span>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040' }}>Upcoming Milestone</span>
              </div>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#6B7280', margin: '0 0 14px' }}>
                Keep your streak alive to unlock!
              </p>

              {/* Step path */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                {/* Connecting line */}
                <div style={{
                  position: 'absolute', top: '18px', left: '20px', right: '20px',
                  height: '4px', borderRadius: '99px',
                  background: 'linear-gradient(90deg, #6C4CFF 0%, #6C4CFF 33%, #E8EFFF 33%)',
                }} />

                {[
                  { label: '3 Days', done: true, icon: '🔥' },
                  { label: '7 Days', done: true, icon: '⭐' },
                  { label: '14 Days', done: false, icon: '🌙' },
                  { label: '30 Days', done: false, icon: '🏆' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>
                    <div
                      className={m.done ? 'animate-bobble' : ''}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: m.done
                          ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)'
                          : 'white',
                        border: m.done ? '3px solid rgba(255,255,255,0.5)' : '2px solid #E8EFFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px',
                        boxShadow: m.done ? '0 4px 14px rgba(108,76,255,0.45)' : '0 2px 8px rgba(0,0,0,0.08)',
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      {m.icon}
                    </div>
                    <span style={{
                      fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px',
                      color: m.done ? '#6C4CFF' : '#9CA3AF',
                    }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTINUE LEARNING CAROUSEL */}
          <ContinueLearning />

        </div>
      </div>
    </div>
  );
}
