import React from 'react';
import { Link } from 'react-router-dom';
import { TrophySVG } from '../UI/Illustrations';
import { Champion } from '../../data/dashboardData';

interface LeaderboardWidgetProps {
  champions: Champion[];
}

const rankColors = ['#FFD54A', '#94A3B8', '#CD7F32', '#6C4CFF', '#FF9F43'];
const rankLabels = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ champions }) => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '24px',
      border: '2px solid #E8EFFF',
      padding: '20px',
      boxShadow: '0 8px 28px rgba(108,76,255,0.1)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrophySVG size={24} />
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040' }}>Champions League</span>
        </div>
        <Link to="/leaderboard" style={{
          fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
          color: '#6C4CFF', textDecoration: 'none',
          background: '#EDE7F6', padding: '4px 12px',
          borderRadius: '99px', border: '1.5px solid #B39DDB',
        }}>
          View All →
        </Link>
      </div>

      {/* Players */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {champions.slice(0, 5).map((c, i) => (
          <div
            key={c.rank}
            className="hover-lift"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: i === 0 ? 'linear-gradient(135deg, #FFFDE7, #FFF8DC)' : '#F8FAFF',
              borderRadius: '16px',
              padding: '10px 12px',
              border: i === 0 ? '2px solid #FFE082' : '1.5px solid #F0F4FF',
              boxShadow: i === 0 ? '0 4px 16px rgba(255,213,74,0.25)' : 'none',
            }}
          >
            {/* Rank medal */}
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${rankColors[i]}, ${rankColors[i]}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 900, color: 'white',
              boxShadow: `0 3px 10px ${rankColors[i]}55`,
              flexShrink: 0,
            }}>
              {i + 1}
            </div>

            {/* Avatar */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6C4CFF, #FF4FA3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', flexShrink: 0,
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}>
              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${c.name}`} alt={c.name} style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Name & level */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
                {c.name}
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#6B7280' }}>
                Level {c.level}
              </div>
            </div>

            {/* XP Badge */}
            <div style={{
              background: 'linear-gradient(135deg, #EDE7F6, #DDD6FE)',
              color: '#6C4CFF',
              fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '12px',
              padding: '4px 10px', borderRadius: '99px',
              border: '1.5px solid #C4B5F4',
            }}>
              {c.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
