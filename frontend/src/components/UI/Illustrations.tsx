import React from 'react';

// ═══════════════════════════════════════════════════════════
// NEOLIT ORIGINAL SVG ASSET LIBRARY — 100% match to reference
// ═══════════════════════════════════════════════════════════

// ── Cute Orange/Red Happy Robot (Hero Banner Left)
export const RobotMascot: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 130" fill="none" className={className}>
    <defs>
      <radialGradient id="rBodyGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF8C42" />
        <stop offset="100%" stopColor="#E8471A" />
      </radialGradient>
      <radialGradient id="rHeadGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF9F5A" />
        <stop offset="100%" stopColor="#E8571A" />
      </radialGradient>
      <radialGradient id="eyeGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#3D1A8C" />
        <stop offset="100%" stopColor="#1A0A40" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="60" cy="126" rx="32" ry="6" fill="rgba(0,0,0,0.2)" />
    {/* BODY */}
    <rect x="28" y="60" width="64" height="52" rx="16" fill="url(#rBodyGrad)" />
    {/* Body shine */}
    <ellipse cx="45" cy="72" rx="10" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-15 45 72)" />
    {/* Belly button panel */}
    <rect x="40" y="76" width="40" height="26" rx="10" fill="rgba(0,0,0,0.15)" />
    <rect x="43" y="79" width="34" height="20" rx="7" fill="rgba(255,255,255,0.1)" />
    {/* Heart indicator */}
    <path d="M 60 87 C 60 85 57 82 54 84 C 51 86 51 90 60 95 C 69 90 69 86 66 84 C 63 82 60 85 60 87 Z" fill="#FF4FA3" opacity="0.9" />
    {/* ARMS */}
    {/* Left arm (waving up) */}
    <rect x="8" y="55" width="20" height="34" rx="10" fill="url(#rBodyGrad)" transform="rotate(-30 8 55)" />
    {/* Left hand */}
    <circle cx="10" cy="52" r="10" fill="#FF9F5A" />
    <circle cx="4" cy="47" r="6" fill="#FF9F5A" />
    <circle cx="2" cy="41" r="5" fill="#FF9F5A" />
    <circle cx="7" cy="38" r="4" fill="#FF9F5A" />
    {/* Right arm */}
    <rect x="92" y="62" width="20" height="30" rx="10" fill="url(#rBodyGrad)" transform="rotate(10 92 62)" />
    <circle cx="108" cy="90" r="9" fill="#FF9F5A" />
    {/* FEET */}
    <rect x="36" y="106" width="20" height="16" rx="8" fill="#D44010" />
    <rect x="64" y="106" width="20" height="16" rx="8" fill="#D44010" />
    {/* Foot shine */}
    <ellipse cx="42" cy="111" rx="5" ry="2.5" fill="rgba(255,255,255,0.2)" />
    <ellipse cx="70" cy="111" rx="5" ry="2.5" fill="rgba(255,255,255,0.2)" />
    {/* HEAD */}
    <rect x="22" y="16" width="76" height="52" rx="22" fill="url(#rHeadGrad)" />
    {/* Head shine */}
    <ellipse cx="44" cy="25" rx="14" ry="7" fill="rgba(255,255,255,0.2)" transform="rotate(-10 44 25)" />
    {/* EYES (big happy round eyes) */}
    <circle cx="44" cy="40" r="12" fill="url(#eyeGrad)" />
    <circle cx="76" cy="40" r="12" fill="url(#eyeGrad)" />
    {/* Eye whites */}
    <circle cx="44" cy="40" r="9" fill="#1A0A40" />
    <circle cx="76" cy="40" r="9" fill="#1A0A40" />
    {/* Iris sparkle */}
    <circle cx="44" cy="40" r="5" fill="#5A3AFF" opacity="0.6" />
    <circle cx="76" cy="40" r="5" fill="#5A3AFF" opacity="0.6" />
    {/* Glint */}
    <circle cx="48" cy="36" r="3" fill="white" />
    <circle cx="80" cy="36" r="3" fill="white" />
    <circle cx="47" cy="44" r="1.5" fill="rgba(255,255,255,0.5)" />
    <circle cx="79" cy="44" r="1.5" fill="rgba(255,255,255,0.5)" />
    {/* Happy mouth */}
    <path d="M 47 52 Q 60 62 73 52" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Rosy cheeks */}
    <ellipse cx="34" cy="48" rx="7" ry="5" fill="#FF7750" opacity="0.5" />
    <ellipse cx="86" cy="48" rx="7" ry="5" fill="#FF7750" opacity="0.5" />
    {/* Ear circles */}
    <circle cx="22" cy="40" r="6" fill="#D44010" />
    <circle cx="98" cy="40" r="6" fill="#D44010" />
    {/* ANTENNA */}
    <rect x="56" y="4" width="8" height="16" rx="4" fill="#FF9F5A" />
    <circle cx="60" cy="4" r="8" fill="#FFD54A" />
    <circle cx="60" cy="4" r="5" fill="white" />
    <circle cx="62" cy="2" r="2" fill="#FFD54A" />
    {/* Stars around */}
    <text x="105" y="25" fontSize="14" fill="#FFD54A" opacity="0.9">✦</text>
    <text x="8" y="20" fontSize="10" fill="#FF4FA3" opacity="0.8">✦</text>
    <text x="100" y="60" fontSize="10" fill="#5AD66F" opacity="0.8">✦</text>
  </svg>
);

// ── White/Blue AI Tutor Robot (Hero Banner Right)
export const AIRobotMascot: React.FC<{ size?: number; className?: string }> = ({ size = 130, className = '' }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 130 143" fill="none" className={className}>
    <defs>
      <radialGradient id="aBodyGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D0E8FF" />
      </radialGradient>
      <radialGradient id="aHeadGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#C4DEFF" />
      </radialGradient>
      <radialGradient id="aEyeGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#5A9DFF" />
        <stop offset="100%" stopColor="#2460CC" />
      </radialGradient>
    </defs>
    <ellipse cx="65" cy="138" rx="32" ry="6" fill="rgba(0,0,0,0.15)" />
    {/* Body */}
    <rect x="26" y="62" width="78" height="58" rx="18" fill="url(#aBodyGrad)" stroke="#C4DEFF" strokeWidth="2" />
    <ellipse cx="50" cy="75" rx="12" ry="5" fill="rgba(255,255,255,0.6)" transform="rotate(-10 50 75)" />
    {/* Body screen */}
    <rect x="38" y="80" width="54" height="30" rx="10" fill="#1A2E6E" opacity="0.9" />
    <rect x="40" y="82" width="50" height="26" rx="8" fill="#0D1A4D" />
    {/* Screen content - face */}
    <circle cx="55" cy="95" r="5" fill="#FFD54A" />
    <circle cx="75" cy="95" r="5" fill="#4D9DFF" />
    <path d="M 52 103 Q 65 110 78 103" stroke="#5AD66F" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Arms */}
    <rect x="4" y="66" width="22" height="36" rx="11" fill="url(#aBodyGrad)" stroke="#C4DEFF" strokeWidth="1.5" />
    <rect x="104" y="66" width="22" height="36" rx="11" fill="url(#aBodyGrad)" stroke="#C4DEFF" strokeWidth="1.5" />
    {/* Book in left hand */}
    <rect x="2" y="98" width="26" height="20" rx="5" fill="#6C4CFF" />
    <rect x="2" y="98" width="4" height="20" rx="2" fill="#4D2FCC" />
    <rect x="8" y="102" width="14" height="1.5" rx="0.75" fill="rgba(255,255,255,0.5)" />
    <rect x="8" y="105" width="11" height="1.5" rx="0.75" fill="rgba(255,255,255,0.4)" />
    <rect x="8" y="108" width="13" height="1.5" rx="0.75" fill="rgba(255,255,255,0.3)" />
    {/* Big text on book */}
    <text x="9" y="115" fontSize="6" fontWeight="900" fill="white" fontFamily="Poppins">BIG</text>
    <text x="6" y="122" fontSize="5" fontWeight="700" fill="rgba(255,255,255,0.7)" fontFamily="Poppins">DREAMS</text>
    {/* Pencil in right hand */}
    <rect x="116" y="94" width="6" height="28" rx="3" fill="#FFD54A" transform="rotate(15 116 94)" />
    <polygon points="118,122 124,118 120,128" fill="#FFC107" transform="rotate(15 118 118)" />
    {/* Feet */}
    <rect x="36" y="114" width="22" height="16" rx="8" fill="#C4DEFF" stroke="#A0C0F0" strokeWidth="1.5" />
    <rect x="72" y="114" width="22" height="16" rx="8" fill="#C4DEFF" stroke="#A0C0F0" strokeWidth="1.5" />
    {/* Head */}
    <rect x="18" y="10" width="94" height="58" rx="24" fill="url(#aHeadGrad)" stroke="#C4DEFF" strokeWidth="2" />
    <ellipse cx="42" cy="22" rx="16" ry="7" fill="rgba(255,255,255,0.5)" transform="rotate(-8 42 22)" />
    {/* Eyes - cute screen style */}
    <rect x="30" y="24" width="24" height="18" rx="9" fill="#1A2E6E" />
    <rect x="76" y="24" width="24" height="18" rx="9" fill="#1A2E6E" />
    <circle cx="42" cy="33" r="6" fill="url(#aEyeGrad)" />
    <circle cx="88" cy="33" r="6" fill="url(#aEyeGrad)" />
    <circle cx="44" cy="31" r="2.5" fill="white" />
    <circle cx="90" cy="31" r="2.5" fill="white" />
    {/* Rosy cheeks */}
    <ellipse cx="24" cy="42" rx="8" ry="5" fill="#B8D4FF" opacity="0.5" />
    <ellipse cx="106" cy="42" rx="8" ry="5" fill="#B8D4FF" opacity="0.5" />
    {/* Smile */}
    <path d="M 50 52 Q 65 62 80 52" stroke="#4D9DFF" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Antenna */}
    <rect x="61" y="2" width="8" height="12" rx="4" fill="#C4DEFF" />
    <circle cx="65" cy="1" r="8" fill="#4D9DFF" />
    <circle cx="65" cy="1" r="5" fill="white" />
    <circle cx="67" cy="-1" r="2" fill="#4D9DFF" opacity="0.6" />
    {/* Floating elements around */}
    <text x="108" y="22" fontSize="16" fill="#FFD54A">💡</text>
    <text x="5" y="58" fontSize="12" fill="#FFD54A" opacity="0.8">✦</text>
    <text x="115" y="55" fontSize="10" fill="#5AD66F" opacity="0.8">✦</text>
  </svg>
);

// ── Baby Dragon (Sidebar bottom mascot)
export const DragonMascot: React.FC<{ size?: number; className?: string }> = ({ size = 110, className = '' }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 110 121" fill="none" className={className}>
    <defs>
      <radialGradient id="dGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#7EE899" />
        <stop offset="100%" stopColor="#3AB85A" />
      </radialGradient>
    </defs>
    <ellipse cx="55" cy="116" rx="28" ry="7" fill="rgba(0,0,0,0.2)" />
    {/* Tail */}
    <path d="M 64 92 Q 88 100 96 88 Q 100 80 90 76" stroke="#4EC46A" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M 90 76 L 98 68 L 86 70 Z" fill="#FFD54A" />
    {/* Body */}
    <ellipse cx="55" cy="80" rx="30" ry="28" fill="url(#dGrad)" />
    {/* Belly */}
    <ellipse cx="55" cy="86" rx="18" ry="14" fill="#B8F5C8" />
    {/* Wings */}
    <path d="M 25 65 Q 5 44 14 30 Q 22 20 30 40 Q 35 52 30 66 Z" fill="#5AD66F" opacity="0.85" />
    <path d="M 85 65 Q 105 44 96 30 Q 88 20 80 40 Q 75 52 80 66 Z" fill="#5AD66F" opacity="0.85" />
    {/* Wing veins */}
    <path d="M 22 60 Q 10 44 16 34" stroke="#3AB85A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M 28 63 Q 14 46 18 35" stroke="#3AB85A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Feet */}
    <ellipse cx="42" cy="105" rx="12" ry="7" fill="#4EC46A" />
    <ellipse cx="68" cy="105" rx="12" ry="7" fill="#4EC46A" />
    <circle cx="35" cy="107" r="4" fill="#3AB85A" />
    <circle cx="42" cy="109" r="4" fill="#3AB85A" />
    <circle cx="49" cy="107" r="4" fill="#3AB85A" />
    {/* Head */}
    <circle cx="55" cy="44" r="30" fill="url(#dGrad)" />
    <ellipse cx="48" cy="32" rx="14" ry="8" fill="rgba(255,255,255,0.18)" />
    {/* Snout */}
    <ellipse cx="55" cy="58" rx="12" ry="8" fill="#4EC46A" />
    <circle cx="50" cy="56" r="2.5" fill="#2A9040" />
    <circle cx="60" cy="56" r="2.5" fill="#2A9040" />
    {/* Eyes */}
    <circle cx="44" cy="40" r="10" fill="white" />
    <circle cx="66" cy="40" r="10" fill="white" />
    <circle cx="45" cy="41" r="6" fill="#1A0A3d" />
    <circle cx="67" cy="41" r="6" fill="#1A0A3d" />
    <circle cx="47" cy="39" r="2.5" fill="white" />
    <circle cx="69" cy="39" r="2.5" fill="white" />
    {/* Rosy cheeks */}
    <ellipse cx="35" cy="50" rx="7" ry="4" fill="#6ADA80" opacity="0.5" />
    <ellipse cx="75" cy="50" rx="7" ry="4" fill="#6ADA80" opacity="0.5" />
    {/* Horns */}
    <path d="M 43 18 L 38 4 L 46 16 Z" fill="#FFD54A" />
    <path d="M 67 18 L 72 4 L 64 16 Z" fill="#FFD54A" />
    {/* Spiky back */}
    <ellipse cx="55" cy="16" rx="5" ry="8" fill="#FFD54A" />
    {/* Smile */}
    <path d="M 46 62 Q 55 68 64 62" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Waving hand */}
    <circle cx="22" cy="72" r="7" fill="#5AD66F" />
    <circle cx="16" cy="67" r="5" fill="#5AD66F" />
    <circle cx="14" cy="61" r="4" fill="#5AD66F" />
    <circle cx="18" cy="57" r="4" fill="#5AD66F" />
    {/* Backpack strap */}
    <rect x="42" y="68" width="5" height="18" rx="2.5" fill="#6C4CFF" opacity="0.8" />
    <rect x="63" y="68" width="5" height="18" rx="2.5" fill="#6C4CFF" opacity="0.8" />
    <rect x="42" y="82" width="26" height="4" rx="2" fill="#6C4CFF" opacity="0.8" />
  </svg>
);

// ── Treasure chest
export const TreasureChest: React.FC<{ size?: number; className?: string }> = ({ size = 80, className = '' }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 80 72" fill="none" className={className}>
    <ellipse cx="40" cy="68" rx="28" ry="6" fill="rgba(0,0,0,0.2)" />
    <rect x="6" y="36" width="68" height="32" rx="8" fill="#8B4513" />
    <rect x="6" y="36" width="68" height="32" rx="8" fill="url(#chestBaseG)" />
    <rect x="4" y="16" width="72" height="26" rx="10" fill="#A0522D" />
    <rect x="4" y="16" width="72" height="26" rx="10" fill="url(#chestLidG)" />
    <rect x="4" y="36" width="72" height="6" rx="2" fill="#FFD54A" />
    <rect x="20" y="16" width="4" height="26" rx="2" fill="#FFD54A" opacity="0.6" />
    <rect x="56" y="16" width="4" height="26" rx="2" fill="#FFD54A" opacity="0.6" />
    <rect x="30" y="30" width="20" height="16" rx="5" fill="#FFD54A" />
    <circle cx="40" cy="32" r="6" fill="#FFC107" stroke="#E8A000" strokeWidth="1" />
    <rect x="37" y="34" width="6" height="8" rx="1.5" fill="#E8A000" />
    <ellipse cx="30" cy="24" rx="13" ry="5" fill="rgba(255,255,255,0.2)" />
    <circle cx="14" cy="32" r="5" fill="#FFD54A" />
    <circle cx="64" cy="30" r="5" fill="#FFD54A" />
    <circle cx="72" cy="38" r="4" fill="#FFC107" />
    <circle cx="8" cy="42" r="3" fill="#FFD54A" />
    <polygon points="40,6 44,12 40,18 36,12" fill="#FF4FA3" />
    <defs>
      <linearGradient id="chestBaseG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
      </linearGradient>
      <linearGradient id="chestLidG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Coin
export const CoinSVG: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <circle cx="14" cy="14" r="13" fill="#FFD54A" />
    <circle cx="14" cy="14" r="13" stroke="#FFC107" strokeWidth="1.5" />
    <circle cx="14" cy="14" r="9" fill="#FFC107" opacity="0.3" />
    <text x="14" y="18" textAnchor="middle" fontSize="10" fontWeight="900" fill="#B8860B" fontFamily="Poppins">₮</text>
    <ellipse cx="10" cy="9" rx="4" ry="2" fill="rgba(255,255,255,0.4)" />
  </svg>
);

// ── XP Gem
export const XPGem: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <polygon points="14,2 22,8 22,20 14,26 6,20 6,8" fill="#8A5CFF" />
    <polygon points="14,2 22,8 14,14 6,8" fill="rgba(255,255,255,0.3)" />
    <polygon points="14,14 22,20 14,26 6,20" fill="rgba(0,0,0,0.15)" />
    <text x="14" y="19" textAnchor="middle" fontSize="7" fontWeight="900" fill="white" fontFamily="Poppins">XP</text>
  </svg>
);

// ── Fire streak
export const FireSVG: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 24 31" fill="none" className={className}>
    <path d="M 12 31 C 5 31 1 25 1 19 C 1 13 5 9 9 5 C 9 11 11 13 12 13 C 13 13 15 11 15 5 C 19 9 23 13 23 19 C 23 25 19 31 12 31 Z" fill="#FF9F43" />
    <path d="M 12 28 C 7 28 4 24 4 19 C 4 15 7 12 9 10 C 9 14 11 16 12 16 C 13 16 15 14 15 10 C 17 12 20 15 20 19 C 20 24 17 28 12 28 Z" fill="#FFD54A" />
    <path d="M 12 25 C 9 25 7 23 7 20 C 7 18 8 16 10 15 C 10 17 11 18 12 18 C 13 18 14 17 14 15 C 16 16 17 18 17 20 C 17 23 15 25 12 25 Z" fill="#FF6B35" />
  </svg>
);

// ── Trophy
export const TrophySVG: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = '' }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 44 53" fill="none" className={className}>
    <ellipse cx="22" cy="50" rx="12" ry="4" fill="rgba(0,0,0,0.15)" />
    <rect x="12" y="42" width="20" height="8" rx="3" fill="#FFD54A" />
    <rect x="8" y="48" width="28" height="4" rx="2" fill="#FFC107" />
    <rect x="19" y="35" width="6" height="10" rx="3" fill="#FFD54A" />
    <path d="M 6 4 L 6 26 Q 6 38 22 38 Q 38 38 38 26 L 38 4 Z" fill="#FFD54A" />
    <path d="M 10 6 L 10 24 Q 10 32 18 34 L 14 6 Z" fill="rgba(255,255,255,0.25)" />
    <path d="M 6 8 Q 0 8 0 18 Q 0 26 6 26" stroke="#FFD54A" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M 38 8 Q 44 8 44 18 Q 44 26 38 26" stroke="#FFD54A" strokeWidth="5" strokeLinecap="round" fill="none" />
    <polygon points="22,10 24,16 30,16 25,20 27,26 22,22 17,26 19,20 14,16 20,16" fill="rgba(255,255,255,0.5)" />
  </svg>
);

// ── Star rating
export const StarRating: React.FC<{ count: number; max?: number; size?: number }> = ({ count, max = 3, size = 14 }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {Array.from({ length: max }, (_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 9,5 13,5 10,8.5 11,13 7,10.5 3,13 4,8.5 1,5 5,5" fill={i < count ? '#FFD54A' : 'rgba(255,255,255,0.25)'} />
      </svg>
    ))}
  </div>
);

// ── Circular Progress Ring
export const ProgressRing: React.FC<{ percent: number; size?: number; color?: string }> = ({ percent, size = 72, color = '#6C4CFF' }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="8" fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2+1} textAnchor="middle" dominantBaseline="middle"
        fontSize={size*0.22} fontWeight="900" fill={color} fontFamily="Baloo 2, cursive">{percent}%</text>
    </svg>
  );
};

// ── Badge Shield
export const BadgeSVG: React.FC<{ icon: string; color: string; size?: number; className?: string }> = ({ icon, color, size = 58, className = '' }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 58 64" fill="none" className={className}>
    <defs>
      <linearGradient id={`bg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Shield shadow */}
    <path d="M 29 62 Q 56 52 56 35 L 56 12 L 29 3 L 2 12 L 2 35 Q 2 52 29 62 Z" fill="rgba(0,0,0,0.2)" transform="translate(2 3)" />
    {/* Shield body */}
    <path d="M 29 60 Q 56 50 56 33 L 56 10 L 29 1 L 2 10 L 2 33 Q 2 50 29 60 Z" fill={`url(#bg${color.replace('#','')})`} />
    {/* Inner shine */}
    <path d="M 29 6 L 51 14 L 51 33 Q 51 46 29 54 Q 7 46 7 33 L 7 14 Z" fill="rgba(255,255,255,0.15)" />
    {/* Top shine streak */}
    <path d="M 14 10 L 29 6 L 29 20 L 10 20 Z" fill="rgba(255,255,255,0.2)" />
    {/* Icon */}
    <text x="29" y="38" textAnchor="middle" fontSize="22">{icon}</text>
    {/* Gold star top right */}
    <circle cx="48" cy="10" r="7" fill="#FFD54A" />
    <polygon points="48,6 49.5,9 53,9 50.3,11.3 51.4,15 48,13 44.6,15 45.7,11.3 43,9 46.5,9" fill="white" opacity="0.9" />
  </svg>
);

// ── Full Adventure World Map SVG
export const AdventureWorldMap: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="100%" height="100%" viewBox="0 0 860 370" fill="none" preserveAspectRatio="xMidYMid slice" className={className}>
    <defs>
      <linearGradient id="mapSky" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="40%" stopColor="#B0DCFF" />
        <stop offset="100%" stopColor="#90E8A0" />
      </linearGradient>
      <linearGradient id="mapGround" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#6ECC80" />
        <stop offset="100%" stopColor="#4AAA5A" />
      </linearGradient>
      <linearGradient id="mapRiver" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#5AB4FF" />
        <stop offset="100%" stopColor="#80CCFF" />
      </linearGradient>
      <linearGradient id="mapPath" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#FFD54A" />
        <stop offset="100%" stopColor="#FF9F43" />
      </linearGradient>
      <radialGradient id="islandGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#8EE0A0" />
        <stop offset="100%" stopColor="#5AC870" />
      </radialGradient>
      <filter id="glow3d">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* SKY */}
    <rect x="0" y="0" width="860" height="370" fill="url(#mapSky)" />

    {/* SUN */}
    <circle cx="790" cy="55" r="36" fill="#FFE082" opacity="0.9" />
    <circle cx="790" cy="55" r="26" fill="#FFD54A" />
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <line key={i} x1={790+38*Math.cos(a*Math.PI/180)} y1={55+38*Math.sin(a*Math.PI/180)}
            x2={790+52*Math.cos(a*Math.PI/180)} y2={55+52*Math.sin(a*Math.PI/180)}
            stroke="#FFD54A" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    ))}

    {/* BACKGROUND MOUNTAINS */}
    <path d="M 0 220 L 100 130 L 200 190 L 300 90 L 400 170 L 500 110 L 600 190 L 700 100 L 800 165 L 860 130 L 860 370 L 0 370 Z" fill="#9FC8E0" opacity="0.45" />
    <path d="M 0 250 L 80 165 L 180 225 L 260 145 L 360 210 L 450 148 L 550 220 L 640 148 L 730 205 L 820 155 L 860 200 L 860 370 L 0 370 Z" fill="#7AAAC8" opacity="0.65" />
    {/* Snow caps */}
    <polygon points="260,145 280,172 240,172" fill="white" opacity="0.8" />
    <polygon points="640,148 658,172 622,172" fill="white" opacity="0.8" />
    <polygon points="450,148 466,170 434,170" fill="white" opacity="0.7" />

    {/* GROUND */}
    <path d="M 0 285 Q 215 265 430 285 Q 645 305 860 275 L 860 370 L 0 370 Z" fill="url(#mapGround)" />

    {/* RIVER */}
    <path d="M 0 325 Q 140 305 290 320 Q 430 335 570 308 Q 670 290 860 312" stroke="url(#mapRiver)" strokeWidth="22" fill="none" opacity="0.85" />
    <path d="M 0 325 Q 140 305 290 320 Q 430 335 570 308 Q 670 290 860 312" stroke="rgba(255,255,255,0.3)" strokeWidth="8" fill="none" />
    {/* Ripple */}
    <ellipse cx="200" cy="318" rx="22" ry="6" fill="rgba(255,255,255,0.3)" />
    <ellipse cx="480" cy="326" rx="18" ry="5" fill="rgba(255,255,255,0.25)" />

    {/* BRIDGE */}
    <rect x="400" y="305" width="100" height="18" rx="5" fill="#8B6B3A" />
    <rect x="400" y="298" width="100" height="10" rx="4" fill="#A08050" />
    {[406,420,434,448,462,476,490].map((x,i) => (
      <rect key={i} x={x} y="290" width="5" height="16" rx="2" fill="#8B6B3A" />
    ))}
    <path d="M 406 290 Q 450 278 494 290" stroke="#A08050" strokeWidth="3" fill="none" />

    {/* TREES — scattered */}
    {[[60,265],[150,255],[300,250],[680,255],[760,260],[820,248]].map(([x,y],i) => (
      <g key={i}>
        <rect x={x-4} y={y+18} width="8" height="16" rx="2" fill="#7B4F2A" />
        <circle cx={x} cy={y} r="20" fill="#5AD66F" />
        <circle cx={x-7} cy={y+7} r="14" fill="#4EC45E" />
        <circle cx={x+7} cy={y+6} r="14" fill="#6ADA7A" />
        <circle cx={x} cy={y-10} r="12" fill="#7AE48A" />
      </g>
    ))}

    {/* FLOATING ISLAND (left center) */}
    <g transform="translate(120, 110)">
      <ellipse cx="55" cy="65" rx="58" ry="24" fill="#4AAA5A" />
      <ellipse cx="55" cy="70" rx="58" ry="20" fill="#3A9A4A" />
      <ellipse cx="55" cy="78" rx="52" ry="26" fill="#2A8A3A" />
      {/* Castle on island */}
      <rect x="28" y="32" width="54" height="34" rx="4" fill="#7A9FC8" />
      {/* Left tower */}
      <rect x="14" y="18" width="26" height="48" rx="4" fill="#6A90B8" />
      {/* Right tower */}
      <rect x="64" y="18" width="26" height="48" rx="4" fill="#6A90B8" />
      {/* Battlements left */}
      {[14,20,26].map((x,i) => <rect key={i} x={x+i*0} y="14" width="7" height="8" rx="1.5" fill="#5A80A8" />)}
      {[64,70,76].map((x,i) => <rect key={i} x={x} y="14" width="7" height="8" rx="1.5" fill="#5A80A8" />)}
      {/* Gate */}
      <path d="M 36 66 L 36 46 Q 36 36 55 36 Q 74 36 74 46 L 74 66 Z" fill="#3D2080" />
      <path d="M 39 66 L 39 49 Q 39 40 55 40 Q 71 40 71 49 L 71 66 Z" fill="#2D1060" />
      {/* Windows */}
      <rect x="18" y="28" width="14" height="16" rx="7" fill="#4D9DFF" opacity="0.85" />
      <rect x="70" y="28" width="14" height="16" rx="7" fill="#4D9DFF" opacity="0.85" />
      <rect x="23" y="48" width="12" height="14" rx="6" fill="#4D9DFF" opacity="0.7" />
      <rect x="67" y="48" width="12" height="14" rx="6" fill="#4D9DFF" opacity="0.7" />
      {/* Flag */}
      <line x1="55" y1="12" x2="55" y2="-8" stroke="#C0C0C0" strokeWidth="2.5" />
      <polygon points="55,-8 68,-2 55,4" fill="#FF4FA3" />
      {/* Island grass */}
      <ellipse cx="55" cy="65" rx="55" ry="22" fill="url(#islandGrad)" opacity="0.7" />
    </g>

    {/* HOT AIR BALLOON */}
    <g transform="translate(540,30)">
      {/* Envelope */}
      <ellipse cx="44" cy="54" rx="42" ry="56" fill="#FF4FA3" />
      <path d="M 4 54 Q 22 18 44 8 Q 66 18 84 54 Z" fill="#FFD54A" />
      <path d="M 4 54 Q 14 78 44 98 Q 74 78 84 54 Q 66 82 44 72 Q 22 82 4 54 Z" fill="#6C4CFF" />
      <path d="M 44 8 L 44 98" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <path d="M 4 54 Q 44 60 84 54" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
      {/* Shine */}
      <ellipse cx="30" cy="30" rx="14" ry="22" fill="rgba(255,255,255,0.15)" />
      {/* Ropes & basket */}
      <line x1="28" y1="98" x2="28" y2="115" stroke="#8B6B3A" strokeWidth="2.5" />
      <line x1="60" y1="98" x2="60" y2="115" stroke="#8B6B3A" strokeWidth="2.5" />
      <rect x="20" y="115" width="48" height="22" rx="7" fill="#C8A266" />
      <rect x="20" y="115" width="48" height="22" rx="7" stroke="#A08050" strokeWidth="1.5" fill="none" />
      {/* Basket shine */}
      <ellipse cx="35" cy="120" rx="10" ry="3" fill="rgba(255,255,255,0.2)" />
    </g>

    {/* ANIMATED DOTTED PATH connecting stages */}
    <path d="M 50 295 Q 120 272 220 280 Q 310 288 370 272 Q 435 255 490 270 Q 565 290 630 268 Q 700 248 770 262 Q 820 272 858 258"
      stroke="url(#mapPath)" strokeWidth="12" fill="none" strokeLinecap="round"
      strokeDasharray="20 14" filter="url(#glow3d)" opacity="0.9" />
    {/* Path glow under */}
    <path d="M 50 295 Q 120 272 220 280 Q 310 288 370 272 Q 435 255 490 270 Q 565 290 630 268 Q 700 248 770 262 Q 820 272 858 258"
      stroke="#FFD54A" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />

    {/* CLOUDS */}
    {[[30,40],[220,24],[580,42],[700,28]].map(([x,y],i) => (
      <g key={i} transform={`translate(${x},${y})`} opacity="0.9">
        <ellipse cx="44" cy="28" rx="42" ry="16" fill="white" />
        <circle cx="28" cy="22" r="18" fill="white" />
        <circle cx="58" cy="20" r="22" fill="white" />
        <circle cx="44" cy="17" r="18" fill="white" />
        <ellipse cx="36" cy="14" rx="10" ry="5" fill="rgba(255,255,255,0.6)" />
      </g>
    ))}

    {/* SPARKLES scattered */}
    {[[90,100],[340,70],[510,95],[660,82],[200,190],[420,160]].map(([x,y],i) => (
      <g key={i} opacity={0.5+i%3*0.1}>
        <circle cx={x} cy={y} r="4" fill="#FFD54A" />
        <line x1={x-8} y1={y} x2={x+8} y2={y} stroke="#FFD54A" strokeWidth="1.5" opacity="0.5" />
        <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="#FFD54A" strokeWidth="1.5" opacity="0.5" />
      </g>
    ))}
  </svg>
);

// ── Tiny sparkle
export const Sparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 20, color = '#FFD54A', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <polygon points="10,1 11.8,7.2 18,7 13.5,11 15.5,17.5 10,14 4.5,17.5 6.5,11 2,7 8.2,7.2" fill={color} />
    <polygon points="10,3 11.5,7.8 17,7.5 13,10.8 14.8,16.5 10,13.5 5.2,16.5 7,10.8 3,7.5 8.5,7.8" fill="rgba(255,255,255,0.3)" />
  </svg>
);

// ── Cloud
export const Cloud: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 80, color = 'rgba(255,255,255,0.15)', className = '' }) => (
  <svg width={size} height={size*0.55} viewBox="0 0 80 44" fill="none" className={className}>
    <ellipse cx="40" cy="30" rx="36" ry="16" fill={color} />
    <circle cx="26" cy="26" r="16" fill={color} />
    <circle cx="52" cy="24" r="18" fill={color} />
    <circle cx="40" cy="22" r="14" fill={color} />
  </svg>
);
