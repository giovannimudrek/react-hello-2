import React, { useState, useMemo } from 'react';
import { Board, Card, Column, FilterTab, Member } from '../../types/board.types';
import { INITIAL_BOARD, MEMBERS } from '../../data/mockData';
import { BoardHeader } from './BoardHeader';
import { BoardSidebar } from './BoardSidebar';
import { KanbanColumn } from './KanbanColumn';
import { Avatar } from '../ui/Avatar';

// ─── Modal types ──────────────────────────────────────────────────────────────
type ModalState =
  | { type: 'none' }
  | { type: 'add'; columnId: string }
  | { type: 'edit'; card: Card }
  | { type: 'delete'; cardId: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateId(): string {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function generateTagId(): string {
  return `tag-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Card Modal ───────────────────────────────────────────────────────────────
interface CardModalProps {
  mode: 'add' | 'edit';
  initialData?: Partial<Card>;
  columnId: string;
  members: Member[];
  onSave: (card: Card) => void;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({
  mode,
  initialData,
  columnId,
  members,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate ?? '');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(
    initialData?.assignees ?? []
  );

  const handleToggleAssignee = (memberId: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const card: Card = {
      id: initialData?.id ?? generateId(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || 'Sem data',
      subtasks: initialData?.subtasks ?? { completed: 0, total: 0 },
      tags: initialData?.tags ?? [{ id: generateTagId(), label: 'Feature', variant: 'green' }],
      assignees: selectedAssignees,
      attachmentCount: initialData?.attachmentCount ?? 0,
      commentCount: initialData?.commentCount ?? 0,
      columnId,
    };
    onSave(card);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'add' ? 'Adicionar card' : 'Editar card'}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Nova Tarefa' : 'Editar Tarefa'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="Fechar modal"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="card-title">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="card-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da tarefa"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="card-desc">
              Descrição
            </label>
            <textarea
              id="card-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a tarefa..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="card-date">
              Data de Entrega
            </label>
            <input
              id="card-date"
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Ex: 15 Mar. 2026"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsáveis
            </label>
            <div className="flex flex-wrap gap-2">
              {members.map((member) => {
                const selected = selectedAssignees.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleToggleAssignee(member.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selected
                        ? 'text-white border-transparent'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                    style={selected ? { backgroundColor: member.color, borderColor: member.color } : {}}
                    aria-pressed={selected}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: selected ? 'rgba(255,255,255,0.3)' : member.color }}
                    >
                      {member.initials.charAt(0)}
                    </span>
                    {member.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50"
              style={{ backgroundColor: '#7F56D9' }}
              disabled={!title.trim()}
            >
              {mode === 'add' ? 'Criar Tarefa' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Modal ─────────────────────────────────────────────────────────────
interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    onClick={(e) => e.target === e.currentTarget && onClose()}
    role="dialog"
    aria-modal="true"
    aria-label="Confirmar exclusão"
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
      style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-red-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">Deletar Tarefa</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Tem certeza que deseja deletar esta tarefa? Esta ação não pode ser desfeita.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Deletar
        </button>
      </div>
    </div>
  </div>
);

// ─── BoardPage ────────────────────────────────────────────────────────────────
export const BoardPage: React.FC = () => {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todos');
  const [activeSidebarItem, setActiveSidebarItem] = useState('tarefas');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });

  // Filter cards based on search and active tab
  const filteredColumns = useMemo<Column[]>(() => {
    return board.columns
      .filter((col) => {
        if (activeFilter === 'pendentes') return col.id === 'pendentes';
        if (activeFilter === 'concluidas') return col.id === 'concluidas';
        return true;
      })
      .map((col) => {
        if (!searchQuery.trim()) return col;
        const q = searchQuery.toLowerCase();
        return {
          ...col,
          cards: col.cards.filter(
            (c) =>
              c.title.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q)
          ),
        };
      });
  }, [board.columns, searchQuery, activeFilter]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleAddCard = (columnId: string) => {
    setModal({ type: 'add', columnId });
  };

  const handleEditCard = (card: Card) => {
    setModal({ type: 'edit', card });
  };

  const handleDeleteCard = (cardId: string) => {
    setModal({ type: 'delete', cardId });
  };

  const handleSaveCard = (card: Card) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => {
        if (modal.type === 'add' && col.id === card.columnId) {
          return { ...col, cards: [...col.cards, card] };
        }
        if (modal.type === 'edit') {
          return {
            ...col,
            cards: col.cards.map((c) => (c.id === card.id ? card : c)),
          };
        }
        return col;
      }),
    }));
    setModal({ type: 'none' });
  };

  const handleConfirmDelete = () => {
    if (modal.type !== 'delete') return;
    const cardId = modal.cardId;
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => c.id !== cardId),
      })),
    }));
    setModal({ type: 'none' });
  };

  const closeModal = () => setModal({ type: 'none' });

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'pendentes', label: 'Pendentes' },
    { id: 'concluidas', label: 'Concluídas' },
  ];

  const totalCards = board.columns.reduce((sum, col) => sum + col.cards.length, 0);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <BoardHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <BoardSidebar activeItem={activeSidebarItem} onItemClick={setActiveSidebarItem} />

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Content header: filter tabs + avatar group */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            {/* Filter tabs */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Filtrar tarefas">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeFilter === tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    activeFilter === tab.id
                      ? 'text-white'
                      : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                  style={activeFilter === tab.id ? { backgroundColor: '#7F56D9' } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Avatar group + count */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2" aria-label="Membros do board">
                {MEMBERS.slice(0, 5).map((member) => (
                  <Avatar key={member.id} member={member} size="sm" />
                ))}
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white bg-gray-200 text-gray-600">
                  +{MEMBERS.length > 5 ? MEMBERS.length - 5 : 1}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {totalCards} tarefas
              </span>
            </div>
          </div>

          {/* Board area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="flex gap-4 h-full" style={{ alignItems: 'flex-start' }}>
              {filteredColumns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  members={board.members}
                  onAddCard={handleAddCard}
                  onEditCard={handleEditCard}
                  onDeleteCard={handleDeleteCard}
                />
              ))}

              {/* Add new column button */}
              <button
                className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-gray-500 border-2 border-dashed border-gray-300 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                style={{ minWidth: '200px', height: '52px' }}
                aria-label="Adicionar nova coluna"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Coluna
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {modal.type === 'add' && (
        <CardModal
          mode="add"
          columnId={modal.columnId}
          members={board.members}
          onSave={handleSaveCard}
          onClose={closeModal}
        />
      )}
      {modal.type === 'edit' && (
        <CardModal
          mode="edit"
          initialData={modal.card}
          columnId={modal.card.columnId}
          members={board.members}
          onSave={handleSaveCard}
          onClose={closeModal}
        />
      )}
      {modal.type === 'delete' && (
        <DeleteModal onConfirm={handleConfirmDelete} onClose={closeModal} />
      )}
    </div>
  );
};
