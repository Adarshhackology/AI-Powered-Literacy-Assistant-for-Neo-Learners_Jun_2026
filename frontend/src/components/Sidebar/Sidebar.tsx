import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragonMascot, Sparkle } from '../UI/Illustrations';

const navItems = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard', active: true },
  { to: '/learn-with-ai', icon: '🧠', label: 'Learn with AI', badge: 'NEW' },
  { to: '/learn-with-ai', icon: '🎯', label: 'आज के लक्ष्य' },
  { to: '/vocabulary', icon: '📚', label: 'Sticker Book' },
  { to: '/reports', icon: '📊', label: 'My Progress' },
  { to: '/store', icon: '🎁', label: 'Rewards Store' },
  { to: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
  { to: '/reports', icon: '🛡️', label: 'My Badges' },
  { to: '/admin', icon: '⚙️', label: 'Admin Desk' },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <aside style={{
      width: '220px',
      minWidth: '220px',
      background: 'linear-gradient(180deg, #3D1D99 0%, #2D1278 50%, #1E0A5E 100%)',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      border: '1.5px solid rgba(255,255,255,0.12)',
      position: 'relative',
    }}>
      {/* Subtle glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(140,80,255,0.3) 0%, transparent 60%)',
      }} />

      {/* Logo */}
      <div onClick={() => navigate('/')} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '18px 16px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer', position: 'relative',
      }}>
        <div className="animate-bobble" style={{
          width: '44px', height: '44px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #FFD54A 0%, #FF9F43 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0,
          boxShadow: '0 6px 18px rgba(255,159,67,0.5)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>⭐</div>
        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1 }}>NeoLit</div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: '#FFD54A', letterSpacing: '2px' }}>GAME</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {navItems.map((item, i) => (
          <Link key={i} to={item.to} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 12px', borderRadius: '14px', textDecoration: 'none',
            background: item.active ? 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)' : 'transparent',
            color: item.active ? 'white' : 'rgba(255,255,255,0.75)',
            fontWeight: 700, fontSize: '13px', fontFamily: 'Nunito',
            border: item.active ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid transparent',
            boxShadow: item.active ? '0 6px 20px rgba(108,76,255,0.45)' : 'none',
            transition: 'all 0.18s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '9px', flexShrink: 0,
                background: item.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px',
              }}>{item.icon}</div>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span style={{
                background: 'linear-gradient(135deg,#FF4FA3,#FF6B35)',
                color: 'white', fontSize: '8px', fontWeight: 900,
                padding: '2px 6px', borderRadius: '99px', letterSpacing: '0.5px',
              }}>{item.badge}</span>
            )}
            {item.active && (
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>›</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Dragon mascot + "You Are Amazing!" card */}
      <div style={{ padding: '12px', position: 'relative' }}>
        <div style={{
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(108,76,255,0.3), rgba(77,47,204,0.2))',
          border: '1.5px solid rgba(255,255,255,0.12)',
          padding: '12px 10px 8px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '8px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Stars bg */}
          <div style={{ position: 'absolute', top: '4px', right: '6px', fontSize: '12px', opacity: 0.6 }}>✦</div>
          <div style={{ position: 'absolute', top: '8px', left: '6px', fontSize: '9px', opacity: 0.5 }}>✦</div>

          <div className="animate-bobble" style={{ marginBottom: '-4px' }}>
            <DragonMascot size={88} />
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px', padding: '8px 12px', width: '100%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#FFD54A', marginBottom: '2px' }}>
              You Are Amazing! 🌟
            </div>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.4 }}>
              Small steps today,<br />big dreams tomorrow! ✦
            </p>
          </div>
        </div>
        {/* Daily tip */}
        <div style={{
          marginTop: '8px',
          background: 'rgba(255,213,74,0.12)',
          borderRadius: '12px', padding: '8px 10px',
          border: '1.5px solid rgba(255,213,74,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
            <span style={{ fontSize: '13px' }}>💡</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#FFD54A' }}>Daily Tip</span>
          </div>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4 }}>
            Small steps today, big dreams tomorrow! ✦
          </p>
        </div>
      </div>
    </aside>
  );
};
