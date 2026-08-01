import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeSVG } from '../UI/Illustrations';

const badges = [
  { title: 'First Lesson', icon: '📖', color: '#4D9DFF' },
  { title: '7 Day Streak', icon: '🔥', color: '#FF4FA3' },
  { title: 'Level Explorer', icon: '🚀', color: '#5AD66F' },
  { title: 'Reading Star', icon: '⭐', color: '#8A5CFF' },
  { title: 'Perfect Score', icon: '🏅', color: '#3ABEFF' },
];

export const BadgesWidget: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1.5px solid #E8EFFF',
      padding: '14px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>My Badges</span>
        </div>
        <Link to="/reports" style={{
          fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px',
          color: '#6C4CFF', textDecoration: 'none',
        }}>
          View All
        </Link>
      </div>

      {/* Badge cards */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px',
      }}>
        {badges.map((b, i) => (
          <div
            key={i}
            className="hover-lift"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '4px', cursor: 'pointer',
            }}
          >
            <BadgeSVG icon={b.icon} color={b.color} size={42} />
            <div style={{
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '8.5px',
              color: '#334155', textAlign: 'center', maxWidth: '52px', lineHeight: 1.1,
            }}>
              {b.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
