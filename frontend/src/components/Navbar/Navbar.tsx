import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2,
  Bell,
  ChevronDown,
  Download,
  Globe,
  LogOut,
  Mic,
  Search,
  Settings,
  User,
  Smartphone,
} from 'lucide-react';
import { CoinSVG, XPGem, FireSVG } from '../UI/Illustrations';
import { ProfileData } from '../../data/dashboardData';
import { DownloadAppModal } from '../DownloadAppModal';
import { NotificationDrawer } from '../NotificationDrawer';

interface NavbarProps {
  profile: ProfileData;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const menuButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  borderRadius: '10px',
  border: 'none',
  background: 'transparent',
  color: '#334155',
  fontFamily: 'Poppins',
  fontWeight: 800,
  fontSize: '12px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  transition: 'all 0.15s ease',
};

export const Navbar: React.FC<NavbarProps> = ({ profile, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('preferredLanguage');
    navigate('/login');
  };

  const username = localStorage.getItem('username') || '';
  const userStr = localStorage.getItem('user');
  let isAdmin = username.toLowerCase() === 'admin' || username.toLowerCase() === 'superadmin';
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.is_staff || user.is_superuser || user.role === 'admin') isAdmin = true;
    } catch (e) {
      console.error(e);
    }
  }

  const displayName =
    !profile.fullName || profile.fullName.toUpperCase() === 'GOOGLE_USER' || profile.fullName.toUpperCase() === 'GUEST'
      ? 'Guest Learner'
      : profile.fullName;

  return (
    <>
      <header
        className="dashboard-navbar"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '14px',
          border: '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          gap: '12px',
          position: 'relative',
          zIndex: 40,
        }}
      >
        <div
          className="dashboard-search"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F6F8FF',
            border: '1.5px solid #E8EFFF',
            borderRadius: '99px',
            padding: '7px 10px 7px 14px',
            flex: 1,
            maxWidth: '430px',
          }}
        >
          <Search size={16} color="#64748B" strokeWidth={2.6} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search lessons, games, and words..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: '13px',
              color: '#374151',
              width: '100%',
              minWidth: 0,
            }}
          />
          <button
            aria-label="Voice search"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '99px',
              flexShrink: 0,
              background: 'linear-gradient(135deg,#6C4CFF,#8A5CFF)',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(108,76,255,0.4)',
              cursor: 'pointer',
            }}
          >
            <Mic size={15} strokeWidth={2.6} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }} ref={dropdownRef}>
          {/* Download App Action Button */}
          <button
            onClick={() => setShowDownloadModal(true)}
            className="btn-3d hover-lift"
            style={{
              background: 'linear-gradient(135deg, #6C4CFF 0%, #FF4FA3 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '99px',
              padding: '6px 14px',
              fontFamily: 'Poppins',
              fontWeight: 900,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(108,76,255,0.3)',
              cursor: 'pointer',
            }}
          >
            <Smartphone size={15} strokeWidth={2.6} />
            <span>Download App</span>
          </button>

          <div
            className="hover-lift desktop-only-flex"
            style={{
              alignItems: 'center',
              gap: '5px',
              background: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)',
              border: '1.5px solid #FFCC80',
              borderRadius: '99px',
              padding: '6px 12px',
              boxShadow: '0 3px 10px rgba(255,159,67,0.2)',
            }}
          >
            <div className="animate-heartbeat"><FireSVG size={18} /></div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#E65100', whiteSpace: 'nowrap' }}>
              {profile.streak} Day Streak
            </span>
          </div>

          <div
            className="hover-lift desktop-only-flex"
            style={{
              alignItems: 'center',
              gap: '5px',
              background: 'linear-gradient(135deg,#FFFDE7,#FFF9C4)',
              border: '1.5px solid #FFE082',
              borderRadius: '99px',
              padding: '6px 12px',
              boxShadow: '0 3px 10px rgba(255,213,74,0.2)',
            }}
          >
            <CoinSVG size={20} />
            <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '13px', color: '#E65100', whiteSpace: 'nowrap' }}>
              {profile.coins} Coins
            </span>
          </div>

          <div
            className="hover-lift desktop-only-flex"
            style={{
              alignItems: 'center',
              gap: '5px',
              background: 'linear-gradient(135deg,#EDE7F6,#D8D0F0)',
              border: '1.5px solid #C4B5F4',
              borderRadius: '99px',
              padding: '6px 12px',
              boxShadow: '0 3px 10px rgba(108,76,255,0.15)',
            }}
          >
            <XPGem size={20} />
            <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '13px', color: '#4527A0', whiteSpace: 'nowrap' }}>
              {profile.xp} XP
            </span>
          </div>

          {/* Interactive Notifications Button */}
          <button
            onClick={() => setShowNotifications(true)}
            aria-label="Notifications"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: '#F6F8FF',
              border: '1.5px solid #E8EFFF',
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Bell size={17} color="#6C4CFF" strokeWidth={2.6} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#FF4FA3',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  fontSize: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

        <div
          className="hover-lift"
          onClick={() => setShowMenu(!showMenu)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: showMenu ? '#EDE7F6' : '#F6F8FF',
            border: showMenu ? '1.5px solid #6C4CFF' : '1.5px solid #E8EFFF',
            borderRadius: '99px',
            padding: '4px 12px 4px 4px',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            maxWidth: '230px',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#6C4CFF,#FF4FA3)',
              border: '2px solid white',
              overflow: 'hidden',
              boxShadow: '0 3px 10px rgba(108,76,255,0.35)',
              flexShrink: 0,
            }}
          >
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || 'Guest'}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#1e1040', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#8A5CFF' }}>Level {profile.level || 1}</div>
          </div>
          <ChevronDown style={{ width: '14px', height: '14px', color: '#6C4CFF', transform: showMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
        </div>

        {showMenu && (
          <div
            style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              width: '230px',
              background: 'white',
              borderRadius: '14px',
              border: '1.5px solid #E8EFFF',
              boxShadow: '0 12px 40px rgba(108,76,255,0.2)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 100,
            }}
          >
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>{displayName}</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B' }}>Level {profile.level} Learner</div>
            </div>

            <button onClick={() => { setShowMenu(false); navigate('/profile-setup'); }} style={menuButtonStyle}>
              <User style={{ width: '16px', height: '16px', color: '#6C4CFF' }} />
              <span>Edit Profile</span>
            </button>
            <button onClick={() => { setShowMenu(false); navigate('/reports'); }} style={menuButtonStyle}>
              <BarChart2 style={{ width: '16px', height: '16px', color: '#4D9DFF' }} />
              <span>My Progress & Reports</span>
            </button>
            <button onClick={() => { setShowMenu(false); navigate('/learn-with-ai/language'); }} style={menuButtonStyle}>
              <Globe style={{ width: '16px', height: '16px', color: '#5AD66F' }} />
              <span>Change Language</span>
            </button>

            {isAdmin && (
              <button onClick={() => { setShowMenu(false); navigate('/admin'); }} style={menuButtonStyle}>
                <Settings style={{ width: '16px', height: '16px', color: '#FF9F43' }} />
                <span>Admin Console</span>
              </button>
            )}

            <div style={{ height: '1px', background: '#F1F5F9', margin: '4px 0' }} />
            <button onClick={handleLogout} style={{ ...menuButtonStyle, background: '#FEF2F2', color: '#EF4444', fontWeight: 900 }}>
              <LogOut style={{ width: '16px', height: '16px', color: '#EF4444' }} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </header>

    {/* Download App Modal */}
    <DownloadAppModal
      isOpen={showDownloadModal}
      onClose={() => setShowDownloadModal(false)}
    />

    {/* Notification Drawer */}
    <NotificationDrawer
      isOpen={showNotifications}
      onClose={() => setShowNotifications(false)}
      onClearBadge={() => setUnreadCount(0)}
    />
    </>
  );
};
