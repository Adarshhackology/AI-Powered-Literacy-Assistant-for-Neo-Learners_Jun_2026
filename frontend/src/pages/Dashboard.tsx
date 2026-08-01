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
import { TrophySVG, Sparkle } from '../components/UI/Illustrations';

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
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.3) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      padding: '16px',
      position: 'relative',
      overflowX: 'hidden',
    }}>

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 12 }, { t: '12%', l: '90%', s: 16 },
          { t: '25%', l: '3%', s: 14 }, { t: '45%', l: '95%', s: 10 },
          { t: '70%', l: '4%', s: 18 }, { t: '88%', l: '92%', s: 14 },
          { t: '60%', l: '88%', s: 12 }, { t: '35%', l: '6%', s: 10 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        gap: '16px',
        position: 'relative',
        zIndex: 1,
        alignItems: 'stretch',
      }}>

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN BODY CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>

          {/* NAVBAR */}
          <Navbar profile={profile} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* HERO BANNER */}
          <HeroBanner profile={profile} lessons={lessons} />

          {/* PROGRESS CARDS */}
          <ProgressCards />

          {/* MIDDLE ROW: Adventure Map (Left) + Daily Goal & Champions (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '14px', alignItems: 'stretch' }}>

            {/* Adventure Map */}
            <AdventureMap activeLevel={activeLevel} setActiveLevel={setActiveLevel} />

            {/* Right Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <DailyGoal />
              <LeaderboardWidget champions={champions} />
            </div>
          </div>

          {/* BOTTOM ROW 1: My Badges + Rewards Store + Upcoming Milestone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>

            {/* My Badges */}
            <BadgesWidget />

            {/* Rewards Store */}
            <RewardsWidget />

            {/* Upcoming Milestone */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              border: '1.5px solid #E8EFFF',
              padding: '14px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '18px' }}>🎯</span>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>Upcoming Milestone</span>
                </div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B', marginBottom: '12px' }}>
                  Keep your streak alive!
                </div>
              </div>

              {/* Timeline + Trophy */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

                {/* Connecting Line */}
                <div style={{
                  position: 'absolute', top: '16px', left: '20px', right: '50px',
                  height: '3px', background: '#E2E8F0', borderRadius: '99px',
                }} />
                <div style={{
                  position: 'absolute', top: '16px', left: '20px', width: '35%',
                  height: '3px', background: '#6C4CFF', borderRadius: '99px',
                }} />

                {[
                  { label: '3 Days', done: true },
                  { label: '7 Days', done: true },
                  { label: '14 Days', done: false },
                  { label: '30 Days', done: false },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      background: m.done ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : 'white',
                      border: m.done ? 'none' : '2px solid #CBD5E1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: m.done ? 'white' : '#94A3B8', fontSize: '11px', fontWeight: 900,
                      boxShadow: m.done ? '0 3px 10px rgba(108,76,255,0.4)' : 'none',
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '9px', color: m.done ? '#6C4CFF' : '#94A3B8' }}>
                      {m.label}
                    </span>
                  </div>
                ))}

                {/* Golden Trophy on right */}
                <div className="animate-bobble" style={{ zIndex: 1 }}>
                  <TrophySVG size={36} />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW 2: Continue Learning */}
          <ContinueLearning />

        </div>
      </div>
    </div>
  );
}
