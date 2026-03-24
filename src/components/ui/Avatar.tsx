import React from 'react';
import { Member } from '../../types/board.types';

interface AvatarProps {
  member: Member;
  size?: 'sm' | 'md';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ member, size = 'md', className = '' }) => {
  const sizeClasses = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center text-white font-semibold border-2 border-white flex-shrink-0 ${className}`}
      style={{ backgroundColor: member.color }}
      title={member.name}
      aria-label={member.name}
    >
      {member.initials}
    </div>
  );
};

interface AvatarGroupProps {
  memberIds: string[];
  members: Member[];
  max?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ memberIds, members, max = 4 }) => {
  const resolvedMembers = memberIds
    .map((id) => members.find((m) => m.id === id))
    .filter(Boolean) as Member[];

  const visible = resolvedMembers.slice(0, max);
  const extra = resolvedMembers.length - max;

  return (
    <div className="flex items-center" style={{ gap: '-4px' }}>
      <div className="flex -space-x-2">
        {visible.map((member) => (
          <Avatar key={member.id} member={member} size="sm" />
        ))}
        {extra > 0 && (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white bg-gray-200 text-gray-600 flex-shrink-0"
            aria-label={`+${extra} outros`}
          >
            +{extra}
          </div>
        )}
      </div>
    </div>
  );
};
