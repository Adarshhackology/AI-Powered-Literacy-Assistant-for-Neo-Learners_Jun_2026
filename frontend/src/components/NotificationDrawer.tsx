import React, { useState } from 'react';
import { Bell, X, CheckCheck, Flame, Trophy, BookOpen, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearBadge: () => void;
}

interface NotificationItem {
  id: string;
  type: 'streak' | 'reward' | 'lesson' | 'goal';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
  bg: string;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose, onClearBadge }) => {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'default'
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'streak',
      title: '🔥 Keep Your Streak Active!',
      message: 'Practice for 5 minutes today to protect your 3-Day Streak!',
      time: '10 mins ago',
      read: false,
      icon: Flame,
      color: '#FF6B35',
      bg: '#FFF3E0',
    },
    {
      id: '2',
      type: 'reward',
      title: '🏆 XP & Coins Awarded!',
      message: 'You earned +50 XP and +10 Coins for completing the Reading Test!',
      time: '1 hour ago',
      read: false,
      icon: Trophy,
      color: '#FFD54A',
      bg: '#FFFDE7',
    },
    {
      id: '3',
      type: 'lesson',
      title: '📖 New AI Lesson Available!',
      message: 'Try the brand new lesson: "Space & Planets Phonics Drill".',
      time: '3 hours ago',
      read: false,
      icon: BookOpen,
      color: '#6C4CFF',
      bg: '#EDE7F6',
    },
    {
      id: '4',
      type: 'goal',
      title: '🎯 Daily Goal Progress',
      message: 'You are 80% close to reaching today\'s 15-minute learning target!',
      time: '5 hours ago',
      read: true,
      icon: Sparkles,
      color: '#10B981',
      bg: '#ECFDF5',
    },
  ]);

  if (!isOpen) return null;

  const handleEnablePush = async () => {
    if (!('Notification' in window)) {
      alert('Push notifications are not supported in this browser.');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm === 'granted') {
        new Notification('NeoLit Adventure 📖', {
          body: '🎉 Web Push Notifications Enabled! You will receive daily streak alerts.',
          icon: '/favicon.ico',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    onClearBadge();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex', justifyContent: 'flex-end',
      fontFamily: 'Nunito, sans-serif',
      animation: 'popIn 0.25s ease-out',
    }}>
      <div style={{
        maxWidth: '420px', width: '100%', height: '100vh',
        background: '#FFFFFF',
        boxShadow: '-8px 0 36px rgba(0, 0, 0, 0.15)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        zIndex: 100000,
      }}>

        {/* Top Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1.5px solid #F1F5F9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px',
              background: '#EFECFF', color: '#6C4CFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1E1040', margin: 0 }}>
                Notifications
              </h3>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B', margin: 0 }}>
                Daily alerts, streak reminders & rewards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#F1F5F9', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748B', cursor: 'pointer',
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Actions Bar */}
        <div style={{
          padding: '12px 24px',
          background: '#F8FAFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={markAllRead}
            style={{
              background: 'transparent', border: 'none',
              color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
            }}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>

          {permission !== 'granted' && (
            <button
              onClick={handleEnablePush}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
                color: 'white', border: 'none', borderRadius: '99px',
                padding: '5px 12px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Enable Push</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                style={{
                  background: n.read ? '#FFFFFF' : '#F8FAFF',
                  border: n.read ? '1.5px solid #F1F5F9' : `1.5px solid ${n.color}40`,
                  borderRadius: '20px',
                  padding: '14px 16px',
                  display: 'flex', gap: '14px',
                  position: 'relative',
                  boxShadow: n.read ? 'none' : '0 4px 14px rgba(108,76,255,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '14px',
                  background: n.bg, color: n.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon className="w-5 h-5 stroke-[2.4]" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1E1040', margin: 0 }}>
                      {n.title}
                    </h4>
                    <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#94A3B8' }}>
                      {n.time}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.35 }}>
                    {n.message}
                  </p>
                </div>

                {!n.read && (
                  <span style={{
                    position: 'absolute', top: '14px', right: '14px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#FF4FA3',
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #F1F5F9',
          textAlign: 'center',
          fontSize: '11px', fontWeight: 700, color: '#94A3B8',
        }}>
          {permission === 'granted' ? (
            <span className="flex items-center justify-center gap-1.5 text-emerald-600 font-extrabold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Browser Push Notifications Active</span>
            </span>
          ) : (
            <span>Enable Push Notifications for real-time practice alerts</span>
          )}
        </div>
      </div>
    </div>
  );
};
