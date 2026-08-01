import React from 'react';
import { FireSVG } from '../UI/Illustrations';

const days = [
  { name: 'Mon', done: true },
  { name: 'Tue', done: true },
  { name: 'Wed', done: true },
  { name: 'Thu', done: true },
  { name: 'Fri', done: true },
  { name: 'Sat', done: false },
  { name: 'Sun', done: false },
];

export const DailyGoal: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1.5px solid #E8EFFF',
      padding: '14px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FireSVG size={20} />
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>Daily Goal</span>
        </div>
        <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', color: '#6C4CFF' }}>
          5 / 7 Days
        </span>
      </div>

      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#1e1040', marginBottom: '10px' }}>
        Study 6 Days
      </div>

      {/* Days row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {days.map((day, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '32px',
              height: '24px',
              borderRadius: '99px',
              background: day.done
                ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)'
                : '#E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: day.done ? 'white' : '#94A3B8',
              fontSize: '11px',
              fontWeight: 900,
              boxShadow: day.done ? '0 2px 8px rgba(108,76,255,0.3)' : 'none',
            }}>
              ✓
            </div>
            <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '9px', color: '#64748B' }}>
              {day.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
