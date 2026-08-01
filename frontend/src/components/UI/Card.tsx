import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-xl border-4 border-white rounded-[32px] p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
};
