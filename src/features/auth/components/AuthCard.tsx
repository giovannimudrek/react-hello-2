import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0px 20px 24px -4px rgba(10,13,18,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '440px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}
