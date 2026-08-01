import React from 'react';
import { Link } from 'react-router-dom';
import { CoinSVG } from '../UI/Illustrations';

export const RewardsWidget: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      border: '1.5px solid #E8EFFF',
      padding: '14px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '18px' }}>🎁</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>Rewards Store</span>
        </div>
        <Link to="/store" style={{
          fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px',
          color: '#6C4CFF', textDecoration: 'none',
        }}>
          View All
        </Link>
      </div>

      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B', marginBottom: '8px' }}>
        Earn XP and coins to unlock exciting rewards!
      </div>

      {/* Gift Box Graphic + Coins progress */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: '#F8FAFF', borderRadius: '14px', padding: '10px 12px',
        border: '1px solid #E8EFFF',
      }}>
        {/* Gift Box with Bow Graphic */}
        <div style={{ position: 'relative', width: '48px', height: '44px', flexShrink: 0 }}>
          {/* Gift Box */}
          <div style={{
            position: 'absolute', bottom: 0, left: '4px', width: '40px', height: '32px',
            background: 'linear-gradient(135deg, #FF4FA3, #E83E8C)',
            borderRadius: '6px', boxShadow: '0 4px 10px rgba(255,79,163,0.3)',
          }} />
          {/* Ribbon vertical */}
          <div style={{
            position: 'absolute', bottom: 0, left: '20px', width: '8px', height: '32px',
            background: '#FFD54A',
          }} />
          {/* Lid */}
          <div style={{
            position: 'absolute', top: '8px', left: '2px', width: '44px', height: '10px',
            background: '#FF6B35', borderRadius: '3px',
          }} />
          {/* Ribbon on lid */}
          <div style={{
            position: 'absolute', top: '8px', left: '20px', width: '8px', height: '10px',
            background: '#FFD54A',
          }} />
          {/* Bow */}
          <circle cx="18" cy="6" r="5" fill="#FFD54A" />
          <circle cx="30" cy="6" r="5" fill="#FFD54A" />
          <circle cx="24" cy="7" r="3" fill="#FFC107" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <CoinSVG size={14} />
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF' }}>
              80 / 500 Coins
            </span>
          </div>
          {/* Progress bar */}
          <div style={{
            height: '8px', borderRadius: '99px',
            background: '#E2E8F0',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: '16%',
              background: 'linear-gradient(90deg, #6C4CFF, #8A5CFF)',
              borderRadius: '99px',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};
