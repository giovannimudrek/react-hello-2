import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Card as CardType } from '../../types';
import { useBoardStore } from '../../store/boardStore';
import {
  CalendarIcon,
  SubtaskIcon,
  PaperclipIcon,
  MessageIcon,
  MoreHorizontalIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
} from '../Common/icons';

interface CardProps {
  card: CardType;
  columnId: string;
}

const TAG_STYLES: Record<string, string> = {
  red:    'bg-[#FEF3F2] text-[#D92D20]',
  yellow: 'bg-[#FFFAEB] text-[#DC6803]',
  green:  'bg-[#ECFDF3] text-[#039855]',
};

const CardComponent: React.FC<CardProps> = ({ card, columnId }) => {
  const { board, openModal, duplicateCard } = useBoardStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const resolvedAssignees = card.assignees
    .map((id) => board.members.find((m) => m.id === id))
    .filter(Boolean);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full bg-white border border-[#E9EAEB] rounded-2xl p-4 flex flex-col gap-4 cursor-grab active:cursor-grabbing transition-shadow duration-150 select-none touch-none ${
        isDragging ? 'shadow-xl' : 'hover:shadow-md'
      }`}
      aria-label={card.title}
    >
      {/* Top: Tags + Menu */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag.id}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-[18px] whitespace-nowrap ${TAG_STYLES[tag.variant] ?? TAG_STYLES.green}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Menu button */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-6 h-6 bg-transparent border-none rounded p-0 cursor-pointer text-[#414651] transition-colors hover:bg-[#F5F5F5]"
            aria-label="Card actions"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <MoreHorizontalIcon />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-7 z-50 bg-white border border-[#E9EAEB] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-1 min-w-[160px]"
              role="menu"
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#414651] rounded hover:bg-[#F5F5F5] hover:text-[#0A0D12] transition-colors"
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  openModal('edit-card', columnId, card);
                }}
              >
                <EditIcon />
                Edit
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#414651] rounded hover:bg-[#F5F5F5] hover:text-[#0A0D12] transition-colors"
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  duplicateCard(columnId, card.id);
                }}
              >
                <CopyIcon />
                Duplicate
              </button>
              <div className="h-px bg-[#E9EAEB] my-1" role="separator" />
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#D92D20] rounded hover:bg-[#FEF3F2] transition-colors"
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  openModal('delete-card', columnId, card);
                }}
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body: Title + Description */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold leading-5 text-[#414651]">{card.title}</h3>
        <p className="text-sm font-normal leading-5 text-[#717680] line-clamp-2">{card.description}</p>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1 text-sm font-normal leading-5 text-[#414651]">
          <CalendarIcon />
          {card.dueDate}
        </span>
        <span className="flex items-center gap-1 text-sm font-normal leading-5 text-[#414651]">
          <SubtaskIcon />
          {card.subtasks.completed}/{card.subtasks.total}
        </span>
      </div>

      {/* Footer: Assignees + Counters */}
      <div className="flex items-center justify-between gap-2">
        {/* Assignees */}
        <div className="flex items-center">
          {resolvedAssignees.map((member, i) => (
            <div
              key={member!.id}
              className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-semibold text-white flex-shrink-0 cursor-pointer"
              style={{
                backgroundColor: member!.color,
                marginLeft: i === 0 ? 0 : '-4px',
              }}
              title={member!.name}
            >
              {member!.initials}
            </div>
          ))}
        </div>

        {/* Counters */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm font-normal leading-5 text-[#414651]">
            <PaperclipIcon />
            {card.attachmentCount}
          </span>
          <span className="flex items-center gap-1 text-sm font-normal leading-5 text-[#414651]">
            <MessageIcon />
            {card.commentCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
