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
import { FloatingMascots } from '../components/FloatingMascots/FloatingMascots';
import { defaultProfile, championsList, ProfileData } from '../data/dashboardData';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  const [activeLevel, setActiveLevel] = useState<string>('Beginner');
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [lessons, setLessons] = useState<any[]>([]);
  const [champions, setChampions] = useState<any[]>(championsList);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const prof = await apiClient.getProfile(username);
        if (prof) {
          setProfile({
            ...defaultProfile,
            ...prof,
            fullName: (prof.fullName || username).toUpperCase()
          });
        }

        const less = await apiClient.getLessons();
        setLessons(less || []);

        const lb = await apiClient.getGamificationLeaderboard();
        if (lb && lb.leaderboard) {
          setChampions(lb.leaderboard);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [username, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EAF7FF] via-[#F5FAFF] to-[#FDFDFF] text-slate-800 font-nunito p-4 md:p-6 relative overflow-x-hidden">
      
      {/* Background Animated Mascots & Clouds */}
      <FloatingMascots />

      <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row gap-6 relative z-10">
        
        {/* Modular Sidebar (280px, Glass Effect) */}
        <Sidebar />

        {/* Main Content Body */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Modular Floating Top Navbar */}
          <Navbar 
            profile={profile} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          {/* Modular Hero Section */}
          <HeroBanner 
            profile={profile} 
            lessons={lessons} 
          />

          {/* Modular 4 Progress Cards */}
          <ProgressCards />

          {/* Modular Middle Grid: Adventure Map + Right Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Adventure Map (7 Cols) */}
            <div className="lg:col-span-7">
              <AdventureMap 
                activeLevel={activeLevel} 
                setActiveLevel={setActiveLevel} 
              />
            </div>

            {/* Right Side Widgets (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <DailyGoal />
              <LeaderboardWidget champions={champions} />
            </div>

          </div>

          {/* Modular Bottom Row Grid: Badges, Rewards, Milestone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BadgesWidget />
            <RewardsWidget />
            
            {/* Upcoming Milestone Widget */}
            <div className="bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-black text-base">
                <span className="text-xl">🎯</span>
                <span>Upcoming Milestone</span>
              </div>
              <p className="text-xs font-bold text-slate-500">Keep your streak alive!</p>
              <div className="flex items-center justify-between pt-2">
                {[
                  { days: '3 Days', active: true },
                  { days: '7 Days', active: true },
                  { days: '14 Days', active: false },
                  { days: '30 Days', active: false },
                ].map((m, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      m.active ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-600">{m.days}</span>
                  </div>
                ))}
                <div className="text-2xl animate-float">🏆</div>
              </div>
            </div>
          </div>

          {/* Modular Continue Learning Carousel */}
          <ContinueLearning />

        </div>

      </div>
    </div>
  );
}
