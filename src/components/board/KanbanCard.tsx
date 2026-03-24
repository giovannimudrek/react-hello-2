import React, { useState } from 'react';
import { Card, Member } from '../../types/board.types';
import { Badge } from '../ui/Badge';
import { AvatarGroup } from '../ui/Avatar';

interface KanbanCardProps {
  card: Card;
  members: Member[];
  onEdit?: (card: Card) => void;
  onDelete?: (cardId: string) => void;
}

const CalendarIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SubtaskIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

const ChatIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const DotsIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 5c.828 0 1.5-.672 1.5-1.5S12.828 2 12 2s-1.5.672-1.5 1.5S11.172 5 12 5zm0 7c.828 0 1.5-.672 1.5-1.5S12.828 10 12 10s-1.5.672-1.5 1.5S11.172 12 12 12zm0 7c.828 0 1.5-.672 1.5-1.5S12.828 17 12 17s-1.5.672-1.5 1.5S11.172 19 12 19z" />
  </svg>
);

export const KanbanCard: React.FC<KanbanCardProps> = ({ card, members, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onEdit?.(card);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete?.(card.id);
  };

  return (
    <article
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-200 relative"
      style={{
        boxShadow: isHovered
          ? '0 4px 8px rgba(0,0,0,0.10)'
          : '0 1px 3px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-1px)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit?.(card)}
      aria-label={`Card: ${card.title}`}
    >
      {/* Tags row + more menu */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <Badge key={tag.id} tag={tag} />
          ))}
        </div>
        <div className="relative flex-shrink-0">
          <button
            className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            onClick={handleMenuToggle}
            aria-label="Mais opções"
            aria-expanded={menuOpen}
          >
            <DotsIcon />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-7 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-36"
              style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.12)' }}
            >
              <button
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={handleEdit}
              >
                Editar
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={handleDelete}
              >
                Deletar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-semibold text-gray-900 mb-1.5 leading-snug"
        style={{ fontSize: '15px' }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="text-gray-500 mb-3 leading-normal line-clamp-2"
        style={{ fontSize: '13px', letterSpacing: '0.15px' }}
      >
        {card.description}
      </p>

      {/* Meta row 1: date + subtasks */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: '12px' }}>
          <CalendarIcon />
          <span>{card.dueDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: '12px' }}>
          <SubtaskIcon />
          <span>{card.subtasks.completed}/{card.subtasks.total}</span>
        </div>
      </div>

      {/* Meta row 2: avatars + attachment + comments */}
      <div className="flex items-center justify-between">
        <AvatarGroup memberIds={card.assignees} members={members} max={4} />
        <div className="flex items-center gap-3 text-gray-400" style={{ fontSize: '12px' }}>
          <div className="flex items-center gap-1">
            <PaperclipIcon />
            <span>{card.attachmentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChatIcon />
            <span>{card.commentCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
