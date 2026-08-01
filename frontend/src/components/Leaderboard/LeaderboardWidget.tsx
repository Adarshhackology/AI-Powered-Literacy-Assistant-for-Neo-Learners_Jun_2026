import React from 'react';
import { Link } from 'react-router-dom';
import { TrophySVG } from '../UI/Illustrations';
import { Champion } from '../../data/dashboardData';

interface LeaderboardWidgetProps {
  champions: Champion[];
}

const rankColors = ['#FFD54A', '#94A3B8', '#CD7F32', '#6C4CFF', '#8A5CFF'];

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = () => {
  const list = [
    { rank: 1, name: 'Adarsh', level: 5, xp: 1560 },
    { rank: 2, name: 'Siddharth', level: 5, xp: 1480 },
    { rank: 3, name: 'Priya', level: 5, xp: 1350 },
    { rank: 4, name: 'Aashi', level: 4, xp: 1200 },
    { rank: 5, name: 'Yashwi', level: 4, xp: 1100 },
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1.5px solid #E8EFFF',
      padding: '14px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrophySVG size={18} />
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>Champions League</span>
        </div>
        <Link to="/leaderboard" style={{
          fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px',
          color: '#6C4CFF', textDecoration: 'none',
        }}>
          View All
        </Link>
      </div>

      {/* Players */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {list.map((c) => (
          <div
            key={c.rank}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 8px',
              borderRadius: '10px',
              background: '#F8FAFF',
            }}
          >
            {/* Rank number */}
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              background: rankColors[c.rank - 1],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 900, color: 'white',
              flexShrink: 0,
            }}>
              {c.rank}
            </div>

            {/* Avatar */}
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: '#E2E8F0',
              overflow: 'hidden', flexShrink: 0,
            }}>
              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${c.name}`} alt={c.name} style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Name & level */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', color: '#1e1040', lineHeight: 1.1 }}>
                {c.name}
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '9px', color: '#94A3B8' }}>
                Level {c.level} • {c.xp} XP
              </div>
            </div>

            {/* XP Badge */}
            <div style={{
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
              color: '#1e1040',
            }}>
              {c.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
