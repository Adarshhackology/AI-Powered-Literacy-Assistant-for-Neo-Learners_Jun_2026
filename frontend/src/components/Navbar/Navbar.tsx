import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinSVG, XPCrystal, FireStreakSVG, Sparkle } from '../UI/Illustrations';
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
      height: '80px',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(30px)',
      borderRadius: '24px',
      border: '2px solid #E8EFFF',
      boxShadow: '0 8px 32px rgba(108,76,255,0.1), 0 2px 8px rgba(108,76,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      gap: '16px',
    }}>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#F6F8FF',
        border: '2px solid #E8EFFF',
        borderRadius: '99px',
        padding: '8px 16px',
        flex: 1,
        maxWidth: '460px',
        transition: 'all 0.2s',
      }}>
        <span style={{ fontSize: '18px', opacity: 0.5 }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search lessons, games, activities..."
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px',
            color: '#374151', width: '100%',
          }}
        />
        <button
          onClick={() => navigate('/voice-practice')}
          className="btn-3d"
          style={{
            width: '34px', height: '34px', borderRadius: '99px',
            background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
            border: 'none', color: 'white', fontSize: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(108,76,255,0.4)',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          🎤
        </button>
      </div>

      {/* Stats & Profile Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

        {/* Streak Pill */}
        <div className="hover-lift" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
          border: '2px solid #FFCC80',
          borderRadius: '99px', padding: '8px 14px',
          boxShadow: '0 4px 12px rgba(255,159,67,0.2)',
        }}>
          <div className="animate-heartbeat" style={{ display: 'flex' }}>
            <FireStreakSVG size={22} />
          </div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#E65100' }}>
            {profile.streak} Day
          </span>
        </div>

        {/* Coins Pill */}
        <div className="hover-lift" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(135deg, #FFFDE7, #FFF9C4)',
          border: '2px solid #FFE082',
          borderRadius: '99px', padding: '8px 14px',
          boxShadow: '0 4px 12px rgba(255,213,74,0.25)',
        }}>
          <CoinSVG size={22} />
          <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '14px', color: '#F57F17' }}>
            {profile.coins}
          </span>
        </div>

        {/* XP Pill */}
        <div className="hover-lift" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)',
          border: '2px solid #B39DDB',
          borderRadius: '99px', padding: '8px 14px',
          boxShadow: '0 4px 12px rgba(108,76,255,0.2)',
        }}>
          <XPCrystal size={22} />
          <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '14px', color: '#4527A0' }}>
            {profile.xp} XP
          </span>
        </div>

        {/* Gift Button */}
        <button className="btn-3d hover-lift" style={{
          width: '42px', height: '42px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #FF4FA3, #FF6B35)',
          border: '2px solid rgba(255,255,255,0.4)',
          color: 'white', fontSize: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(255,79,163,0.35)',
          cursor: 'pointer',
        }} onClick={() => navigate('/store')}>
          🎁
        </button>

        {/* Notification Bell */}
        <button className="btn-3d hover-lift" style={{
          width: '42px', height: '42px', borderRadius: '14px',
          background: '#F6F8FF', border: '2px solid #E8EFFF',
          fontSize: '18px', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(108,76,255,0.1)',
          cursor: 'pointer',
        }}>
          🔔
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '18px', height: '18px', borderRadius: '50%',
            background: '#FF4FA3', color: 'white',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 6px rgba(255,79,163,0.5)',
          }}>3</span>
        </button>

        {/* Profile Avatar Pill */}
        <div className="hover-lift" onClick={() => navigate('/profile-setup')} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'linear-gradient(135deg, #EDE7F6, #E8EFFF)',
          border: '2px solid #D1C4E9',
          borderRadius: '99px', padding: '6px 16px 6px 6px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(108,76,255,0.12)',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6C4CFF, #FF4FA3)',
            border: '3px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: 900, color: 'white',
            boxShadow: '0 4px 12px rgba(108,76,255,0.4)',
            overflow: 'hidden',
          }}>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || 'player'}`}
              alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040', lineHeight: 1.2 }}>
              {profile.fullName}
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#8A5CFF' }}>
              ⚡ Level {profile.level}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
