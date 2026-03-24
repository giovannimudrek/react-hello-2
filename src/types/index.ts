// ── Member / User ─────────────────────────────────────────────────────────────
export interface Member {
  id: string;
  name: string;
  initials: string;
  color: string;
}

// ── Tag / Label ────────────────────────────────────────────────────────────────
export type TagVariant = 'red' | 'yellow' | 'green';

export interface Tag {
  id: string;
  label: string;
  variant: TagVariant;
}

// ── Card (Task) ────────────────────────────────────────────────────────────────
export interface Card {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subtasks: { completed: number; total: number };
  tags: Tag[];
  assignees: string[]; // Member ids
  attachmentCount: number;
  commentCount: number;
}

// ── Column ─────────────────────────────────────────────────────────────────────
export interface Column {
  id: string;
  name: string;
  taskCount: number;
  cards: Card[];
}

// ── Board ──────────────────────────────────────────────────────────────────────
export interface Board {
  id: string;
  name: string;
  members: Member[];
  columns: Column[];
}

// ── Zustand Store ─────────────────────────────────────────────────────────────
export type ModalType = 'add-card' | 'edit-card' | 'delete-card' | 'add-column' | null;

export interface BoardStore {
  board: Board;
  searchQuery: string;
  sidebarOpen: boolean;
  activeTab: string;
  modal: ModalType;
  modalTargetColumnId: string | null;
  editingCard: Card | null;
  deletingCard: { card: Card; columnId: string } | null;

  // Actions
  setSearchQuery: (q: string) => void;
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  openModal: (type: ModalType, columnId?: string, card?: Card) => void;
  closeModal: () => void;
  addCard: (columnId: string, card: Omit<Card, 'id'>) => void;
  updateCard: (columnId: string, cardId: string, updates: Partial<Card>) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  duplicateCard: (columnId: string, cardId: string) => void;
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string, overCardId?: string) => void;
  addColumn: (name: string) => void;
  deleteColumn: (columnId: string) => void;
}
