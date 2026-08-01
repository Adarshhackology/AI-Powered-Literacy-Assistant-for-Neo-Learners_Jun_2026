import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdventureWorldMap, TreasureChest, StarRating } from '../UI/Illustrations';

interface AdventureMapProps {
  activeLevel: string;
  setActiveLevel: (l: string) => void;
}

const stages = [
  { id: 1, label: 'Stage 1', sub: 'Start Your Journey', emoji: '📖', color: '#5AD66F', shadow: 'rgba(90,214,111,0.5)', stars: 3, x: 8, y: 58, unlocked: true },
  { id: 2, label: 'Daily Challenge', sub: 'Unlocked', emoji: '⭐', color: '#FF9F43', shadow: 'rgba(255,159,67,0.5)', stars: 1, x: 28, y: 42, unlocked: true },
  { id: 3, label: 'Stage 2', sub: 'Keep Going!', emoji: '🚀', color: '#4D9DFF', shadow: 'rgba(77,157,255,0.5)', stars: 2, x: 52, y: 58, unlocked: true },
  { id: 4, label: 'Stage 3', sub: 'New Adventures', emoji: '🔒', color: '#94A3B8', shadow: 'rgba(148,163,184,0.3)', stars: 3, x: 72, y: 44, unlocked: false },
];

export const AdventureMap: React.FC<AdventureMapProps> = ({ activeLevel, setActiveLevel }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '28px',
      border: '2px solid #E8EFFF',
      padding: '22px',
      boxShadow: '0 12px 40px rgba(108,76,255,0.1), 0 4px 16px rgba(108,76,255,0.05)',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🗺️</span>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: 0 }}>
            Learning Adventure Map
          </h3>
        </div>

        {/* Level tabs */}
        <div style={{
          display: 'flex', gap: '6px',
          background: '#F6F8FF', padding: '5px', borderRadius: '99px',
          border: '2px solid #E8EFFF',
        }}>
          {['🔮 Beginner', '🗡️ Intermediate', '⚔️ Advanced'].map((lvl, i) => {
            const key = lvl.split(' ')[1];
            const active = activeLevel === key;
            return (
              <button
                key={i}
                onClick={() => setActiveLevel(key)}
                disabled={i > 0}
                style={{
                  padding: '6px 14px', borderRadius: '99px',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
                  cursor: i > 0 ? 'not-allowed' : 'pointer',
                  border: 'none',
                  background: active ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : 'transparent',
                  color: active ? 'white' : i > 0 ? '#C4B5F4' : '#6B7280',
                  boxShadow: active ? '0 4px 14px rgba(108,76,255,0.4)' : 'none',
                  transition: 'all 0.2s',
                  opacity: i > 0 ? 0.6 : 1,
                }}
              >
                {i > 0 ? '🔒 ' : ''}{key}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAP WORLD */}
      <div style={{
        borderRadius: '22px',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '340px',
        border: '3px solid #B3D9FF',
        boxShadow: 'inset 0 0 40px rgba(77,157,255,0.1)',
      }}>
        {/* Full SVG World Map background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <AdventureWorldMap />
        </div>

        {/* Stage Node Overlays */}
        {stages.map((stage) => (
          <div
            key={stage.id}
            onClick={() => stage.unlocked && navigate(`/lesson/${stage.id}`)}
            className={stage.unlocked ? 'hover-lift animate-bobble' : ''}
            style={{
              position: 'absolute',
              left: `${stage.x}%`,
              top: `${stage.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: stage.unlocked ? 'pointer' : 'not-allowed',
              animationDelay: `${stage.id * 0.3}s`,
              zIndex: 10,
            }}
          >
            {/* Stage circle */}
            <div style={{
              width: stage.label.includes('Daily') ? '56px' : '68px',
              height: stage.label.includes('Daily') ? '56px' : '68px',
              borderRadius: '50%',
              background: stage.unlocked
                ? `radial-gradient(circle at 35% 35%, ${stage.color}EE, ${stage.color}88)`
                : 'radial-gradient(circle at 35% 35%, #D1D5DB, #9CA3AF)',
              border: '4px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: stage.label.includes('Daily') ? '22px' : '28px',
              boxShadow: stage.unlocked
                ? `0 8px 24px ${stage.shadow}, 0 0 0 4px ${stage.color}33`
                : '0 4px 12px rgba(0,0,0,0.15)',
              filter: stage.unlocked ? 'none' : 'grayscale(0.5)',
              transition: 'all 0.25s',
            }}>
              {stage.emoji}
            </div>

            {/* Label bubble */}
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '4px 10px',
              textAlign: 'center',
              border: `2px solid ${stage.unlocked ? stage.color + '44' : '#E8EFFF'}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: '90px',
            }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#1e1040' }}>{stage.label}</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '9px', color: '#6B7280' }}>{stage.sub}</div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                <StarRating count={stage.unlocked ? stage.stars : 0} max={3} size={10} />
              </div>
            </div>
          </div>
        ))}

        {/* Treasure Chest (end) */}
        <div
          className="hover-lift animate-bobble"
          onClick={() => navigate('/store')}
          style={{
            position: 'absolute',
            right: '4%', top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '6px',
            cursor: 'pointer', zIndex: 10,
          }}
        >
          <TreasureChest size={72} />
          <div style={{
            background: '#FFD54A',
            color: '#1e1040',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
            padding: '4px 12px', borderRadius: '99px',
            boxShadow: '0 4px 12px rgba(255,213,74,0.5)',
          }}>
            Grand Mission!
          </div>
        </div>
      </div>
    </div>
  );
};
