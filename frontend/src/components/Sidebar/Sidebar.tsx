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
        background: '#FFFFFF',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        border: '1.5px solid #EAECF5',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 16px 14px',
          borderBottom: '1px solid #F1F5F9',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <div
          className="animate-bobble"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FF4FA3 0%, #FF6B35 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 6px 16px rgba(255,79,163,0.35)',
          }}
        >
          <Sparkles size={22} color="white" fill="white" />
        </div>
        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1E1040', lineHeight: 1 }}>NeoLit</div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: '#6C4CFF', letterSpacing: '1.5px', marginTop: '2px' }}>GAME</div>
        </div>
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                padding: '10px 12px',
                borderRadius: '14px',
                textDecoration: 'none',
                background: isActive ? '#EFECFF' : 'transparent',
                color: isActive ? '#6C4CFF' : '#64748B',
                fontWeight: isActive ? 800 : 600,
                fontSize: '13.5px',
                fontFamily: 'Poppins',
                border: isActive ? '1px solid #DCE6FF' : '1px solid transparent',
                transition: 'all 0.18s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '10px',
                    flexShrink: 0,
                    background: isActive ? 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)' : '#F1F5F9',
                    color: isActive ? 'white' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={15} strokeWidth={2.4} />
                </div>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{
                    background: 'linear-gradient(135deg,#FF4FA3,#FF6B35)',
                    color: 'white',
                    fontSize: '8.5px',
                    fontWeight: 900,
                    padding: '2px 7px',
                    borderRadius: '99px',
                    letterSpacing: '0.5px',
                    marginLeft: '6px',
                  }}
                >
                  {item.badge}
                </span>
              )}
              {isActive && <span style={{ color: '#6C4CFF', fontSize: '14px', marginLeft: '6px' }}>›</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Dragon Mascot Card */}
      <div className="dashboard-sidebar-promo" style={{ padding: '12px', position: 'relative' }}>
        <div
          style={{
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #F0F4FF 0%, #E8EFFF 100%)',
            border: '1px solid #DCE6FF',
            padding: '14px 10px 10px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div className="animate-bobble" style={{ display: 'inline-block' }}>
            <DragonMascot size={60} />
          </div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1E1040', marginTop: '4px' }}>
            You Are Amazing! 🌟
          </div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#6C4CFF', marginTop: '2px' }}>
            Keep learning every day
          </div>
        </div>
      </div>
    </aside>
  );
};
