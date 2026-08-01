import React from 'react';

/* ============================================================
   NEOLIT ORIGINAL SVG ILLUSTRATION LIBRARY
   All assets are 100% original SVG art — no placeholders
   ============================================================ */

// ── Cute Robot Mascot (Orange Helmet, Wave Pose)
export const RobotMascot: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Body glow */}
    <ellipse cx="60" cy="110" rx="30" ry="8" fill="rgba(255,159,67,0.2)" />
    {/* Body */}
    <rect x="30" y="58" width="60" height="45" rx="14" fill="#FF9F43" />
    <rect x="30" y="58" width="60" height="45" rx="14" fill="url(#bodyGrad)" />
    {/* Body shine */}
    <rect x="38" y="65" width="20" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
    {/* Chest panel */}
    <rect x="42" y="76" width="36" height="22" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    {/* Heart light */}
    <circle cx="60" cy="87" r="5" fill="#FF4FA3" />
    <circle cx="60" cy="87" r="3" fill="#FF8ACA" />
    {/* Arms */}
    <rect x="12" y="62" width="18" height="32" rx="9" fill="#FF9F43" transform="rotate(-10 12 62)" />
    <rect x="90" y="62" width="18" height="32" rx="9" fill="#FF9F43" transform="rotate(10 90 62)" />
    {/* Left hand wave */}
    <circle cx="16" cy="94" r="8" fill="#FFB865" />
    <circle cx="10" cy="89" r="5" fill="#FFB865" />
    <circle cx="8" cy="82" r="4" fill="#FFB865" />
    {/* Feet */}
    <rect x="38" y="98" width="18" height="14" rx="7" fill="#E8873A" />
    <rect x="64" y="98" width="18" height="14" rx="7" fill="#E8873A" />
    {/* Head */}
    <rect x="25" y="18" width="70" height="52" rx="20" fill="#FFB865" />
    <rect x="25" y="18" width="70" height="52" rx="20" fill="url(#headGrad)" />
    {/* Helmet visor */}
    <rect x="30" y="24" width="60" height="36" rx="14" fill="#6C4CFF" opacity="0.9" />
    <rect x="30" y="24" width="60" height="36" rx="14" fill="url(#visorGrad)" />
    {/* Visor shine */}
    <ellipse cx="52" cy="32" rx="8" ry="5" fill="rgba(255,255,255,0.3)" />
    {/* Eyes */}
    <circle cx="47" cy="42" r="8" fill="white" />
    <circle cx="73" cy="42" r="8" fill="white" />
    <circle cx="49" cy="43" r="4" fill="#1a0a3d" />
    <circle cx="75" cy="43" r="4" fill="#1a0a3d" />
    {/* Eye glints */}
    <circle cx="51" cy="41" r="1.5" fill="white" />
    <circle cx="77" cy="41" r="1.5" fill="white" />
    {/* Mouth */}
    <path d="M 50 54 Q 60 60 70 54" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Antenna */}
    <rect x="57" y="6" width="6" height="16" rx="3" fill="#FFB865" />
    <circle cx="60" cy="5" r="6" fill="#FFD54A" />
    <circle cx="60" cy="5" r="3" fill="white" />
    {/* Ear ports */}
    <circle cx="25" cy="40" r="5" fill="#E8873A" />
    <circle cx="95" cy="40" r="5" fill="#E8873A" />
    <defs>
      <linearGradient id="bodyGrad" x1="30" y1="58" x2="90" y2="103" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
      </linearGradient>
      <linearGradient id="headGrad" x1="25" y1="18" x2="95" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
      </linearGradient>
      <linearGradient id="visorGrad" x1="30" y1="24" x2="90" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8A5CFF" />
        <stop offset="100%" stopColor="#4D2FCC" />
      </linearGradient>
    </defs>
  </svg>
);

// ── AI Tutor Robot (White/Blue theme, with books)
export const AIRobotMascot: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="60" cy="112" rx="28" ry="7" fill="rgba(77,157,255,0.2)" />
    {/* Body */}
    <rect x="28" y="56" width="64" height="48" rx="16" fill="white" stroke="#E8EFFF" strokeWidth="2" />
    <rect x="36" y="68" width="48" height="28" rx="10" fill="#F0F4FF" stroke="#E8EFFF" strokeWidth="1.5" />
    {/* Screen on body */}
    <rect x="40" y="72" width="40" height="20" rx="6" fill="#4D2FCC" />
    {/* Screen content */}
    <circle cx="50" cy="82" r="3" fill="#FFD54A" />
    <rect x="56" y="80" width="18" height="2" rx="1" fill="rgba(255,255,255,0.6)" />
    <rect x="56" y="84" width="12" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
    {/* Arms */}
    <rect x="8" y="60" width="20" height="30" rx="10" fill="white" stroke="#E8EFFF" strokeWidth="2" />
    <rect x="92" y="60" width="20" height="30" rx="10" fill="white" stroke="#E8EFFF" strokeWidth="2" />
    {/* Book in left hand */}
    <rect x="3" y="86" width="22" height="16" rx="4" fill="#6C4CFF" />
    <rect x="3" y="86" width="3" height="16" rx="1.5" fill="#4D2FCC" />
    <rect x="8" y="89" width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,0.5)" />
    <rect x="8" y="92" width="9" height="1.5" rx="0.75" fill="rgba(255,255,255,0.4)" />
    <rect x="8" y="95" width="11" height="1.5" rx="0.75" fill="rgba(255,255,255,0.3)" />
    {/* Magic wand in right hand */}
    <rect x="105" y="82" width="4" height="20" rx="2" fill="#FFD54A" transform="rotate(-20 105 82)" />
    <circle cx="107" cy="80" r="5" fill="#FFD54A" />
    <circle cx="107" cy="80" r="2.5" fill="white" />
    {/* Feet */}
    <rect x="36" y="98" width="18" height="14" rx="7" fill="#E8EFFF" stroke="#D0DAFF" strokeWidth="1.5" />
    <rect x="66" y="98" width="18" height="14" rx="7" fill="#E8EFFF" stroke="#D0DAFF" strokeWidth="1.5" />
    {/* Head */}
    <rect x="22" y="10" width="76" height="52" rx="22" fill="white" stroke="#E8EFFF" strokeWidth="2" />
    {/* Face screen */}
    <rect x="28" y="16" width="64" height="40" rx="16" fill="#4D9DFF" opacity="0.15" />
    {/* Eyes - friendly screens */}
    <rect x="36" y="26" width="18" height="14" rx="7" fill="#4D2FCC" />
    <rect x="66" y="26" width="18" height="14" rx="7" fill="#4D2FCC" />
    <circle cx="45" cy="33" r="4" fill="#4D9DFF" />
    <circle cx="75" cy="33" r="4" fill="#4D9DFF" />
    <circle cx="47" cy="31" r="1.5" fill="white" />
    <circle cx="77" cy="31" r="1.5" fill="white" />
    {/* Smile */}
    <path d="M 48 48 Q 60 56 72 48" stroke="#4D9DFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Antenna */}
    <rect x="57" y="2" width="6" height="12" rx="3" fill="#E8EFFF" />
    <circle cx="60" cy="1" r="6" fill="#4D9DFF" />
    <circle cx="60" cy="1" r="3" fill="white" />
    {/* Sparkles around head */}
    <circle cx="22" cy="12" r="3" fill="#FFD54A" opacity="0.8" />
    <circle cx="98" cy="14" r="2" fill="#FF4FA3" opacity="0.8" />
    <circle cx="105" cy="30" r="2.5" fill="#FFD54A" opacity="0.6" />
  </svg>
);

// ── Baby Dragon Mascot (Green, cute, wings)
export const DragonMascot: React.FC<{ size?: number; className?: string }> = ({ size = 100, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="50" cy="95" rx="22" ry="6" fill="rgba(90,214,111,0.25)" />
    {/* Tail */}
    <path d="M 58 78 Q 80 85 88 76 Q 92 70 85 65" stroke="#5AD66F" strokeWidth="8" strokeLinecap="round" fill="none" />
    {/* Body */}
    <ellipse cx="48" cy="70" rx="26" ry="24" fill="#5AD66F" />
    <ellipse cx="48" cy="70" rx="18" ry="16" fill="#7DE891" opacity="0.5" />
    {/* Belly */}
    <ellipse cx="48" cy="74" rx="14" ry="12" fill="#A8F5B8" />
    {/* Wings */}
    <path d="M 22 58 Q 5 40 14 30 Q 20 25 28 38 Q 32 46 28 58 Z" fill="#4EC45E" opacity="0.85" />
    <path d="M 74 58 Q 91 40 82 30 Q 76 25 68 38 Q 64 46 68 58 Z" fill="#4EC45E" opacity="0.85" />
    {/* Wing texture lines */}
    <path d="M 20 55 Q 12 42 18 34" stroke="#5AD66F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M 26 57 Q 16 44 20 35" stroke="#5AD66F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Feet */}
    <ellipse cx="38" cy="90" rx="10" ry="6" fill="#4EC45E" />
    <ellipse cx="58" cy="90" rx="10" ry="6" fill="#4EC45E" />
    {/* Toe bumps */}
    <circle cx="32" cy="91" r="3" fill="#3DB64E" />
    <circle cx="38" cy="93" r="3" fill="#3DB64E" />
    <circle cx="44" cy="91" r="3" fill="#3DB64E" />
    {/* Head */}
    <circle cx="50" cy="38" r="26" fill="#5AD66F" />
    {/* Head highlight */}
    <ellipse cx="44" cy="28" rx="12" ry="8" fill="rgba(255,255,255,0.2)" />
    {/* Snout */}
    <ellipse cx="50" cy="50" rx="10" ry="7" fill="#4EC45E" />
    {/* Nostrils */}
    <circle cx="46" cy="49" r="2" fill="#3DB64E" />
    <circle cx="54" cy="49" r="2" fill="#3DB64E" />
    {/* Eyes */}
    <circle cx="40" cy="34" r="9" fill="white" />
    <circle cx="60" cy="34" r="9" fill="white" />
    <circle cx="41" cy="35" r="5" fill="#1a0a3d" />
    <circle cx="61" cy="35" r="5" fill="#1a0a3d" />
    {/* Eye glints */}
    <circle cx="43" cy="33" r="2" fill="white" />
    <circle cx="63" cy="33" r="2" fill="white" />
    {/* Horns */}
    <path d="M 40 16 L 36 4 L 44 12 Z" fill="#FFD54A" />
    <path d="M 60 16 L 64 4 L 56 12 Z" fill="#FFD54A" />
    {/* Spikes on head */}
    <ellipse cx="50" cy="14" rx="4" ry="6" fill="#FFD54A" />
    {/* Smile */}
    <path d="M 42 54 Q 50 60 58 54" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Backpack straps */}
    <rect x="36" y="60" width="5" height="16" rx="2.5" fill="#6C4CFF" opacity="0.7" />
    <rect x="55" y="60" width="5" height="16" rx="2.5" fill="#6C4CFF" opacity="0.7" />
    <rect x="36" y="72" width="24" height="3" rx="1.5" fill="#6C4CFF" opacity="0.7" />
  </svg>
);

// ── Stars background cluster
export const StarCluster: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" className={className}>
    {[
      [20,20,8],[50,10,5],[90,25,9],[130,8,6],[165,20,8],[190,40,5],
      [10,60,6],[40,75,4],[70,55,7],[100,80,5],[140,70,8],[180,60,4],[160,85,6]
    ].map(([x, y, r], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={r} fill="#FFD54A" opacity={0.8 - i * 0.03} />
        <circle cx={x} cy={y} r={r * 0.5} fill="white" opacity={0.5} />
        {/* 4 point star rays */}
        <line x1={x - r*1.5} y1={y} x2={x + r*1.5} y2={y} stroke="#FFD54A" strokeWidth="1.5" opacity={0.4} />
        <line x1={x} y1={y - r*1.5} x2={x} y2={y + r*1.5} stroke="#FFD54A" strokeWidth="1.5" opacity={0.4} />
      </g>
    ))}
  </svg>
);

// ── Floating Cloud
export const Cloud: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 80, color = '#E8F4FF', className = '' }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 80 48" fill="none" className={className}>
    <ellipse cx="40" cy="32" rx="36" ry="18" fill={color} />
    <circle cx="28" cy="28" r="16" fill={color} />
    <circle cx="52" cy="26" r="18" fill={color} />
    <circle cx="40" cy="24" r="14" fill={color} />
    {/* Shine */}
    <ellipse cx="34" cy="20" rx="8" ry="4" fill="rgba(255,255,255,0.5)" />
  </svg>
);

// ── Treasure Chest
export const TreasureChest: React.FC<{ size?: number; className?: string }> = ({ size = 80, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    {/* Shadow */}
    <ellipse cx="40" cy="76" rx="28" ry="6" fill="rgba(0,0,0,0.15)" />
    {/* Chest base */}
    <rect x="8" y="40" width="64" height="32" rx="8" fill="#8B4513" />
    <rect x="8" y="40" width="64" height="32" rx="8" fill="url(#chestBase)" />
    {/* Chest lid */}
    <rect x="6" y="18" width="68" height="28" rx="10" fill="#A0522D" />
    <rect x="6" y="18" width="68" height="28" rx="10" fill="url(#chestLid)" />
    {/* Gold trim */}
    <rect x="6" y="40" width="68" height="5" rx="2" fill="#FFD54A" />
    <rect x="8" y="44" width="64" height="2" rx="1" fill="#FFC107" />
    {/* Vertical gold strips on lid */}
    <rect x="22" y="18" width="4" height="28" rx="2" fill="#FFD54A" opacity="0.7" />
    <rect x="54" y="18" width="4" height="28" rx="2" fill="#FFD54A" opacity="0.7" />
    {/* Lock */}
    <rect x="32" y="34" width="16" height="14" rx="5" fill="#FFD54A" />
    <circle cx="40" cy="36" r="5" fill="#FFC107" stroke="#E8A000" strokeWidth="1" />
    <rect x="37" y="38" width="6" height="6" rx="1" fill="#E8A000" />
    {/* Shine on lid */}
    <ellipse cx="32" cy="25" rx="12" ry="5" fill="rgba(255,255,255,0.2)" />
    {/* Gold coins spilling out */}
    <circle cx="16" cy="36" r="5" fill="#FFD54A" />
    <circle cx="62" cy="34" r="4" fill="#FFD54A" />
    <circle cx="70" cy="40" r="3" fill="#FFD54A" />
    <circle cx="10" cy="44" r="3" fill="#FFC107" />
    {/* Gem */}
    <polygon points="40,8 45,14 40,20 35,14" fill="#FF4FA3" />
    <polygon points="40,8 45,14 40,15 35,14" fill="rgba(255,255,255,0.4)" />
    <defs>
      <linearGradient id="chestBase" x1="8" y1="40" x2="72" y2="72" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
      </linearGradient>
      <linearGradient id="chestLid" x1="6" y1="18" x2="74" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Rocket
export const Rocket: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 60 96" fill="none" className={className}>
    {/* Flame */}
    <ellipse cx="30" cy="88" rx="10" ry="14" fill="#FF9F43" opacity="0.8" />
    <ellipse cx="30" cy="84" rx="6" ry="10" fill="#FFD54A" />
    {/* Body */}
    <path d="M 14 58 L 14 38 Q 14 10 30 4 Q 46 10 46 38 L 46 58 Z" fill="#6C4CFF" />
    <path d="M 14 58 L 14 38 Q 14 10 30 4 Q 46 10 46 38 L 46 58 Z" fill="url(#rocketGrad)" />
    {/* Window */}
    <circle cx="30" cy="36" r="10" fill="#E8EFFF" stroke="white" strokeWidth="2" />
    <circle cx="30" cy="36" r="7" fill="#4D9DFF" />
    <circle cx="27" cy="33" r="3" fill="rgba(255,255,255,0.5)" />
    {/* Wings */}
    <path d="M 14 56 L 4 72 L 14 68 Z" fill="#FF4FA3" />
    <path d="M 46 56 L 56 72 L 46 68 Z" fill="#FF4FA3" />
    {/* Body shine */}
    <path d="M 20 20 Q 22 12 28 8 L 28 50 L 20 50 Z" fill="rgba(255,255,255,0.15)" />
    <defs>
      <linearGradient id="rocketGrad" x1="14" y1="4" x2="46" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8A5CFF" />
        <stop offset="100%" stopColor="#6C4CFF" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Trophy
export const TrophySVG: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 50, color = '#FFD54A', className = '' }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 50 60" fill="none" className={className}>
    <ellipse cx="25" cy="57" rx="14" ry="4" fill="rgba(0,0,0,0.1)" />
    {/* Base */}
    <rect x="14" y="48" width="22" height="8" rx="3" fill={color} />
    <rect x="10" y="54" width="30" height="5" rx="3" fill={color} />
    {/* Stem */}
    <rect x="22" y="40" width="6" height="12" rx="3" fill={color} />
    {/* Cup */}
    <path d="M 8 4 L 8 30 Q 8 42 25 42 Q 42 42 42 30 L 42 4 Z" fill={color} />
    {/* Cup shine */}
    <path d="M 12 6 L 12 28 Q 12 36 20 38 L 16 6 Z" fill="rgba(255,255,255,0.25)" />
    {/* Handles */}
    <path d="M 8 8 Q 2 8 2 18 Q 2 26 8 26" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M 42 8 Q 48 8 48 18 Q 48 26 42 26" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* Star on cup */}
    <polygon points="25,12 27,18 33,18 28,22 30,28 25,24 20,28 22,22 17,18 23,18" fill="rgba(255,255,255,0.5)" />
  </svg>
);

// ── Coin
export const CoinSVG: React.FC<{ size?: number; className?: string }> = ({ size = 30, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" className={className}>
    <circle cx="15" cy="15" r="14" fill="#FFD54A" />
    <circle cx="15" cy="15" r="14" stroke="#FFC107" strokeWidth="1.5" />
    <circle cx="15" cy="15" r="10" fill="#FFC107" opacity="0.4" />
    <text x="15" y="19" textAnchor="middle" fontSize="10" fontWeight="900" fill="#E8A000" fontFamily="Poppins">₮</text>
    <ellipse cx="11" cy="10" rx="4" ry="2" fill="rgba(255,255,255,0.35)" />
  </svg>
);

// ── XP Crystal
export const XPCrystal: React.FC<{ size?: number; className?: string }> = ({ size = 30, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" className={className}>
    <polygon points="15,2 24,8 24,22 15,28 6,22 6,8" fill="#8A5CFF" />
    <polygon points="15,2 24,8 24,22 15,28 6,22 6,8" fill="url(#crystalGrad)" />
    <polygon points="15,2 24,8 15,14 6,8" fill="rgba(255,255,255,0.3)" />
    <text x="15" y="20" textAnchor="middle" fontSize="8" fontWeight="900" fill="white" fontFamily="Poppins">XP</text>
    <defs>
      <linearGradient id="crystalGrad" x1="6" y1="2" x2="24" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C770FF" />
        <stop offset="100%" stopColor="#6C4CFF" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Badge shapes
export const BadgeSVG: React.FC<{ icon: string; bg: string; size?: number; className?: string }> = ({ icon, bg, size = 56, className = '' }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 56 62" fill="none" className={className}>
    {/* Shield shape */}
    <path d="M 28 2 L 54 12 L 54 34 Q 54 54 28 60 Q 2 54 2 34 L 2 12 Z" fill={bg} />
    <path d="M 28 2 L 54 12 L 54 34 Q 54 54 28 60 Q 2 54 2 34 L 2 12 Z" fill="url(#badgeGrad)" />
    <path d="M 28 8 L 48 16 L 48 34 Q 48 50 28 54 Q 8 50 8 34 L 8 16 Z" fill="rgba(255,255,255,0.15)" />
    {/* Shine */}
    <path d="M 16 10 L 28 8 L 28 24 L 12 24 Z" fill="rgba(255,255,255,0.2)" />
    {/* Icon text */}
    <text x="28" y="38" textAnchor="middle" fontSize="20">{icon}</text>
    {/* Star accent */}
    <circle cx="48" cy="10" r="6" fill="#FFD54A" />
    <polygon points="48,6 49.5,9 53,9 50.2,11.5 51.2,15 48,13 44.8,15 45.8,11.5 43,9 46.5,9" fill="white" />
    <defs>
      <linearGradient id="badgeGrad" x1="2" y1="2" x2="54" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Fire Streak Icon
export const FireStreakSVG: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 28 34" fill="none" className={className}>
    <path d="M 14 34 C 6 34 2 28 2 22 C 2 16 6 12 10 8 C 10 14 12 16 14 16 C 16 16 18 14 18 8 C 22 12 26 16 26 22 C 26 28 22 34 14 34 Z" fill="#FF9F43" />
    <path d="M 14 30 C 9 30 6 26 6 22 C 6 18 8 15 10 13 C 10 17 12 19 14 19 C 16 19 18 17 18 13 C 20 15 22 18 22 22 C 22 26 19 30 14 30 Z" fill="#FFD54A" />
    <path d="M 14 27 C 11 27 9 25 9 22 C 9 20 10 18 12 17 C 12 19 13 20 14 20 C 15 20 16 19 16 17 C 18 18 19 20 19 22 C 19 25 17 27 14 27 Z" fill="#FF6B35" />
  </svg>
);

// ── Sparkle burst
export const Sparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 24, color = '#FFD54A', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M 12 2 L 13.5 9 L 20 8 L 14.5 12 L 18 18 L 12 14 L 6 18 L 9.5 12 L 4 8 L 10.5 9 Z" fill={color} />
    <path d="M 12 4 L 13 9.5 L 18 8.5 L 14 12 L 17 17 L 12 13.5 L 7 17 L 10 12 L 6 8.5 L 11 9.5 Z" fill="rgba(255,255,255,0.35)" />
  </svg>
);

// ── Reading Icon
export const ReadingIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="8" width="40" height="36" rx="6" fill="#6C4CFF" />
    <rect x="4" y="8" width="20" height="36" rx="6" fill="#8A5CFF" />
    <rect x="2" y="6" width="22" height="36" rx="6" fill="#6C4CFF" />
    <rect x="2" y="6" width="4" height="36" rx="2" fill="#4D2FCC" />
    <rect x="8" y="12" width="12" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
    <rect x="8" y="16" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
    <rect x="8" y="20" width="12" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="26" y="12" width="12" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="26" y="16" width="10" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
    <circle cx="36" cy="28" r="10" fill="#FFD54A" />
    <text x="36" y="32" textAnchor="middle" fontSize="10" fill="#8B4513" fontWeight="900">📖</text>
  </svg>
);

// ── Pencil/Writing Icon  
export const WritingIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="4" width="12" height="36" rx="4" fill="#FFD54A" transform="rotate(15 8 4)" />
    <rect x="8" y="4" width="12" height="36" rx="4" fill="#FFD54A" />
    <rect x="8" y="4" width="12" height="8" rx="4" fill="#FF9F43" />
    <rect x="8" y="36" width="12" height="8" rx="3" fill="#FF4FA3" />
    <polygon points="8,44 14,40 20,44 14,52" fill="#FFC8B0" />
    <polygon points="14,48 14,40 20,44" fill="#F5A87A" />
    {/* Sparkles from pencil tip */}
    <circle cx="30" cy="20" r="4" fill="#FF4FA3" />
    <circle cx="38" cy="12" r="3" fill="#6C4CFF" />
    <circle cx="34" cy="30" r="3" fill="#4D9DFF" />
    {/* Lines being drawn */}
    <path d="M 26 38 Q 32 34 36 38 Q 40 42 44 38" stroke="#6C4CFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 26 42 Q 30 40 34 42" stroke="#8A5CFF" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="3 2" />
  </svg>
);

// ── Mic/Speaking Icon
export const SpeakingIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="16" y="4" width="16" height="26" rx="8" fill="#4D9DFF" />
    <rect x="16" y="4" width="8" height="26" rx="8" fill="rgba(255,255,255,0.2)" />
    {/* Stand */}
    <path d="M 10 24 Q 10 36 24 36 Q 38 36 38 24" stroke="#4D9DFF" strokeWidth="3" strokeLinecap="round" fill="none" />
    <rect x="21" y="36" width="6" height="8" rx="3" fill="#4D9DFF" />
    <rect x="16" y="42" width="16" height="4" rx="2" fill="#4D9DFF" />
    {/* Sound waves */}
    <path d="M 40 20 Q 44 24 40 28" stroke="#5AD66F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 43 16 Q 49 24 43 32" stroke="#5AD66F" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M 8 20 Q 4 24 8 28" stroke="#FF9F43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 5 16 Q -1 24 5 32" stroke="#FF9F43" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
    {/* Recording dot */}
    <circle cx="24" cy="16" r="4" fill="#FF4FA3" />
    <circle cx="24" cy="16" r="2" fill="white" opacity="0.7" />
  </svg>
);

// ── Star Rating (Filled)
export const StarRating: React.FC<{ count: number; max?: number; size?: number }> = ({ count, max = 3, size = 16 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill="none">
        <polygon points="8,1 10,6 15,6 11,10 12.5,15 8,12 3.5,15 5,10 1,6 6,6" fill={i < count ? '#FFD54A' : '#E8EFFF'} stroke={i < count ? '#FFC107' : '#D0DAFF'} strokeWidth="0.5" />
      </svg>
    ))}
  </div>
);

// ── Circular Progress Ring
export const ProgressRing: React.FC<{ percent: number; size?: number; color?: string; label?: string }> = ({ percent, size = 70, color = '#6C4CFF', label = '' }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#E8EFFF" strokeWidth="8" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="8" fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2 + 2} textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.22} fontWeight="900" fill={color} fontFamily="Baloo 2, cursive">{percent}%</text>
      {label && <text x={size/2} y={size/2 + size*0.24} textAnchor="middle" fontSize={size * 0.12} fill="#94A3B8" fontFamily="Nunito">{label}</text>}
    </svg>
  );
};

// ── Adventure World Map SVG
export const AdventureWorldMap: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="100%" height="100%" viewBox="0 0 900 400" fill="none" preserveAspectRatio="xMidYMid slice" className={className}>
    {/* Sky background */}
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#C5E8FF" />
        <stop offset="50%" stopColor="#E8F7FF" />
        <stop offset="100%" stopColor="#B8F5C8" />
      </linearGradient>
      <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#8AB4D8" />
        <stop offset="100%" stopColor="#6A96C0" />
      </linearGradient>
      <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#7EE89A" />
        <stop offset="100%" stopColor="#5AD66F" />
      </linearGradient>
      <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#4D9DFF" />
        <stop offset="100%" stopColor="#74BCFF" />
      </linearGradient>
      <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#FFD54A" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FF9F43" stopOpacity="0.7" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Sky */}
    <rect x="0" y="0" width="900" height="400" fill="url(#skyGrad)" />

    {/* Sun */}
    <circle cx="820" cy="60" r="40" fill="#FFD54A" opacity="0.8" />
    <circle cx="820" cy="60" r="30" fill="#FFE082" />
    {[0,45,90,135,180,225,270,315].map((a, i) => (
      <line key={i} x1={820 + 42*Math.cos(a*Math.PI/180)} y1={60 + 42*Math.sin(a*Math.PI/180)}
        x2={820 + 55*Math.cos(a*Math.PI/180)} y2={60 + 55*Math.sin(a*Math.PI/180)}
        stroke="#FFD54A" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    ))}

    {/* Background mountains */}
    <path d="M 0 240 L 120 140 L 220 200 L 320 100 L 420 180 L 500 130 L 600 200 L 700 120 L 800 180 L 900 140 L 900 400 L 0 400 Z" fill="#C8DFF0" opacity="0.5" />
    <path d="M 0 270 L 100 180 L 200 240 L 280 160 L 380 220 L 460 160 L 560 230 L 650 165 L 750 220 L 840 168 L 900 210 L 900 400 L 0 400 Z" fill="url(#mountainGrad)" opacity="0.7" />
    {/* Snow caps */}
    <path d="M 280 160 L 300 185 L 260 185 Z" fill="white" opacity="0.8" />
    <path d="M 700 120 L 718 145 L 682 145 Z" fill="white" opacity="0.8" />

    {/* Ground */}
    <path d="M 0 300 Q 225 280 450 300 Q 675 320 900 290 L 900 400 L 0 400 Z" fill="url(#groundGrad)" />

    {/* River */}
    <path d="M 0 340 Q 150 320 300 335 Q 450 350 600 325 Q 700 310 900 330" stroke="url(#riverGrad)" strokeWidth="22" fill="none" opacity="0.8" />
    <path d="M 0 340 Q 150 320 300 335 Q 450 350 600 325 Q 700 310 900 330" stroke="rgba(255,255,255,0.35)" strokeWidth="8" fill="none" />
    {/* Ripples */}
    <ellipse cx="200" cy="333" rx="20" ry="5" fill="rgba(255,255,255,0.25)" />
    <ellipse cx="500" cy="340" rx="18" ry="4" fill="rgba(255,255,255,0.25)" />

    {/* Bridge */}
    <rect x="430" y="322" width="90" height="16" rx="4" fill="#8B6B4A" />
    <rect x="430" y="316" width="90" height="8" rx="3" fill="#A0825C" />
    {[435,455,475,495,510].map((x,i) => (
      <rect key={i} x={x} y="308" width="5" height="16" rx="2" fill="#8B6B4A" />
    ))}
    <path d="M 435 308 Q 475 298 515 308" stroke="#A0825C" strokeWidth="2.5" fill="none" />

    {/* Trees */}
    {[[80,280],[160,270],[350,265],[650,270],[780,275],[850,260]].map(([x,y],i) => (
      <g key={i}>
        <rect x={x-4} y={y+18} width="8" height="16" rx="2" fill="#7B5E3E" />
        <circle cx={x} cy={y} r="18" fill="#5AD66F" />
        <circle cx={x-6} cy={y+6} r="12" fill="#4EC45E" />
        <circle cx={x+6} cy={y+6} r="12" fill="#66D680" />
        <circle cx={x} cy={y-8} r="10" fill="#78E492" />
      </g>
    ))}

    {/* Castle (Stage Boss) */}
    <g transform="translate(760, 195)">
      <rect x="0" y="30" width="80" height="55" rx="4" fill="#8AB4D8" />
      <rect x="0" y="30" width="80" height="55" rx="4" fill="url(#mountainGrad)" />
      {/* Tower left */}
      <rect x="-12" y="10" width="30" height="75" rx="4" fill="#7A9FC8" />
      {/* Tower right */}
      <rect x="62" y="10" width="30" height="75" rx="4" fill="#7A9FC8" />
      {/* Battlements */}
      {[-12,-4,4,12].map((dx,i) => <rect key={i} x={dx+3} y="6" width="6" height="8" rx="1" fill="#6A96C0" />)}
      {[62,70,78,86].map((dx,i) => <rect key={i} x={dx} y="6" width="6" height="8" rx="1" fill="#6A96C0" />)}
      {/* Main gate */}
      <path d="M 28 85 L 28 55 Q 28 45 40 45 Q 52 45 52 55 L 52 85 Z" fill="#4D2FCC" />
      {/* Door */}
      <path d="M 30 85 L 30 58 Q 30 50 40 50 Q 50 50 50 58 L 50 85 Z" fill="#3A1FA8" />
      {/* Windows */}
      <rect x="5" y="25" width="14" height="16" rx="7" fill="#4D9DFF" opacity="0.8" />
      <rect x="61" y="25" width="14" height="16" rx="7" fill="#4D9DFF" opacity="0.8" />
      <rect x="15" y="42" width="12" height="14" rx="6" fill="#4D9DFF" opacity="0.8" />
      <rect x="53" y="42" width="12" height="14" rx="6" fill="#4D9DFF" opacity="0.8" />
      {/* Flag */}
      <line x1="40" y1="5" x2="40" y2="-18" stroke="#C0C0C0" strokeWidth="2" />
      <polygon points="40,-18 55,-12 40,-6" fill="#FF4FA3" />
    </g>

    {/* Floating Islands */}
    <g transform="translate(150, 130)">
      <ellipse cx="50" cy="60" rx="55" ry="20" fill="#5AD66F" />
      <ellipse cx="50" cy="64" rx="55" ry="15" fill="#4EC45E" />
      <ellipse cx="50" cy="70" rx="50" ry="22" fill="#3DB64E" />
      <rect x="30" y="32" width="40" height="28" rx="6" fill="#A0825C" />
      <rect x="28" y="28" width="44" height="8" rx="4" fill="#8B6B4A" />
      <circle cx="50" cy="28" r="20" fill="#5AD66F" />
      <circle cx="40" cy="22" r="12" fill="#4EC45E" />
      <circle cx="58" cy="24" r="10" fill="#66D680" />
      {/* Star on island */}
      <polygon points="50,10 52,16 58,16 53,20 55,26 50,22 45,26 47,20 42,16 48,16" fill="#FFD54A" />
    </g>

    {/* Hot Air Balloon */}
    <g transform="translate(540, 60)">
      <ellipse cx="40" cy="50" rx="38" ry="50" fill="#FF4FA3" />
      <path d="M 4 50 Q 20 20 40 10 Q 60 20 76 50 Z" fill="#FFD54A" />
      <path d="M 4 50 Q 12 70 40 90 Q 68 70 76 50 Q 60 80 40 70 Q 20 80 4 50 Z" fill="#6C4CFF" />
      <path d="M 40 10 L 40 90" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <path d="M 4 50 Q 40 55 76 50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      {/* Rope & basket */}
      <line x1="28" y1="90" x2="28" y2="106" stroke="#8B6B4A" strokeWidth="2" />
      <line x1="52" y1="90" x2="52" y2="106" stroke="#8B6B4A" strokeWidth="2" />
      <rect x="22" y="106" width="36" height="18" rx="6" fill="#C8A266" />
    </g>

    {/* Animated dotted path */}
    <path d="M 60 308 Q 120 290 200 300 Q 280 310 340 295 Q 400 280 450 295 Q 540 315 610 295 Q 680 275 740 285 Q 800 295 860 280"
      stroke="url(#pathGrad)" strokeWidth="10" fill="none" strokeLinecap="round"
      strokeDasharray="20 12" filter="url(#glow)" />

    {/* Path glow */}
    <path d="M 60 308 Q 120 290 200 300 Q 280 310 340 295 Q 400 280 450 295 Q 540 315 610 295 Q 680 275 740 285 Q 800 295 860 280"
      stroke="#FFD54A" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4" />

    {/* Clouds */}
    {[[60,50],[250,30],[600,50],[730,35]].map(([x,y],i) => (
      <g key={i} transform={`translate(${x}, ${y})`} opacity="0.85">
        <ellipse cx="40" cy="25" rx="38" ry="14" fill="white" />
        <circle cx="26" cy="20" rx="17" ry="17" fill="white" />
        <circle cx="54" cy="18" rx="20" ry="20" fill="white" />
        <circle cx="40" cy="16" rx="16" ry="16" fill="white" />
        <ellipse cx="32" cy="13" rx="8" ry="4" fill="rgba(255,255,255,0.6)" />
      </g>
    ))}

    {/* Sparkles floating */}
    {[[100,100],[300,80],[550,110],[700,90],[180,200],[400,170]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="4" fill="#FFD54A" opacity={0.4 + (i%3)*0.2} />
        <circle cx={x} cy={y} r="2" fill="white" opacity="0.6" />
        <line x1={x-8} y1={y} x2={x+8} y2={y} stroke="#FFD54A" strokeWidth="1.5" opacity="0.3" />
        <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="#FFD54A" strokeWidth="1.5" opacity="0.3" />
      </g>
    ))}
  </svg>
);
