import React from 'react';

export const FloatingMascots: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <span className="absolute top-8 left-[20%] text-4xl opacity-30 animate-float select-none">☁️</span>
      <span className="absolute top-16 right-[15%] text-5xl opacity-30 animate-float select-none" style={{ animationDelay: '1.5s' }}>☁️</span>
      <span className="absolute top-32 left-[45%] text-3xl opacity-20 animate-float select-none" style={{ animationDelay: '2.5s' }}>🎈</span>
      <span className="absolute top-48 right-[30%] text-3xl opacity-25 animate-float select-none">✨</span>
    </div>
  );
};
