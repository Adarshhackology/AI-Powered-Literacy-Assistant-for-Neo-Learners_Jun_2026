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
import { defaultProfile, championsList, ProfileData } from '../data/dashboardData';
import { Sparkle } from '../components/UI/Illustrations';

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
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
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

          {/* BOTTOM ROW: Badges & Rewards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <BadgesWidget />
            <RewardsWidget />
          </div>

        </div>
      </div>
    </div>
  );
}
