import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragonMascot, CoinSVG, XPCrystal, Sparkle } from '../UI/Illustrations';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard', active: true, color: '#6C4CFF' },
    { to: '/learn-with-ai', icon: '🧠', label: 'Learn with AI', badge: 'NEW', color: '#FF4FA3' },
    { to: '/learn-with-ai', icon: '🎯', label: 'Today\'s Goal', color: '#FF9F43' },
    { to: '/vocabulary', icon: '🎨', label: 'Sticker Book', color: '#5AD66F' },
    { to: '/reports', icon: '📊', label: 'My Progress', color: '#4D9DFF' },
    { to: '/store', icon: '🎁', label: 'Rewards Store', color: '#FFD54A' },
    { to: '/leaderboard', icon: '🏆', label: 'Leaderboard', color: '#FFD54A' },
    { to: '/reports', icon: '🛡️', label: 'My Badges', color: '#8A5CFF' },
    { to: '/admin', icon: '⚙️', label: 'Admin Desk', color: '#94A3B8' },
  ];

  return (
    <aside
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(30px)',
        border: '2px solid #E8EFFF',
        borderRadius: '28px',
        boxShadow: '0 20px 60px rgba(108,76,255,0.12), 0 4px 16px rgba(108,76,255,0.06)',
        width: '270px',
        minWidth: '270px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >

      {/* Scrollable Top */}
      <div style={{ padding: '20px 16px 0', flex: 1, overflowY: 'auto' }}>
        {/* Animated Logo */}
        <div
          className="hover-lift"
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 10px 16px',
            cursor: 'pointer',
            borderBottom: '2px solid #F0F4FF',
            marginBottom: '14px',
          }}
        >
          <div
            className="animate-bobble"
            style={{
              width: '48px', height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FFD54A 0%, #FF9F43 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px',
              boxShadow: '0 8px 20px rgba(255,159,67,0.4)',
              border: '3px solid rgba(255,255,255,0.8)',
            }}
          >
            ⭐
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1e1040', lineHeight: 1.1 }}>NeoLit</div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', color: '#FF9F43', letterSpacing: '2px', textTransform: 'uppercase' }}>Game</div>
          </div>
          <div className="animate-twinkle" style={{ marginLeft: 'auto' }}>
            <Sparkle size={18} color="#FFD54A" />
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={item.active ? 'animate-pulse-glow' : 'hover-lift'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                background: item.active
                  ? 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)'
                  : 'transparent',
                color: item.active ? 'white' : '#4B5563',
                fontWeight: 700,
                fontSize: '14px',
                border: item.active ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                boxShadow: item.active ? '0 8px 24px rgba(108,76,255,0.35)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px', height: '34px',
                    borderRadius: '10px',
                    background: item.active ? 'rgba(255,255,255,0.2)' : `${item.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  {item.icon}
                </div>
                <span style={{ fontFamily: 'Nunito' }}>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  background: 'linear-gradient(135deg, #FF4FA3, #FF6B35)',
                  color: 'white', fontSize: '9px', fontWeight: 900,
                  padding: '2px 7px', borderRadius: '99px',
                  letterSpacing: '0.5px', fontFamily: 'Poppins',
                  animation: 'pulse 2s infinite',
                }}>
                  {item.badge}
                </span>
              )}
              {item.active && (
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '12px',
                }}>›</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Fixed Section */}
      <div style={{ padding: '12px 16px 16px', borderTop: '2px solid #F0F4FF', background: 'rgba(248,250,255,0.8)' }}>
        {/* Dragon Mascot Card */}
        <div
          style={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #6C4CFF 0%, #9B59B6 50%, #4D9DFF 100%)',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(108,76,255,0.3)',
          }}
        >
          {/* Background sparkles */}
          <div style={{ position: 'absolute', top: '4px', right: '4px' }}><Sparkle size={14} color="rgba(255,255,255,0.4)" /></div>
          <div style={{ position: 'absolute', bottom: '6px', right: '20px' }}><Sparkle size={10} color="rgba(255,213,74,0.5)" /></div>
          
          <div className="animate-bobble" style={{ width: '52px', height: '52px', flexShrink: 0 }}>
            <DragonMascot size={52} />
          </div>
          <div>
            <div style={{
              background: 'white', color: '#1e1040',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              padding: '3px 10px', borderRadius: '99px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              You Are Amazing! 🌟
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontWeight: 600, marginTop: '4px', fontFamily: 'Nunito' }}>
              Keep up the great work!
            </div>
          </div>
        </div>

        {/* Daily Tip Card */}
        <div
          style={{
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #4D2FCC 0%, #1e1040 100%)',
            padding: '12px 14px',
            boxShadow: '0 4px 12px rgba(77,47,204,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px' }}>💡</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#FFD54A', letterSpacing: '0.5px' }}>Daily Tip</span>
          </div>
          <p style={{ color: '#C4B5F4', fontWeight: 700, fontSize: '11px', margin: 0, lineHeight: 1.5 }}>
            Small steps today, big dreams tomorrow! 🌟
          </p>
        </div>
      </div>
    </aside>
  );
};
