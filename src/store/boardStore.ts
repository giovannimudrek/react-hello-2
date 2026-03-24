import { create } from 'zustand';
import type { BoardStore, Board, Card, ModalType } from '../types';

// ── Initial Mock Data (fiel ao design Figma node 1:2) ─────────────────────────
const INITIAL_BOARD: Board = {
  id: 'board-1',
  name: 'Task View',
  members: [
    { id: 'm1', name: 'Ana Silva',      initials: 'AS', color: '#7F56D9' },
    { id: 'm2', name: 'Bruno Costa',    initials: 'BC', color: '#039855' },
    { id: 'm3', name: 'Carla Mendes',   initials: 'CM', color: '#DC6803' },
    { id: 'm4', name: 'Diego Rocha',    initials: 'DR', color: '#D92D20' },
    { id: 'm5', name: 'Elisa Faria',    initials: 'EF', color: '#0086C9' },
    { id: 'm6', name: 'Fabio Lima',     initials: 'FL', color: '#E31B54' },
    { id: 'm7', name: 'Gabriela Nunes', initials: 'GN', color: '#6938EF' },
  ],
  columns: [
    {
      id: 'col-backlog',
      name: 'Backlog',
      taskCount: 10,
      cards: [
        {
          id: 'card-1',
          title: 'Customer Support Expert',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
          dueDate: '4 Mar. 2026',
          subtasks: { completed: 4, total: 12 },
          tags: [
            { id: 't1', label: 'Urgente', variant: 'red' },
            { id: 't2', label: 'Interno',  variant: 'yellow' },
            { id: 't3', label: 'Feature',  variant: 'green' },
          ],
          assignees: ['m1', 'm2', 'm3'],
          attachmentCount: 8,
          commentCount: 8,
        },
        {
          id: 'card-2',
          title: 'UI Design System Update',
          description: 'Atualizar os componentes do design system com os novos tokens de cor.',
          dueDate: '10 Mar. 2026',
          subtasks: { completed: 2, total: 8 },
          tags: [
            { id: 't4', label: 'Design',  variant: 'yellow' },
            { id: 't5', label: 'Interno', variant: 'green' },
          ],
          assignees: ['m2', 'm4'],
          attachmentCount: 3,
          commentCount: 5,
        },
        {
          id: 'card-3',
          title: 'API Integration Planning',
          description: 'Mapear todos os endpoints necessários para integração com o backend.',
          dueDate: '15 Mar. 2026',
          subtasks: { completed: 0, total: 6 },
          tags: [{ id: 't6', label: 'Urgente', variant: 'red' }],
          assignees: ['m3', 'm5', 'm6'],
          attachmentCount: 2,
          commentCount: 12,
        },
        {
          id: 'card-4',
          title: 'Database Schema Review',
          description: 'Revisar o schema do banco de dados para suportar os novos requisitos.',
          dueDate: '20 Mar. 2026',
          subtasks: { completed: 1, total: 4 },
          tags: [
            { id: 't7', label: 'Interno',  variant: 'yellow' },
            { id: 't8', label: 'Backend',  variant: 'green' },
          ],
          assignees: ['m1', 'm7'],
          attachmentCount: 5,
          commentCount: 3,
        },
      ],
    },
    {
      id: 'col-pendentes',
      name: 'Pendentes',
      taskCount: 2,
      cards: [
        {
          id: 'card-5',
          title: 'Mobile Responsive Layout',
          description: 'Implementar o layout responsivo para dispositivos móveis.',
          dueDate: '8 Mar. 2026',
          subtasks: { completed: 3, total: 7 },
          tags: [
            { id: 't9',  label: 'Urgente',  variant: 'red' },
            { id: 't10', label: 'Frontend', variant: 'green' },
          ],
          assignees: ['m2', 'm3', 'm4'],
          attachmentCount: 4,
          commentCount: 6,
        },
        {
          id: 'card-6',
          title: 'User Authentication Flow',
          description: 'Desenvolver o fluxo completo de autenticação com JWT.',
          dueDate: '12 Mar. 2026',
          subtasks: { completed: 5, total: 9 },
          tags: [{ id: 't11', label: 'Interno', variant: 'yellow' }],
          assignees: ['m5', 'm6'],
          attachmentCount: 1,
          commentCount: 9,
        },
      ],
    },
    {
      id: 'col-concluidas',
      name: 'Concluídas',
      taskCount: 3,
      cards: [
        {
          id: 'card-7',
          title: 'Project Setup & Configuration',
          description: 'Configurar o ambiente de desenvolvimento e estrutura inicial.',
          dueDate: '1 Mar. 2026',
          subtasks: { completed: 6, total: 6 },
          tags: [{ id: 't12', label: 'Feature', variant: 'green' }],
          assignees: ['m1', 'm2'],
          attachmentCount: 2,
          commentCount: 4,
        },
        {
          id: 'card-8',
          title: 'Stakeholder Presentation',
          description: 'Preparar e apresentar o progresso do projeto para os stakeholders.',
          dueDate: '2 Mar. 2026',
          subtasks: { completed: 4, total: 4 },
          tags: [
            { id: 't13', label: 'Interno', variant: 'yellow' },
            { id: 't14', label: 'Feature', variant: 'green' },
          ],
          assignees: ['m3', 'm7'],
          attachmentCount: 7,
          commentCount: 2,
        },
        {
          id: 'card-9',
          title: 'Requirements Documentation',
          description: 'Documentar todos os requisitos funcionais e não-funcionais.',
          dueDate: '28 Feb. 2026',
          subtasks: { completed: 8, total: 8 },
          tags: [
            { id: 't15', label: 'Urgente', variant: 'red' },
            { id: 't16', label: 'Docs',    variant: 'green' },
          ],
          assignees: ['m4', 'm5', 'm6', 'm1'],
          attachmentCount: 10,
          commentCount: 15,
        },
      ],
    },
  ],
};

// ── Store ──────────────────────────────────────────────────────────────────────
let cardIdCounter = 100;
let columnIdCounter = 10;

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: INITIAL_BOARD,
  searchQuery: '',
  sidebarOpen: true,
  activeTab: 'board',
  modal: null,
  modalTargetColumnId: null,
  editingCard: null,
  deletingCard: null,

  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  openModal: (type: ModalType, columnId?: string, card?: Card) =>
    set({
      modal: type,
      modalTargetColumnId: columnId ?? null,
      editingCard: card ?? null,
      deletingCard: card && columnId ? { card, columnId } : null,
    }),
  closeModal: () =>
    set({ modal: null, modalTargetColumnId: null, editingCard: null, deletingCard: null }),

  addCard: (columnId, cardData) => {
    const newCard: Card = { ...cardData, id: `card-${++cardIdCounter}` };
    set((s) => ({
      board: {
        ...s.board,
        columns: s.board.columns.map((col) =>
          col.id === columnId
            ? { ...col, cards: [...col.cards, newCard], taskCount: col.taskCount + 1 }
            : col
        ),
      },
    }));
  },

  updateCard: (columnId, cardId, updates) => {
    set((s) => ({
      board: {
        ...s.board,
        columns: s.board.columns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                cards: col.cards.map((c) => (c.id === cardId ? { ...c, ...updates } : c)),
              }
            : col
        ),
      },
    }));
  },

  deleteCard: (columnId, cardId) => {
    set((s) => ({
      board: {
        ...s.board,
        columns: s.board.columns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                cards: col.cards.filter((c) => c.id !== cardId),
                taskCount: Math.max(0, col.taskCount - 1),
              }
            : col
        ),
      },
    }));
  },

  duplicateCard: (columnId, cardId) => {
    const { board } = get();
    const col = board.columns.find((c) => c.id === columnId);
    if (!col) return;
    const card = col.cards.find((c) => c.id === cardId);
    if (!card) return;
    const duplicate: Card = {
      ...card,
      id: `card-${++cardIdCounter}`,
      title: `${card.title} (copy)`,
    };
    set((s) => ({
      board: {
        ...s.board,
        columns: s.board.columns.map((c) =>
          c.id === columnId
            ? {
                ...c,
                cards: [
                  ...c.cards.slice(0, c.cards.findIndex((x) => x.id === cardId) + 1),
                  duplicate,
                  ...c.cards.slice(c.cards.findIndex((x) => x.id === cardId) + 1),
                ],
                taskCount: c.taskCount + 1,
              }
            : c
        ),
      },
    }));
  },

  moveCard: (cardId, fromColumnId, toColumnId, overCardId) => {
    set((s) => {
      const fromCol = s.board.columns.find((c) => c.id === fromColumnId);
      if (!fromCol) return s;
      const card = fromCol.cards.find((c) => c.id === cardId);
      if (!card) return s;

      const newColumns = s.board.columns.map((col) => {
        if (col.id === fromColumnId && col.id === toColumnId) {
          // Reorder within same column
          const cards = col.cards.filter((c) => c.id !== cardId);
          if (overCardId) {
            const idx = cards.findIndex((c) => c.id === overCardId);
            cards.splice(idx >= 0 ? idx : cards.length, 0, card);
          } else {
            cards.push(card);
          }
          return { ...col, cards };
        }
        if (col.id === fromColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
            taskCount: Math.max(0, col.taskCount - 1),
          };
        }
        if (col.id === toColumnId) {
          const cards = [...col.cards];
          if (overCardId) {
            const idx = cards.findIndex((c) => c.id === overCardId);
            cards.splice(idx >= 0 ? idx : cards.length, 0, card);
          } else {
            cards.push(card);
          }
          return { ...col, cards, taskCount: col.taskCount + 1 };
        }
        return col;
      });

      return { board: { ...s.board, columns: newColumns } };
    });
  },

  addColumn: (name) => {
    const newCol = {
      id: `col-${++columnIdCounter}`,
      name,
      taskCount: 0,
      cards: [],
    };
    set((s) => ({ board: { ...s.board, columns: [...s.board.columns, newCol] } }));
  },

  deleteColumn: (columnId) => {
    set((s) => ({
      board: {
        ...s.board,
        columns: s.board.columns.filter((c) => c.id !== columnId),
      },
    }));
  },
}));
