import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressRing, ReadingIcon, WritingIcon, SpeakingIcon } from '../UI/Illustrations';

const cards = [
  {
    id: 'reading', label: 'Reading', icon: '📖', percent: 78,
    color: '#6C4CFF', bg: 'linear-gradient(135deg, #EDE7F6, #F3EEFF)',
    border: '#C4B5F4', shadow: 'rgba(108,76,255,0.15)',
    route: '/learn-with-ai', tag: 'Great job! 🔥', tagBg: '#EDE7F6', tagColor: '#6C4CFF',
  },
  {
    id: 'writing', label: 'Writing', icon: '✏️', percent: 45,
    color: '#FF4FA3', bg: 'linear-gradient(135deg, #FCE4EC, #FFF0F6)',
    border: '#F48FB1', shadow: 'rgba(255,79,163,0.15)',
    route: '/learn-with-ai', tag: 'Keep going! 💪', tagBg: '#FCE4EC', tagColor: '#FF4FA3',
  },
  {
    id: 'speaking', label: 'Speaking', icon: '🎙️', percent: 67,
    color: '#4D9DFF', bg: 'linear-gradient(135deg, #E3F2FD, #EEF6FF)',
    border: '#90CAF9', shadow: 'rgba(77,157,255,0.15)',
    route: '/voice-practice', tag: 'Good progress! 🌈', tagBg: '#E3F2FD', tagColor: '#4D9DFF',
  },
  {
    id: 'sticker', label: 'Sticker Power', icon: '🌸', percent: 55,
    color: '#5AD66F', bg: 'linear-gradient(135deg, #E8F5E9, #EDFAF0)',
    border: '#A5D6A7', shadow: 'rgba(90,214,111,0.15)',
    route: '/vocabulary', tag: 'Explore & collect! 🎨', tagBg: '#E8F5E9', tagColor: '#5AD66F',
  },
];

export const ProgressCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {cards.map((card) => (
        <div
          key={card.id}
          className="hover-lift"
          onClick={() => navigate(card.route)}
          style={{
            background: card.bg,
            borderRadius: '24px',
            border: `2px solid ${card.border}`,
            padding: '20px',
            cursor: 'pointer',
            boxShadow: `0 8px 28px ${card.shadow}, 0 2px 8px rgba(0,0,0,0.04)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            transition: 'all 0.25s',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner sparkle */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.3 }}>
            <span style={{ fontSize: '20px' }}>✨</span>
          </div>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '14px',
              background: 'white',
              border: `2px solid ${card.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              boxShadow: `0 4px 12px ${card.shadow}`,
            }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>
                {card.label}
              </div>
              <div style={{
                display: 'inline-block',
                background: card.tagBg,
                color: card.tagColor,
                fontSize: '10px', fontWeight: 800,
                padding: '2px 8px', borderRadius: '99px',
                fontFamily: 'Nunito',
              }}>
                {card.tag}
              </div>
            </div>
          </div>

          {/* Circular Progress */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProgressRing percent={card.percent} size={80} color={card.color} />
          </div>

          {/* Bottom progress bar */}
          <div>
            <div style={{
              height: '8px', borderRadius: '99px',
              background: 'rgba(255,255,255,0.7)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${card.percent}%`,
                borderRadius: '99px',
                background: `linear-gradient(90deg, ${card.color}, ${card.color}88)`,
                transition: 'width 1.5s ease',
                boxShadow: `0 2px 8px ${card.shadow}`,
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
