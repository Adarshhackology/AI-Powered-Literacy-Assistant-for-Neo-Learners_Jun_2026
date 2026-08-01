import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RobotMascot, AIRobotMascot, Rocket, Sparkle, StarCluster } from '../UI/Illustrations';
import { ProfileData } from '../../data/dashboardData';

interface HeroBannerProps {
  profile: ProfileData;
  lessons: any[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>

      {/* ── CARD 1: Welcome Super Learner Mode ── */}
      <div
        className="hover-lift"
        style={{
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #FF4FA3 0%, #8A5CFF 50%, #6C4CFF 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 8s ease infinite',
          padding: '28px 28px 24px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '210px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 60px rgba(255,79,163,0.35), 0 8px 24px rgba(108,76,255,0.2)',
          border: '3px solid rgba(255,255,255,0.25)',
          borderBottom: '6px solid rgba(0,0,0,0.25)',
        }}
      >
        {/* Star cluster background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.3, pointerEvents: 'none' }}>
          <StarCluster />
        </div>

        {/* Rocket ship decoration (top right) */}
        <div className="animate-float" style={{ position: 'absolute', right: '120px', top: '-10px', opacity: 0.6, pointerEvents: 'none' }}>
          <Rocket size={55} />
        </div>

        {/* Sparkle decorations */}
        <div className="animate-twinkle" style={{ position: 'absolute', right: '30px', top: '20px' }}>
          <Sparkle size={28} color="rgba(255,255,255,0.5)" />
        </div>
        <div className="animate-twinkle" style={{ position: 'absolute', left: '160px', bottom: '20px', animationDelay: '0.8s' }}>
          <Sparkle size={20} color="rgba(255,213,74,0.6)" />
        </div>

        {/* Main content row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', position: 'relative', zIndex: 2 }}>
          {/* Robot Mascot */}
          <div className="animate-bobble" style={{
            width: '110px', height: '110px', flexShrink: 0,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '3px solid rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}>
            <RobotMascot size={100} />
          </div>

          <div style={{ flex: 1 }}>
            {/* Ribbon */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#FFD54A',
              color: '#1e1040',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              padding: '5px 14px', borderRadius: '99px',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 12px rgba(255,213,74,0.5)',
              marginBottom: '10px',
            }}>
              <span>⭐</span> SUPER LEARNER MODE
            </div>

            {/* Welcome text */}
            <h2 style={{
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px',
              margin: '0 0 6px', lineHeight: 1.25, color: 'white',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              आपका स्वागत है,<br />{profile.fullName}! 🎉
            </h2>
            <p style={{
              margin: 0, fontWeight: 700, fontSize: '13px',
              color: 'rgba(255,255,255,0.85)', lineHeight: 1.5,
              maxWidth: '320px',
            }}>
              Let's play and learn! Unlock new stages, earn rewards and become a superstar! 🌟
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ position: 'relative', zIndex: 2, paddingLeft: '128px' }}>
          <button
            onClick={() => navigate('/lesson/1')}
            className="btn-3d"
            style={{
              background: '#FFD54A',
              color: '#1e1040',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
              padding: '12px 28px', borderRadius: '16px',
              border: '3px solid rgba(255,255,255,0.4)',
              borderBottom: '5px solid #E8A000',
              boxShadow: '0 8px 24px rgba(255,213,74,0.5)',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span>🎮</span> Start Adventure
          </button>
        </div>
      </div>

      {/* ── CARD 2: AI Tutor Card ── */}
      <div
        className="hover-lift"
        style={{
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #1e1040 0%, #2D1B69 40%, #4D2FCC 80%, #6C4CFF 100%)',
          padding: '26px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '210px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 60px rgba(77,47,204,0.45), 0 8px 24px rgba(108,76,255,0.3)',
          border: '3px solid rgba(255,255,255,0.12)',
          borderBottom: '6px solid rgba(0,0,0,0.35)',
        }}
      >
        {/* Orbiting dots decoration */}
        {[0,60,120,180,240,300].map((deg, i) => (
          <div key={i} className="animate-spin-slow" style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '160px', height: '160px',
            marginLeft: '-80px', marginTop: '-80px',
            animationDuration: `${12 + i*2}s`,
          }}>
            <div style={{
              position: 'absolute',
              top: `${50 - 48*Math.sin(deg*Math.PI/180)}%`,
              left: `${50 + 48*Math.cos(deg*Math.PI/180)}%`,
              width: `${4 + i % 3 * 2}px`, height: `${4 + i % 3 * 2}px`,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#FFD54A' : i % 3 === 1 ? '#FF4FA3' : '#5AD66F',
              opacity: 0.4,
            }} />
          </div>
        ))}

        {/* Sparkles */}
        <div className="animate-twinkle" style={{ position: 'absolute', right: '20px', top: '16px' }}>
          <Sparkle size={22} color="rgba(255,213,74,0.6)" />
        </div>

        {/* AI Robot */}
        <div className="animate-float" style={{
          position: 'absolute', right: '12px', top: '-8px',
          width: '110px', height: '110px',
        }}>
          <AIRobotMascot size={110} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: '220px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(77,157,255,0.2)',
            border: '1px solid rgba(77,157,255,0.4)',
            color: '#FFD54A',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
            padding: '4px 12px', borderRadius: '99px',
            letterSpacing: '1px',
            marginBottom: '10px',
          }}>
            🤖 AI TUTOR
          </div>
          <h3 style={{
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px',
            margin: '0 0 8px', lineHeight: 1.2, color: 'white',
          }}>
            Learn with<br />AI Tutor 🤖
          </h3>
          <p style={{
            margin: 0, fontWeight: 700, fontSize: '12px',
            color: 'rgba(255,255,255,0.7)', lineHeight: 1.5,
          }}>
            Personalized lessons, instant help & fun practice! ✨
          </p>
        </div>

        {/* CTA */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <button
            onClick={() => navigate('/learn-with-ai')}
            className="btn-3d"
            style={{
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              color: 'white',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
              padding: '11px 24px', borderRadius: '14px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderBottom: '5px solid rgba(0,0,0,0.3)',
              boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span style={{ animation: 'spin 3s linear infinite', display: 'inline-block' }}>✨</span>
            Start AI Tutor 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
