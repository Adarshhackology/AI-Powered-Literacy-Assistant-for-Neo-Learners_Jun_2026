import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinSVG, XPGem, FireSVG } from '../UI/Illustrations';
import { ProfileData } from '../../data/dashboardData';

interface NavbarProps {
  profile: ProfileData;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <header style={{
      height: '62px',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '18px',
      border: '1.5px solid rgba(255,255,255,0.6)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px', gap: '12px',
    }}>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#F6F8FF', border: '1.5px solid #E8EFFF',
        borderRadius: '99px', padding: '7px 14px',
        flex: 1, maxWidth: '400px',
      }}>
        <span style={{ fontSize: '16px', opacity: 0.45 }}>🔍</span>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search for lessons, games and more..."
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px',
            color: '#374151', width: '100%',
          }}
        />
        <button style={{
          width: '30px', height: '30px', borderRadius: '99px', flexShrink: 0,
          background: 'linear-gradient(135deg,#6C4CFF,#8A5CFF)',
          border: 'none', color: 'white', fontSize: '13px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 10px rgba(108,76,255,0.4)', cursor: 'pointer',
        }}>🎤</button>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        {/* Streak */}
        <div className="hover-lift" style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)',
          border: '1.5px solid #FFCC80', borderRadius: '99px',
          padding: '6px 12px',
          boxShadow: '0 3px 10px rgba(255,159,67,0.2)',
        }}>
          <div className="animate-heartbeat"><FireSVG size={18} /></div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#E65100' }}>
            {profile.streak} Day Streak
          </span>
        </div>

        {/* Coins */}
        <div className="hover-lift" style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'linear-gradient(135deg,#FFFDE7,#FFF9C4)',
          border: '1.5px solid #FFE082', borderRadius: '99px',
          padding: '6px 12px',
          boxShadow: '0 3px 10px rgba(255,213,74,0.2)',
        }}>
          <CoinSVG size={20} />
          <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '13px', color: '#E65100' }}>
            {profile.coins} Coins
          </span>
        </div>

        {/* XP */}
        <div className="hover-lift" style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: 'linear-gradient(135deg,#EDE7F6,#D8D0F0)',
          border: '1.5px solid #C4B5F4', borderRadius: '99px',
          padding: '6px 12px',
          boxShadow: '0 3px 10px rgba(108,76,255,0.15)',
        }}>
          <XPGem size={20} />
          <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '13px', color: '#4527A0' }}>
            {profile.xp} XP
          </span>
        </div>

        {/* Notification bell */}
        <button style={{
          width: '38px', height: '38px', borderRadius: '12px',
          background: '#F6F8FF', border: '1.5px solid #E8EFFF',
          fontSize: '16px', position: 'relative', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          🔔
          <span style={{
            position: 'absolute', top: '-3px', right: '-3px',
            width: '16px', height: '16px', borderRadius: '50%',
            background: '#FF4FA3', color: 'white',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
          }}>3</span>
        </button>

        {/* Profile pill */}
        <div className="hover-lift" onClick={() => navigate('/profile-setup')} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#F6F8FF', border: '1.5px solid #E8EFFF',
          borderRadius: '99px', padding: '4px 14px 4px 4px',
          cursor: 'pointer',
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#6C4CFF,#FF4FA3)',
            border: '2px solid white', overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(108,76,255,0.35)',
          }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#1e1040', lineHeight: 1.1 }}>{profile.fullName}</div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#8A5CFF' }}>Level {profile.level}</div>
          </div>
          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>▾</span>
        </div>
      </div>
    </header>
  );
};
