import React from 'react';
import { Column, Card, Member } from '../../types/board.types';
import { KanbanCard } from './KanbanCard';
import { AddCardButton } from './AddCardButton';

interface KanbanColumnProps {
  column: Column;
  members: Member[];
  onAddCard: (columnId: string) => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
  onMoveCard?: (cardId: string, targetColumnId: string) => void;
}

const columnHeaderColors: Record<string, string> = {
  backlog: '#6941C6',
  pendentes: '#DC6803',
  concluidas: '#039855',
};

const columnDotColors: Record<string, string> = {
  backlog: 'bg-purple-500',
  pendentes: 'bg-orange-500',
  concluidas: 'bg-green-500',
};

const DotsMenuIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 12c0 .828-.672 1.5-1.5 1.5S2 12.828 2 12s.672-1.5 1.5-1.5S5 11.172 5 12zm7 0c0 .828-.672 1.5-1.5 1.5S9 12.828 9 12s.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm7 0c0 .828-.672 1.5-1.5 1.5S16 12.828 16 12s.672-1.5 1.5-1.5 1.5.672 1.5 1.5z" />
  </svg>
);

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  members,
  onAddCard,
  onEditCard,
  onDeleteCard,
}) => {
  const accentColor = columnHeaderColors[column.id] || '#6941C6';
  const dotClass = columnDotColors[column.id] || 'bg-purple-500';
  const cardCount = column.cards.length;

  return (
    <div
      className="flex flex-col rounded-xl bg-gray-50 border border-gray-200"
      style={{ minWidth: '320px', width: '320px', flex: '0 0 320px' }}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${dotClass}`} aria-hidden="true" />
          <h2
            className="font-semibold text-gray-800"
            style={{ fontSize: '14px', letterSpacing: '0.1px' }}
          >
            {column.name}
          </h2>
          <span
            className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: accentColor, fontSize: '11px' }}
          >
            {cardCount}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Add button */}
          <button
            onClick={() => onAddCard(column.id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-purple-500"
            style={{ backgroundColor: accentColor }}
            aria-label={`Adicionar card em ${column.name}`}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          {/* More menu */}
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label={`Mais opções para ${column.name}`}
          >
            <DotsMenuIcon />
          </button>
        </div>
      </div>

      {/* Cards list */}
      <div
        className="flex flex-col gap-3 p-3 overflow-y-auto"
        style={{ minHeight: '200px', maxHeight: 'calc(100vh - 280px)' }}
        role="list"
        aria-label={`Cards em ${column.name}`}
      >
        {column.cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">Nenhuma tarefa</p>
            <p className="text-xs text-gray-400 mt-1">Clique em + para adicionar</p>
          </div>
        ) : (
          column.cards.map((card) => (
            <div key={card.id} role="listitem">
              <KanbanCard
                card={card}
                members={members}
                onEdit={onEditCard}
                onDelete={onDeleteCard}
              />
            </div>
          ))
        )}
        <AddCardButton onClick={() => onAddCard(column.id)} />
      </div>
    </div>
  );
};
