import React from 'react';
import { FireStreakSVG } from '../UI/Illustrations';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const done = [true, true, true, true, true, false, false];

export const DailyGoal: React.FC = () => {
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
          <FireStreakSVG size={22} />
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040' }}>Daily Goal</span>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)',
          color: '#6C4CFF',
          fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
          padding: '4px 12px', borderRadius: '99px',
          border: '1.5px solid #B39DDB',
        }}>
          5 / 7 Days
        </div>
      </div>

      <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#6B7280', margin: '0 0 12px' }}>
        Study 6 Days to earn a 🔥 Streak Reward!
      </p>

      {/* Day bubbles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        {days.map((day, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <div
              className={done[i] ? 'animate-bobble' : ''}
              style={{
                width: '36px', height: '36px', borderRadius: '12px',
                background: done[i]
                  ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)'
                  : '#F6F8FF',
                border: done[i] ? '2px solid rgba(255,255,255,0.4)' : '2px solid #E8EFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: done[i] ? '16px' : '12px',
                color: done[i] ? 'white' : '#C4B5F4',
                boxShadow: done[i] ? '0 4px 14px rgba(108,76,255,0.4)' : 'none',
                animationDelay: `${i * 0.1}s`,
                transition: 'all 0.2s',
                fontWeight: 900,
              }}
            >
              {done[i] ? '✓' : ''}
            </div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: done[i] ? '#6C4CFF' : '#9CA3AF' }}>
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Streak progress bar */}
      <div style={{ marginTop: '14px' }}>
        <div style={{
          height: '10px', borderRadius: '99px',
          background: '#F0F4FF',
          border: '1.5px solid #E8EFFF',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: '71%',
            background: 'linear-gradient(90deg, #6C4CFF, #FF4FA3)',
            borderRadius: '99px',
            boxShadow: '0 2px 8px rgba(108,76,255,0.4)',
            position: 'relative',
          }}>
            <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, borderRadius: '99px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#9CA3AF' }}>Start</span>
          <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#6C4CFF' }}>5 of 6 Done! 🎯</span>
        </div>
      </div>
    </div>
  );
};
