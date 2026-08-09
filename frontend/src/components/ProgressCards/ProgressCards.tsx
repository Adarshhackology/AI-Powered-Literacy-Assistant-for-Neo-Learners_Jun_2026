import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpenText, Mic2, PenLine, Sparkles } from 'lucide-react';
import { ProgressRing } from '../UI/Illustrations';

const cards = [
  {
    id: 'reading',
    label: 'Reading Mastery',
    icon: BookOpenText,
    percent: 78,
    color: '#6C4CFF',
    border: 'rgba(108,76,255,0.3)',
    tag: 'Great progress',
    gradient: 'linear-gradient(135deg, #F3E8FF, #FFFFFF)',
    route: '/learn-with-ai',
  },
  {
    id: 'writing',
    label: 'Writing Skills',
    icon: PenLine,
    percent: 45,
    color: '#FF4FA3',
    border: 'rgba(255,79,163,0.3)',
    tag: 'Keep practicing',
    gradient: 'linear-gradient(135deg, #FCE7F3, #FFFFFF)',
    route: '/learn-with-ai',
  },
  {
    id: 'speaking',
    label: 'Speaking Voice',
    icon: Mic2,
    percent: 67,
    color: '#4D9DFF',
    border: 'rgba(77,157,255,0.3)',
    tag: 'Good progress',
    gradient: 'linear-gradient(135deg, #E0F2FE, #FFFFFF)',
    route: '/voice-practice',
  },
  {
    id: 'sticker',
    label: 'Sticker Power',
    icon: Sparkles,
    percent: null,
    color: '#8A5CFF',
    border: 'rgba(138,92,255,0.3)',
    tag: 'Collect and unlock stickers',
    headline: 'Explore',
    gradient: 'linear-gradient(135deg, #EDE7F6, #FFFFFF)',
    route: '/vocabulary',
  },
];

export const ProgressCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-card-grid">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="hover-lift btn-3d"
            onClick={() => navigate(card.route)}
            style={{
              background: card.gradient,
              backdropFilter: 'blur(16px)',
              borderRadius: '14px',
              border: `2px solid ${card.border}`,
              padding: '16px 18px',
              cursor: 'pointer',
              boxShadow: `0 10px 24px ${card.color}20`,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              minHeight: '92px',
              transition: 'all 0.2s ease',
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
              <div
                className="animate-bobble"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  flexShrink: 0,
                  background: 'white',
                  border: `1.5px solid ${card.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${card.color}25`,
                }}
              >
                <Icon size={23} color={card.color} strokeWidth={2.7} />
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: card.color, textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {card.label}
                </div>
                {card.headline ? (
                  <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', lineHeight: 1 }}>
                    {card.headline}
                  </div>
                ) : (
                  <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '28px', color: '#1e1040', lineHeight: 1 }}>
                    {card.percent}%
                  </div>
                )}
                <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {card.tag}
                </div>
              </div>
            </div>

            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              {card.percent !== null ? (
                <ProgressRing percent={card.percent} size={56} color={card.color} />
              ) : (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'white',
                    border: `2px solid ${card.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                    boxShadow: `0 4px 12px ${card.color}30`,
                  }}
                >
                  <ArrowRight size={18} strokeWidth={3} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
