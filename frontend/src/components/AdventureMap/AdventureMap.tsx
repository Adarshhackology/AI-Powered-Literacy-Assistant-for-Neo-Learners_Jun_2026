import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdventureWorldMap, TreasureChest, StarRating } from '../UI/Illustrations';

interface AdventureMapProps {
  activeLevel: string;
  setActiveLevel: (l: string) => void;
}

const stages = [
  { id: 1, label: 'Stage 1', sub: 'Start Your Journey', emoji: '📖', color: '#5AD66F', shadow: 'rgba(90,214,111,0.5)', stars: 3, x: 23, y: 55, unlocked: true },
  { id: 2, label: 'Daily Challenge', sub: 'Unlocked', emoji: '⭐', color: '#FF4FA3', shadow: 'rgba(255,79,163,0.5)', stars: 0, x: 38, y: 58, unlocked: true },
  { id: 3, label: 'Stage 2', sub: 'Keep Going!', emoji: '🚀', color: '#4D9DFF', shadow: 'rgba(77,157,255,0.5)', stars: 0, x: 53, y: 58, unlocked: true },
  { id: 4, label: 'Stage 3', sub: 'New Adventures\nComing Soon!', emoji: '🔒', color: '#94A3B8', shadow: 'rgba(148,163,184,0.3)', stars: 0, x: 68, y: 65, unlocked: false },
];

export const AdventureMap: React.FC<AdventureMapProps> = ({ activeLevel, setActiveLevel }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'white',
      borderRadius: '22px',
      border: '1.5px solid #E8EFFF',
      padding: '16px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🗺️</span>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>
            Learning Adventure Map
          </h3>
        </div>

        {/* Level tabs */}
        <div style={{
          display: 'flex', gap: '4px',
          background: '#F6F8FF', padding: '4px', borderRadius: '99px',
          border: '1.5px solid #E8EFFF',
        }}>
          {[
            { name: 'Beginner', icon: '🔮' },
            { name: 'Intermediate', icon: '🗡️' },
            { name: 'Advanced', icon: '⚔️' }
          ].map((lvl, i) => {
            const active = activeLevel === lvl.name;
            return (
              <button
                key={i}
                onClick={() => setActiveLevel(lvl.name)}
                disabled={i > 0}
                style={{
                  padding: '5px 12px', borderRadius: '99px',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
                  cursor: i > 0 ? 'not-allowed' : 'pointer',
                  border: 'none',
                  background: active ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : 'transparent',
                  color: active ? 'white' : '#94A3B8',
                  boxShadow: active ? '0 4px 12px rgba(108,76,255,0.35)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                <span>{lvl.icon}</span>
                <span>{lvl.name}</span>
                {i > 0 && <span style={{ fontSize: '10px' }}>🔒</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAP WORLD */}
      <div style={{
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
        height: '270px',
        border: '2px solid #B0DCFF',
        boxShadow: 'inset 0 0 30px rgba(77,157,255,0.15)',
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
            className={stage.unlocked ? 'hover-lift' : ''}
            style={{
              position: 'absolute',
              left: `${stage.x}%`,
              top: `${stage.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: stage.unlocked ? 'pointer' : 'not-allowed',
              zIndex: 10,
            }}
          >
            {/* Stage circle */}
            <div className={stage.unlocked ? 'animate-bobble' : ''} style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: stage.unlocked
                ? `radial-gradient(circle at 35% 35%, ${stage.color}, ${stage.color}AA)`
                : 'radial-gradient(circle at 35% 35%, #94A3B8, #64748B)',
              border: '3px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              boxShadow: stage.unlocked
                ? `0 6px 18px ${stage.shadow}`
                : '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
            }}>
              {stage.emoji}
            </div>

            {/* Label bubble */}
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              borderRadius: '10px',
              padding: '3px 8px',
              textAlign: 'center',
              marginTop: '4px',
              border: `1.5px solid ${stage.unlocked ? stage.color + '66' : '#CBD5E1'}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-line',
            }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#1e1040', lineHeight: 1.1 }}>{stage.label}</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '8px', color: '#64748B', lineHeight: 1.1 }}>{stage.sub}</div>
              {stage.id === 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                  <StarRating count={3} max={3} size={10} />
                </div>
              )}
              {stage.id === 4 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                  <StarRating count={0} max={3} size={10} />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Treasure Chest (Grand Mission) */}
        <div
          className="hover-lift animate-bobble"
          onClick={() => navigate('/store')}
          style={{
            position: 'absolute',
            right: '8%', top: '56%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer', zIndex: 10,
          }}
        >
          <TreasureChest size={60} />
          <div style={{
            background: 'rgba(0,0,0,0.65)',
            color: 'white',
            fontFamily: 'Poppins', fontWeight: 800, fontSize: '9px',
            padding: '3px 8px', borderRadius: '8px',
            backdropFilter: 'blur(4px)',
            textAlign: 'center', marginTop: '2px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <div>Grand Mission</div>
            <div style={{ fontSize: '7.5px', opacity: 0.8, fontWeight: 600 }}>Complete to unlock</div>
          </div>
        </div>
      </div>
    </div>
  );
};
