import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeSVG } from '../UI/Illustrations';

const badges = [
  { title: 'First Lesson', icon: '📖', bg: '#6C4CFF', glow: 'rgba(108,76,255,0.4)' },
  { title: '7 Day Streak', icon: '🔥', bg: '#FF9F43', glow: 'rgba(255,159,67,0.4)' },
  { title: 'Level Explorer', icon: '🚀', bg: '#4D9DFF', glow: 'rgba(77,157,255,0.4)' },
  { title: 'Reading Star', icon: '⭐', bg: '#FFD54A', glow: 'rgba(255,213,74,0.4)' },
  { title: 'Perfect Score', icon: '🏅', bg: '#5AD66F', glow: 'rgba(90,214,111,0.4)' },
  { title: 'Speed Champ', icon: '⚡', bg: '#FF4FA3', glow: 'rgba(255,79,163,0.4)' },
];

export const BadgesWidget: React.FC = () => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '24px',
      border: '2px solid #E8EFFF',
      padding: '20px',
      boxShadow: '0 8px 28px rgba(108,76,255,0.1)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🛡️</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040' }}>My Badges</span>
        </div>
        <Link to="/reports" style={{
          fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
          color: '#6C4CFF', textDecoration: 'none',
          background: '#EDE7F6', padding: '4px 12px',
          borderRadius: '99px', border: '1.5px solid #B39DDB',
        }}>
          View All →
        </Link>
      </div>

      {/* Badge cards - scrollable row */}
      <div style={{
        display: 'flex', gap: '10px',
        overflowX: 'auto', paddingBottom: '8px',
      }}>
        {badges.map((b, i) => (
          <div
            key={i}
            className="hover-lift"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '6px', flexShrink: 0, cursor: 'pointer',
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* 3D Badge */}
            <div className="animate-bobble" style={{ animationDelay: `${i * 0.2}s` }}>
              <BadgeSVG icon={b.icon} bg={b.bg} size={54} />
            </div>
            <div style={{
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px',
              color: '#374151', textAlign: 'center', maxWidth: '58px', lineHeight: 1.2,
            }}>
              {b.title}
            </div>
            {/* Glow dot */}
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: b.bg, boxShadow: `0 2px 8px ${b.glow}`,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};
