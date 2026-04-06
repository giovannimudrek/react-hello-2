import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { BoardCardData, ColumnId } from '../types/board.types';
import { CardTag } from './CardTag';

interface BoardCardProps {
  card: BoardCardData;
  index: number;
  columnId: ColumnId;
  onDelete: (columnId: ColumnId, cardId: string) => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ card, index, columnId, onDelete }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => {
        /*
          Merge @hello-pangea/dnd base styles with our visual overrides.
          The dnd library sets `transform` and `transition` in draggableProps.style
          — we must preserve those for correct drag positioning, then layer our
          own border/shadow/rotation on top.
        */
        const baseStyle = provided.draggableProps.style as React.CSSProperties;

        /* When dragging, append a small rotation to the dnd-managed transform */
        const transform = snapshot.isDragging
          ? baseStyle?.transform
            ? `${baseStyle.transform} rotate(4deg)`
            : 'rotate(4deg)'
          : baseStyle?.transform;

        const mergedStyle: React.CSSProperties = {
          ...baseStyle,
          /* Figma card: 260x82px */
          width: '260px',
          minHeight: '82px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          position: 'relative',
          userSelect: 'none',
          cursor: snapshot.isDragging ? 'grabbing' : 'grab',
          flexShrink: 0,
          /* Visual drag state — Figma spec: border 2px #7F56D9, shadow elevated */
          border: snapshot.isDragging ? '2px solid #7F56D9' : '1px solid #E9EAEB',
          boxShadow: snapshot.isDragging
            ? '0px 12px 28px 0px rgba(10,13,18,0.3)'
            : '0px 4px 8px 0px rgba(10,13,18,0.1)',
          transform,
        };

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={mergedStyle}
          >
            {/* Title — Inter Medium 13px, #0A0D12, top 9px, left 11px, w 210px */}
            <p
              style={{
                position: 'absolute',
                top: '9px',
                left: '11px',
                width: '210px',
                height: '20px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '13px',
                color: '#0A0D12',
                lineHeight: '20px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                margin: 0,
              }}
            >
              {card.title}
            </p>

            {/* Delete button — top-right corner */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(columnId, card.id);
              }}
              style={{
                position: 'absolute',
                top: '6px',
                right: '8px',
                width: '20px',
                height: '20px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                borderRadius: '4px',
              }}
              title="Excluir card"
              aria-label="Excluir card"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L11 11M11 1L1 11"
                  stroke="#717680"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Tag — Figma: top 51px, left 11px */}
            <div style={{ position: 'absolute', top: '51px', left: '11px' }}>
              <CardTag variant={card.tag ?? 'default'} />
            </div>

            {/* Height spacer — keeps card at 82px min-height with absolute children */}
            <div style={{ height: '82px' }} aria-hidden="true" />
          </div>
        );
      }}
    </Draggable>
  );
};
