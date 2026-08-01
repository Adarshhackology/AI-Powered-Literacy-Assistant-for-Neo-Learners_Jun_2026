import React from 'react';
import { useNavigate } from 'react-router-dom';

const lessons = [
  {
    id: 1,
    title: 'Reading Comprehension',
    sub: 'Module 2 • Lesson 4',
    progress: 75,
    icon: '📖',
    color: '#6C4CFF',
  },
  {
    id: 2,
    title: 'Creative Writing',
    sub: 'Module 1 • Lesson 3',
    progress: 40,
    icon: '🌸',
    color: '#FF4FA3',
  },
  {
    id: 3,
    title: 'Spoken English',
    sub: 'Module 3 • Lesson 1',
    progress: 60,
    icon: '🎙️',
    color: '#4D9DFF',
  },
  {
    id: 4,
    title: 'Vocabulary Builder',
    sub: 'Module 2 • Lesson 6',
    progress: 30,
    icon: '📗',
    color: '#5AD66F',
  },
];

export const ContinueLearning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1.5px solid #E8EFFF',
      padding: '14px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px' }}>📚</span>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040', margin: 0 }}>
          Continue Learning
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '12px', alignItems: 'center' }}>

        {/* 4 Lesson cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {lessons.map((item) => (
            <div
              key={item.id}
              className="hover-lift"
              onClick={() => navigate(`/lesson/${item.id}`)}
              style={{
                background: '#F8FAFF',
                borderRadius: '14px',
                border: '1px solid #E8EFFF',
                padding: '10px 12px',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '6px',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px',
                  background: `${item.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', color: '#1e1040',
                    lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '9px', color: '#94A3B8' }}>
                    {item.sub}
                  </div>
                </div>
              </div>

              {/* Progress bar + play button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '5px', borderRadius: '99px', background: '#E2E8F0', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${item.progress}%`,
                      background: item.color, borderRadius: '99px',
                    }} />
                  </div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '9px', color: item.color, marginTop: '2px' }}>
                    {item.progress}%
                  </div>
                </div>

                <button
                  style={{
                    width: '26px', height: '26px',
                    borderRadius: '50%',
                    background: item.color,
                    border: 'none',
                    color: 'white', fontSize: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                    boxShadow: `0 3px 8px ${item.color}40`,
                  }}
                >
                  ▶
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Purple Booster Banner */}
        <div style={{
          height: '100%',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
          padding: '12px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(108,76,255,0.3)',
        }}>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#FFD54A', marginBottom: '2px' }}>
              Keep Going!
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.85)' }}>
              You're doing great!
            </div>
          </div>

          {/* Purple Dragon mascot SVG on right */}
          <div className="animate-bobble" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" fill="#9B59B6" />
              <circle cx="18" cy="20" r="4" fill="white" />
              <circle cx="30" cy="20" r="4" fill="white" />
              <circle cx="19" cy="21" r="2" fill="#1A0A3D" />
              <circle cx="31" cy="21" r="2" fill="#1A0A3D" />
              <path d="M 19 28 Q 24 33 29 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <polygon points="16,8 14,2 20,6" fill="#FFD54A" />
              <polygon points="32,8 34,2 28,6" fill="#FFD54A" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};
