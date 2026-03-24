import React from 'react';
import { Tag } from '../../types/board.types';

interface BadgeProps {
  tag: Tag;
}

const variantStyles: Record<Tag['variant'], string> = {
  red: 'bg-red-100 text-red-700 border border-red-200',
  yellow: 'bg-orange-100 text-orange-700 border border-orange-200',
  green: 'bg-green-100 text-green-700 border border-green-200',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200',
};

export const Badge: React.FC<BadgeProps> = ({ tag }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium tracking-wide ${variantStyles[tag.variant]}`}
      style={{ fontSize: '11px', letterSpacing: '0.5px' }}
    >
      {tag.label}
    </span>
  );
};
