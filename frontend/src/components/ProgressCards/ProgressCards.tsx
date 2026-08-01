import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressRing } from '../UI/Illustrations';

// Exactly matching the reference image cards
const cards = [
  {
    id: 'reading', label: 'Reading', icon: '📖', percent: 78,
    color: '#6C4CFF', bg: 'white',
    border: '#E8EFFF', tag: 'Great! Keep it up! 🔥',
    route: '/learn-with-ai',
  },
  {
    id: 'writing', label: 'Writing', icon: '✏️', percent: 45,
    color: '#FF4FA3', bg: 'white',
    border: '#FFE0F0', tag: 'Keep practicing! 💪',
    route: '/learn-with-ai',
  },
  {
    id: 'speaking', label: 'Speaking', icon: '🎙️', percent: 67,
    color: '#4D9DFF', bg: 'white',
    border: '#E0EEFF', tag: 'Good progress! 🌈',
    route: '/voice-practice',
  },
  {
    id: 'sticker', label: 'Sticker Power', icon: '🌸', percent: null,
    color: '#8A5CFF', bg: 'white',
    border: '#EDE7F6', tag: 'Collect & unlock stickers',
    headline: 'Explore',
    route: '/vocabulary',
  },
];

export const ProgressCards: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
      {cards.map(card => (
        <div
          key={card.id}
          className="hover-lift"
          onClick={() => navigate(card.route)}
          style={{
            background: card.bg,
            borderRadius: '18px',
            border: `1.5px solid ${card.border}`,
            padding: '14px 16px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', gap: '12px',
            minHeight: '78px',
          }}
        >
          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px', flexShrink: 0,
              background: `${card.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
            }}>{card.icon}</div>

            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: card.color, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                {card.label}
              </div>
              {card.headline ? (
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1e1040', lineHeight: 1 }}>
                  {card.headline}
                </div>
              ) : (
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '26px', color: '#1e1040', lineHeight: 1 }}>
                  {card.percent}%
                </div>
              )}
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#94A3B8', marginTop: '1px' }}>
                {card.tag}
              </div>
            </div>
          </div>

          {/* Progress ring or arrow */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            {card.percent !== null ? (
              <ProgressRing percent={card.percent!} size={52} color={card.color} />
            ) : (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: `${card.color}15`, border: `1.5px solid ${card.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.color, fontSize: '16px', fontWeight: 900,
              }}>›</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
