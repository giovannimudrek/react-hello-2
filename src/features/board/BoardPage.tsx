import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { ColumnId } from './types/board.types';
import { useBoardState } from './hooks/useBoardState';
import { BoardColumn } from './components/BoardColumn';
import { AddCardModal } from './components/AddCardModal';

export const BoardPage: React.FC = () => {
  const { columns, addCard, deleteCard, moveCardDnd } = useBoardState();

  /* Modal state: null = closed, otherwise the columnId being targeted */
  const [modalColumnId, setModalColumnId] = useState<ColumnId | null>(null);

  const activeColumn = columns.find((c) => c.id === modalColumnId) ?? null;

  function handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    moveCardDnd(
      draggableId,
      source.droppableId as ColumnId,
      destination.droppableId as ColumnId,
      destination.index
    );
  }

  function handleConfirmAddCard(columnId: ColumnId, title: string) {
    addCard(columnId, title);
    setModalColumnId(null);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/*
        Topbar: height 64px, bg white, border-bottom 1px #E9EAEB
        Brand accent: 4px x 64px at far left, color #7F56D9
        Title: "Kanban Board" — Inter Bold 20px, #0A0D12, left 24, top 20
      */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E9EAEB',
          zIndex: 100,
        }}
      >
        {/* Brand accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '64px',
            backgroundColor: '#7F56D9',
          }}
        />
        {/* App title */}
        <p
          style={{
            position: 'absolute',
            top: '20px',
            left: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '20px',
            color: '#0A0D12',
            lineHeight: 'normal',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Kanban Board
        </p>
      </header>

      {/*
        Subbar: height 56px, bg white, border-bottom 1px #E9EAEB, top 64px
        Title: "Board de Gerenciamento" — Inter Semi Bold 16px, #0A0D12, left 40
      */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          height: '56px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E9EAEB',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            paddingLeft: '40px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#0A0D12',
            lineHeight: 'normal',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Board de Gerenciamento
        </p>
      </div>

      {/*
        Board area: bg #F5F5F5, padding-top 144px (64+56+24), padding-lateral 40px
        Columns in a horizontal row, gap 24px
      */}
      <main
        style={{
          paddingTop: '144px',
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingBottom: '40px',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            {columns.map((col) => (
              <BoardColumn
                key={col.id}
                columnId={col.id}
                title={col.title}
                accentColor={col.accentColor}
                cards={col.cards}
                onAddCard={(id) => setModalColumnId(id)}
                onDeleteCard={deleteCard}
              />
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Add card modal — rendered as portal-like overlay */}
      {modalColumnId !== null && activeColumn !== null && (
        <AddCardModal
          columnId={activeColumn.id}
          columnTitle={activeColumn.title}
          onConfirm={handleConfirmAddCard}
          onCancel={() => setModalColumnId(null)}
        />
      )}
    </div>
  );
};
