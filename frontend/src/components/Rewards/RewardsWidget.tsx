import React from 'react';
import { Link } from 'react-router-dom';
import { TreasureChest, CoinSVG } from '../UI/Illustrations';

export const RewardsWidget: React.FC = () => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '24px',
      border: '2px solid #E8EFFF',
      padding: '20px',
      boxShadow: '0 8px 28px rgba(108,76,255,0.1)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🎁</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040' }}>Rewards Store</span>
        </div>
        <Link to="/store" style={{
          fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
          color: '#FF9F43', textDecoration: 'none',
          background: '#FFF3E0', padding: '4px 12px',
          borderRadius: '99px', border: '1.5px solid #FFCC80',
        }}>
          View All →
        </Link>
      </div>

      {/* Chest + progress */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF8DC, #FFFDE7)',
        borderRadius: '18px',
        padding: '14px',
        border: '2px solid #FFE082',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div className="animate-bobble">
          <TreasureChest size={56} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#795548', marginBottom: '6px' }}>
            Earn coins to unlock amazing rewards!
          </div>
          {/* Progress */}
          <div style={{
            height: '10px', borderRadius: '99px',
            background: '#FFE082',
            overflow: 'hidden', marginBottom: '4px',
          }}>
            <div style={{
              height: '100%', width: '16%',
              background: 'linear-gradient(90deg, #FFD54A, #FF9F43)',
              borderRadius: '99px',
              boxShadow: '0 2px 8px rgba(255,159,67,0.5)',
              position: 'relative',
            }}>
              <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, borderRadius: '99px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CoinSVG size={14} />
            <span style={{ fontFamily: 'Baloo 2', fontWeight: 800, fontSize: '12px', color: '#E65100' }}>80 / 500 Coins</span>
          </div>
        </div>
      </div>

      {/* Quick reward items */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        {['🎭 Avatar', '🏰 Theme', '🌈 Effect', '⚡ Boost'].map((item, i) => (
          <div key={i} style={{
            flex: 1,
            background: '#F6F8FF',
            borderRadius: '12px',
            padding: '8px 4px',
            textAlign: 'center',
            border: '1.5px solid #E8EFFF',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }} className="hover-lift">
            <div style={{ fontSize: '16px', marginBottom: '2px' }}>{item.split(' ')[0]}</div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '9px', color: '#6B7280' }}>
              {item.split(' ')[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
