import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { BoardCardData, ColumnId } from '../types/board.types';
import { BoardCard } from './BoardCard';

interface BoardColumnProps {
  columnId: ColumnId;
  title: string;
  accentColor: string;
  cards: BoardCardData[];
  onAddCard: (columnId: ColumnId) => void;
  onDeleteCard: (columnId: ColumnId, cardId: string) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  columnId,
  title,
  accentColor,
  cards,
  onAddCard,
  onDeleteCard,
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        /*
          Column outer: 300px wide, radius 12px, border 1px #E9EAEB,
          bg #F5F5F5 (or #F4EBFF when drag-over), overflow visible to allow
          inner scroll, position relative for accent bar.
          During drag-over: bg #F4EBFF, border 2px solid #7F56D9
        */
        <div
          style={{
            width: '300px',
            minWidth: '300px',
            borderRadius: '12px',
            border: snapshot.isDraggingOver
              ? '2px solid #7F56D9'
              : '1px solid #E9EAEB',
            backgroundColor: snapshot.isDraggingOver ? '#F4EBFF' : '#F5F5F5',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            /* Max height + internal scroll for many cards */
            maxHeight: 'calc(100vh - 180px)',
            overflow: 'hidden',
          }}
        >
          {/* Accent bar: 4px height, full width, positioned -1px to cover border */}
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              left: '-1px',
              width: '300px',
              height: '4px',
              backgroundColor: accentColor,
              borderRadius: '12px 12px 0 0',
              zIndex: 1,
            }}
          />

          {/* Header area: 51px tall until divider */}
          <div
            style={{
              position: 'relative',
              height: '51px',
              flexShrink: 0,
            }}
          >
            {/* Column title — Inter Semi Bold 15px, #0A0D12, left 15, top 14 */}
            <p
              style={{
                position: 'absolute',
                top: '14px',
                left: '15px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                color: '#0A0D12',
                lineHeight: 'normal',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </p>

            {/*
              Badge: 28x22px, radius 11px, bg = accentColor
              Positioned right: 300 - 255 - 28 = 17px from right
            */}
            <div
              style={{
                position: 'absolute',
                top: '13px',
                right: '17px',
                width: '28px',
                height: '22px',
                borderRadius: '11px',
                backgroundColor: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  color: '#0A0D12',
                  lineHeight: 'normal',
                }}
              >
                {cards.length}
              </span>
            </div>

            {/* Divider — 1px #E9EAEB at bottom of header */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '-1px',
                width: '300px',
                height: '1px',
                backgroundColor: snapshot.isDraggingOver ? '#D6BBFB' : '#E9EAEB',
              }}
            />
          </div>

          {/*
            Scrollable cards area.
            padding 19px lateral, gap 8px, starts after header (top 67px = 51+16)
          */}
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 19px 12px 19px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              /* Custom scrollbar: thin & subtle */
              scrollbarWidth: 'thin',
              scrollbarColor: '#E9EAEB transparent',
            }}
          >
            {/* Empty state — shown only when no cards and not dragging over */}
            {cards.length === 0 && !snapshot.isDraggingOver && (
              /*
                Empty area: 260x90px, bg #FAFAFB, radius 8px
              */
              <div
                style={{
                  width: '260px',
                  minHeight: '90px',
                  backgroundColor: '#FAFAFB',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: '18px',
                  boxSizing: 'border-box',
                  flexShrink: 0,
                }}
              >
                {/* Line 1: Inter Regular 12px, #717680 */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#717680',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  Nenhum card aqui ainda.
                </p>
                {/* Line 2: Inter Regular 11px, #9999A6, top 40 relative */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '11px',
                    color: '#9999A6',
                    margin: '4px 0 0 0',
                    textAlign: 'center',
                  }}
                >
                  Clique em '+ Novo card' para comecar.
                </p>
              </div>
            )}

            {/* Drop zone indicator — shown when dragging over an empty column */}
            {snapshot.isDraggingOver && cards.length === 0 && (
              <div
                style={{
                  width: '260px',
                  height: '82px',
                  backgroundColor: 'rgba(229,216,253,0.6)',
                  border: '2px dashed #7F56D9',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#7F56D9',
                  }}
                >
                  Soltar aqui
                </span>
              </div>
            )}

            {/* Cards list */}
            {cards.map((card, index) => (
              <BoardCard
                key={card.id}
                card={card}
                index={index}
                columnId={columnId}
                onDelete={onDeleteCard}
              />
            ))}

            {provided.placeholder}
          </div>

          {/* Add card button — always at bottom, outside scroll area */}
          <div style={{ padding: '0 19px 12px 19px', flexShrink: 0 }}>
            {/*
              260x34px, radius 6px, border dashed 1px rgba(127,86,217,0.45),
              bg white, text Inter Semi Bold 13px #7F56D9, centered
            */}
            <button
              onClick={() => onAddCard(columnId)}
              style={{
                width: '260px',
                height: '34px',
                borderRadius: '6px',
                border: '1px dashed rgba(127,86,217,0.45)',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: '#7F56D9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              + Novo card
            </button>
          </div>
        </div>
      )}
    </Droppable>
  );
};
