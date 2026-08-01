import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DragonMascot } from '../UI/Illustrations';
import { continueLessons } from '../../data/dashboardData';

export const ContinueLearning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '20px', alignItems: 'stretch' }}>

      {/* Learning Cards Grid */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '24px',
        border: '2px solid #E8EFFF',
        padding: '20px',
        boxShadow: '0 8px 28px rgba(108,76,255,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '20px' }}>📚</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>Continue Learning</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {continueLessons.map((item) => (
            <div
              key={item.id}
              className="hover-lift"
              onClick={() => navigate(`/lesson/${item.id}`)}
              style={{
                background: '#F8FAFF',
                borderRadius: '18px',
                border: '2px solid #E8EFFF',
                padding: '14px',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}
            >
              {/* Icon row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: `linear-gradient(135deg, ${item.color.includes('purple') ? '#EDE7F6' : item.color.includes('pink') ? '#FCE4EC' : item.color.includes('sky') ? '#E3F2FD' : '#E8F5E9'}, white)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                  border: '1.5px solid #E8EFFF',
                  boxShadow: '0 2px 8px rgba(108,76,255,0.1)',
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '12px',
                  color: '#6C4CFF',
                  background: '#EDE7F6',
                  padding: '2px 8px', borderRadius: '99px',
                }}>
                  {item.progress}%
                </span>
              </div>

              {/* Title */}
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040', lineHeight: 1.3, marginBottom: '2px' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#9CA3AF' }}>
                  {item.subtitle}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: '6px', borderRadius: '99px', background: '#E8EFFF', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${item.progress}%`,
                  background: `linear-gradient(90deg, #6C4CFF, #8A5CFF)`,
                  borderRadius: '99px',
                  boxShadow: '0 2px 6px rgba(108,76,255,0.4)',
                }} />
              </div>

              {/* Play button */}
              <button
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: 'white', fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  boxShadow: '0 4px 14px rgba(108,76,255,0.45)',
                  transition: 'all 0.2s',
                }}
                className="btn-3d"
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dragon Booster Card */}
      <div style={{
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #6C4CFF 0%, #9B59B6 50%, #4D9DFF 100%)',
        padding: '24px 20px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', gap: '12px',
        boxShadow: '0 16px 40px rgba(108,76,255,0.35)',
        border: '3px solid rgba(255,255,255,0.2)',
        borderBottom: '5px solid rgba(0,0,0,0.25)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Bg sparkles */}
        <div style={{ position: 'absolute', top: '8px', right: '8px', opacity: 0.4, fontSize: '20px' }}>✨</div>
        <div style={{ position: 'absolute', bottom: '20px', left: '8px', opacity: 0.3, fontSize: '14px' }}>⭐</div>

        <div className="animate-bobble">
          <DragonMascot size={80} />
        </div>

        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#FFD54A', marginBottom: '4px' }}>
            Keep Going! 💜
          </div>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5 }}>
            You're doing great! Every lesson makes you stronger! 🌟
          </p>
        </div>

        <button
          onClick={() => {}}
          className="btn-3d"
          style={{
            background: '#FFD54A',
            color: '#1e1040',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
            padding: '10px 20px', borderRadius: '14px',
            border: '2px solid rgba(255,255,255,0.4)',
            borderBottom: '4px solid #E8A000',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(255,213,74,0.5)',
          }}
        >
          🚀 Level Up!
        </button>
      </div>

    </div>
  );
};
