import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Column as ColumnType } from '../../types';
import { useBoardStore } from '../../store/boardStore';
import CardComponent from '../Card/Card';
import { PlusIcon, PlusSmIcon } from '../Common/icons';

interface ColumnProps {
  column: ColumnType;
  isOver: boolean;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, isOver }) => {
  const { openModal } = useBoardStore();
  const { setNodeRef } = useDroppable({ id: column.id });

  const cardIds = column.cards.map((c) => c.id);

  return (
    <div
      className={`w-[378px] flex-shrink-0 bg-white border rounded-xl rounded-b-none flex flex-col overflow-hidden transition-colors duration-150 ${
        isOver ? 'border-[#7F56D9] border-2' : 'border-[#E9EAEB]'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold leading-6 text-[#0A0D12]">{column.name}</h2>
          <span className="text-xs font-normal leading-[18px] text-[#414651]">
            {column.cards.length} tasks
          </span>
        </div>
        <button
          onClick={() => openModal('add-card', column.id)}
          className="w-9 h-9 flex items-center justify-center bg-transparent border border-[#7F56D9] rounded-lg cursor-pointer text-[#7F56D9] transition-colors hover:bg-[#F4EBFF] flex-shrink-0"
          aria-label={`Add card to ${column.name}`}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Cards List */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col gap-2.5 scrollbar-thin min-h-[80px]"
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {column.cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-[#E9EAEB] rounded-lg gap-3 p-6 text-center">
              <span className="text-sm text-[#717680]">No tasks in this column</span>
              <button
                onClick={() => openModal('add-card', column.id)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#7F56D9] bg-[#F4EBFF] border border-[#7F56D9] rounded-lg cursor-pointer transition-colors hover:bg-[#ede9fe]"
              >
                <PlusSmIcon />
                Add task
              </button>
            </div>
          ) : (
            column.cards.map((card) => (
              <CardComponent key={card.id} card={card} columnId={column.id} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default ColumnComponent;
