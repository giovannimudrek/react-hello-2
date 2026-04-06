import { useState } from 'react';
import { BoardColumnData, BoardCardData, ColumnId, TagVariant } from '../types/board.types';

const INITIAL_COLUMNS: BoardColumnData[] = [
  {
    id: 'todo',
    title: 'Para Fazer',
    accentColor: '#3882E0',
    badgeColor: '#3882E0',
    cards: [
      { id: 'card-1', title: 'Implementar autenticacao OAuth', tag: 'feature' },
      { id: 'card-2', title: 'Revisar PR de integracao', tag: 'review' },
      { id: 'card-3', title: 'Escrever testes unitarios', tag: 'teste' },
    ],
  },
  {
    id: 'inprogress',
    title: 'Em andamento',
    accentColor: '#D4900D',
    badgeColor: '#D4900D',
    cards: [
      { id: 'card-4', title: 'Design do componente de tabela', tag: 'design' },
      { id: 'card-5', title: 'Refatorar servico de notificacoes', tag: 'refactor' },
    ],
  },
  {
    id: 'done',
    title: 'Concluido',
    accentColor: '#22A863',
    badgeColor: '#22A863',
    cards: [
      { id: 'card-6', title: 'Configurar pipeline CI/CD', tag: 'devops' },
      { id: 'card-7', title: 'Documentar endpoints REST', tag: 'docs' },
    ],
  },
];

function generateId(): string {
  return `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function useBoardState() {
  const [columns, setColumns] = useState<BoardColumnData[]>(INITIAL_COLUMNS);

  function addCard(columnId: ColumnId, title: string, tag?: TagVariant) {
    const newCard: BoardCardData = {
      id: generateId(),
      title: title.trim(),
      tag: tag ?? 'default',
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
  }

  function deleteCard(columnId: ColumnId, cardId: string) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  }

  function moveCard(cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId) {
    if (fromColumnId === toColumnId) return;

    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === fromColumnId);
      const card = fromCol?.cards.find((c) => c.id === cardId);
      if (!card) return prev;

      return prev.map((col) => {
        if (col.id === fromColumnId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toColumnId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
    });
  }

  function moveCardDnd(
    cardId: string,
    fromColumnId: ColumnId,
    toColumnId: ColumnId,
    toIndex: number
  ) {
    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === fromColumnId);
      const card = fromCol?.cards.find((c) => c.id === cardId);
      if (!card) return prev;

      if (fromColumnId === toColumnId) {
        return prev.map((col) => {
          if (col.id === fromColumnId) {
            const newCards = [...col.cards];
            const fromIndex = newCards.findIndex((c) => c.id === cardId);
            newCards.splice(fromIndex, 1);
            newCards.splice(toIndex, 0, card);
            return { ...col, cards: newCards };
          }
          return col;
        });
      }

      return prev.map((col) => {
        if (col.id === fromColumnId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toColumnId) {
          const newCards = [...col.cards];
          newCards.splice(toIndex, 0, card);
          return { ...col, cards: newCards };
        }
        return col;
      });
    });
  }

  return { columns, addCard, deleteCard, moveCard, moveCardDnd };
}
