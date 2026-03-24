import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import { useBoardStore } from '../../store/boardStore';
import type { Card } from '../../types';
import ColumnComponent from '../Column/Column';
import CardComponent from '../Card/Card';
import FilterTabs from './FilterTabs';
import { PlusSmIcon } from '../Common/icons';

const AvatarAddButton: React.FC = () => {
  const { board } = useBoardStore();
  const visibleAvatars = board.members.slice(0, 5);
  const overflowCount = board.members.length - 5;

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Avatar group */}
      <div className="flex items-center">
        {visibleAvatars.map((member, i) => (
          <div
            key={member.id}
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0 cursor-pointer transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: member.color,
              marginLeft: i === 0 ? 0 : '-10px',
              zIndex: visibleAvatars.length - i,
              position: 'relative',
            }}
            title={member.name}
            aria-label={member.name}
          >
            {member.initials}
          </div>
        ))}
        {overflowCount > 0 && (
          <span
            className="text-sm font-medium text-[#414654] ml-2"
            aria-label={`+${overflowCount} more members`}
          >
            +{overflowCount}
          </span>
        )}
      </div>

      {/* Add member button */}
      <button
        className="w-8 h-8 rounded-full border-2 border-[#7F57D3] bg-white flex items-center justify-center text-[#7F57D3] cursor-pointer hover:bg-[#F3EBF9] transition-colors"
        aria-label="Add collaborator"
        title="Add collaborator"
      >
        <PlusSmIcon />
      </button>
    </div>
  );
};

const KanbanBoard: React.FC = () => {
  const { board, searchQuery, activeTab, moveCard } = useBoardStore();
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Filter cards by search query and active tab
  const getFilteredCards = (columnId: string, cards: Card[]) => {
    let filtered = cards;

    // Tab filter
    if (activeTab === 'pending') {
      // Pendentes = col-pendentes only
      if (columnId !== 'col-pendentes') return [];
    } else if (activeTab === 'completed') {
      // Concluídas = col-concluidas only
      if (columnId !== 'col-concluidas') return [];
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardId = active.id as string;
    const columnId = active.data.current?.columnId as string;
    const column = board.columns.find((c) => c.id === columnId);
    const card = column?.cards.find((c) => c.id === cardId);
    if (card) {
      setActiveCard(card);
      setActiveColumnId(columnId);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      // over could be a column id or a card id
      const overData = over.data.current;
      const overId = over.id as string;
      if (overData?.columnId) {
        setOverColumnId(overData.columnId);
      } else {
        // It's a column itself
        const col = board.columns.find((c) => c.id === overId);
        if (col) setOverColumnId(overId);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    setActiveColumnId(null);
    setOverColumnId(null);

    if (!over) return;

    const cardId = active.id as string;
    const fromColumnId = active.data.current?.columnId as string;

    // Determine target column
    const overData = over.data.current;
    const toColumnId: string = overData?.columnId ?? (over.id as string);

    if (!fromColumnId || !toColumnId) return;

    const overCardId = overData?.columnId ? (over.id as string) : undefined;
    moveCard(cardId, fromColumnId, toColumnId, overCardId);
  };

  const columnsWithFiltered = board.columns.map((col) => ({
    ...col,
    cards: getFilteredCards(col.id, col.cards),
  }));

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <FilterTabs />
      <AvatarAddButton />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 flex-1 overflow-x-auto pb-4">
          {columnsWithFiltered.map((col) => (
            <ColumnComponent
              key={col.id}
              column={col}
              isOver={overColumnId === col.id}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard && activeColumnId ? (
            <div className="opacity-90 rotate-[2deg]">
              <CardComponent card={activeCard} columnId={activeColumnId} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
