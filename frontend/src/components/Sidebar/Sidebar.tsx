import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Brain,
  Gamepad2,
  Gauge,
  Gift,
  Settings,
  Shield,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { DragonMascot } from '../UI/Illustrations';

const allNavItems = [
  { to: '/dashboard', icon: Gauge, label: 'Dashboard' },
  { to: '/learn-with-ai', icon: Brain, label: 'Learn with AI', badge: 'NEW' },
  { to: '/games', icon: Gamepad2, label: 'Learn Games', badge: 'HOT' },
  { to: '/vocabulary', icon: BookOpen, label: 'Sticker Book' },
  { to: '/reports', icon: BarChart3, label: 'My Progress' },
  { to: '/store', icon: Gift, label: 'Rewards Store' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/reports', icon: Shield, label: 'My Badges' },
  { to: '/admin', icon: Settings, label: 'Admin Desk', adminOnly: true },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const username = localStorage.getItem('username') || '';
  const userStr = localStorage.getItem('user');
  let isAdmin = username.toLowerCase() === 'admin' || username.toLowerCase() === 'superadmin';

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.is_staff || user.is_superuser || user.role === 'admin') {
        isAdmin = true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const navItems = allNavItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <aside
      className="dashboard-sidebar"
      style={{
        background: 'linear-gradient(180deg, #3D1D99 0%, #2D1278 50%, #1E0A5E 100%)',
        borderRadius: '18px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        border: '1.5px solid rgba(255,255,255,0.12)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(140,80,255,0.3) 0%, transparent 60%)',
        }}
      />

      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '18px 16px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <div
          className="animate-bobble"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FFD54A 0%, #FF9F43 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 6px 18px rgba(255,159,67,0.5)',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          <Sparkles size={24} color="#1e1040" fill="#1e1040" />
        </div>
        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1 }}>NeoLit</div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: '#FFD54A', letterSpacing: '2px' }}>GAME</div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={`${item.label}-${i}`}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '12px',
                textDecoration: 'none',
                background: isActive ? 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)' : 'transparent',
                color: isActive ? 'white' : 'rgba(255,255,255,0.75)',
                fontWeight: 700,
                fontSize: '13px',
                fontFamily: 'Nunito',
                border: isActive ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid transparent',
                boxShadow: isActive ? '0 6px 20px rgba(108,76,255,0.45)' : 'none',
                transition: 'all 0.18s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '99px',
                    flexShrink: 0,
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={16} strokeWidth={2.6} />
                </div>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{
                    background: 'linear-gradient(135deg,#FF4FA3,#FF6B35)',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '99px',
                    letterSpacing: '0.5px',
                    marginLeft: '6px',
                  }}
                >
                  {item.badge}
                </span>
              )}
              {isActive && <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginLeft: '6px' }}>›</span>}
            </Link>
          );
        })}
      </nav>

      <div className="dashboard-sidebar-promo" style={{ padding: '12px', position: 'relative' }}>
        <div
          style={{
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(108,76,255,0.3), rgba(77,47,204,0.2))',
            border: '1.5px solid rgba(255,255,255,0.12)',
            padding: '12px 10px 8px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div className="animate-bobble" style={{ display: 'inline-block' }}>
            <DragonMascot size={64} />
          </div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: 'white', marginTop: '4px' }}>
            You Are Amazing!
          </div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#FFD54A', marginTop: '2px' }}>
            Keep learning every day
          </div>
        </div>
      </div>
    </aside>
  );
};
