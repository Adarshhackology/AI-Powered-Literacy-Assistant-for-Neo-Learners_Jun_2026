import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RobotMascot, AIRobotMascot } from '../UI/Illustrations';
import { ProfileData } from '../../data/dashboardData';

interface HeroBannerProps {
  profile: ProfileData;
  lessons?: any[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '14px' }}>

      {/* ── LEFT: Super Learner Mode ── */}
      <div style={{
        borderRadius: '22px',
        background: 'linear-gradient(135deg, #FF3D87 0%, #D94FFF 40%, #7B3FD4 80%, #5B2AB0 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
        padding: '0',
        overflow: 'hidden',
        minHeight: '190px',
        position: 'relative',
        boxShadow: '0 16px 48px rgba(180,0,120,0.35), 0 4px 16px rgba(108,76,255,0.2)',
        border: '2px solid rgba(255,255,255,0.2)',
        display: 'flex',
      }}>
        {/* Floating stars bg */}
        {[[8,12],[35,18],[78,8],[88,40],[20,72],[70,65],[50,35]].map(([l,t],i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', left: `${l}%`, top: `${t}%`,
            fontSize: `${8 + i%3*4}px`, color: '#FFD54A',
            opacity: 0.7, animationDelay: `${i*0.3}s`, pointerEvents: 'none',
          }}>✦</div>
        ))}

        {/* Robot mascot (LEFT side) */}
        <div className="animate-float" style={{
          position: 'absolute', left: '12px', bottom: '0',
          width: '140px', height: '155px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          <RobotMascot size={130} />
        </div>

        {/* Rocket decoration */}
        <div style={{
          position: 'absolute', right: '14px', top: '16px',
          fontSize: '42px', transform: 'rotate(-30deg)',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          pointerEvents: 'none',
        }}>🚀</div>

        {/* Text content */}
        <div style={{ paddingLeft: '162px', paddingRight: '60px', paddingTop: '16px', paddingBottom: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Badge */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: '#FFD54A', color: '#1e1040',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
              padding: '4px 12px', borderRadius: '99px',
              letterSpacing: '0.5px', marginBottom: '10px',
              boxShadow: '0 3px 10px rgba(255,213,74,0.5)',
            }}>
              ⭐ SUPER LEARNER MODE
            </div>

            <h2 style={{
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px',
              color: 'white', margin: '0 0 6px', lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}>
              आपका स्वागत है,<br />{profile.fullName}! 👋
            </h2>
            <p style={{
              fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px',
              color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5,
            }}>
              Let's play and learn! Unlock new stages,<br />earn rewards and become a superstar! ⭐
            </p>
          </div>

          {/* CTA */}
          <button onClick={() => navigate('/lesson/1')} className="btn-3d" style={{
            background: '#FFD54A', color: '#1e1040',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
            padding: '11px 22px', borderRadius: '14px', border: 'none',
            borderBottom: '4px solid #C8960E',
            boxShadow: '0 6px 20px rgba(255,213,74,0.5)',
            cursor: 'pointer', width: 'fit-content',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            🎮 Start Adventure
          </button>
        </div>
      </div>

      {/* ── RIGHT: AI Tutor Card ── */}
      <div style={{
        borderRadius: '22px',
        background: 'linear-gradient(135deg, #1A1060 0%, #2A1880 35%, #1E48CC 75%, #3A7AFF 100%)',
        padding: '0',
        overflow: 'hidden',
        minHeight: '190px',
        position: 'relative',
        boxShadow: '0 16px 48px rgba(40,20,180,0.4)',
        border: '2px solid rgba(255,255,255,0.15)',
        display: 'flex',
      }}>
        {/* Stars */}
        {[[8,10],[20,70],[40,85],[80,15],[90,55]].map(([l,t],i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', left: `${l}%`, top: `${t}%`,
            fontSize: `${7+i%3*5}px`, color: '#FFD54A',
            opacity: 0.6, animationDelay: `${i*0.4}s`, pointerEvents: 'none',
          }}>✦</div>
        ))}

        {/* AI Robot (right side) */}
        <div className="animate-float" style={{
          position: 'absolute', right: '6px', bottom: '0',
          height: '175px', width: '150px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          <AIRobotMascot size={130} />
        </div>

        {/* Text content */}
        <div style={{ padding: '16px 150px 16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* AI badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'rgba(77,157,255,0.25)', color: '#FFD54A',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
              padding: '4px 12px', borderRadius: '99px',
              border: '1px solid rgba(77,157,255,0.4)',
              letterSpacing: '0.5px', marginBottom: '10px',
            }}>
              🤖 AI TUTOR
            </div>

            <h3 style={{
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px',
              color: 'white', margin: '0 0 8px', lineHeight: 1.2,
            }}>
              Learn with AI Tutor 🤖
            </h3>
            <p style={{
              fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px',
              color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.5,
            }}>
              Personalized lessons, instant help, and fun<br />practice made just for you! ✨
            </p>
          </div>

          {/* CTA */}
          <button onClick={() => navigate('/learn-with-ai')} className="btn-3d" style={{
            background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
            color: 'white',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
            padding: '11px 22px', borderRadius: '14px', border: 'none',
            borderBottom: '4px solid rgba(0,0,0,0.3)',
            boxShadow: '0 6px 20px rgba(108,76,255,0.5)',
            cursor: 'pointer', width: 'fit-content',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            Start AI Tutor 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
