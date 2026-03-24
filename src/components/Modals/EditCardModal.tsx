import React, { useState, useEffect } from 'react';
import { useBoardStore } from '../../store/boardStore';
import type { TagVariant } from '../../types';
import { CloseIcon } from '../Common/icons';

const EditCardModal: React.FC = () => {
  const { editingCard, modalTargetColumnId, closeModal, updateCard } = useBoardStore();

  const [title, setTitle]       = useState(editingCard?.title ?? '');
  const [description, setDesc]  = useState(editingCard?.description ?? '');
  const [dueDate, setDueDate]   = useState(editingCard?.dueDate ?? '');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

  if (!editingCard || !modalTargetColumnId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    updateCard(modalTargetColumnId, editingCard.id, {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || editingCard.dueDate,
    });
    closeModal();
  };

  const TAG_VARIANT_COLORS: Record<TagVariant, string> = {
    red:    'bg-[#FEF3F2] text-[#D92D20]',
    yellow: 'bg-[#FFFAEB] text-[#DC6803]',
    green:  'bg-[#ECFDF3] text-[#039855]',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Edit task"
    >
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0A0D12]">Editar tarefa</h2>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#717680] hover:bg-[#F5F7FA] hover:text-[#0A0D12] transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#414651]">Título <span className="text-[#D92D20]">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome da tarefa"
              autoFocus
              className="h-10 px-3 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none transition-all focus:border-[#7F57D3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(127,87,211,0.15)] placeholder:text-[#718096]"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#414651]">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Descreva a tarefa..."
              rows={3}
              className="px-3 py-2 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none resize-none transition-all focus:border-[#7F57D3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(127,87,211,0.15)] placeholder:text-[#718096]"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#414651]">Data de entrega</label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder={editingCard.dueDate}
              className="h-10 px-3 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none transition-all focus:border-[#7F57D3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(127,87,211,0.15)] placeholder:text-[#718096]"
            />
          </div>

          {/* Existing Tags (display only) */}
          {editingCard.tags.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#414651]">Tags atuais</label>
              <div className="flex flex-wrap gap-1.5">
                {editingCard.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${TAG_VARIANT_COLORS[tag.variant]}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 h-10 text-sm font-medium text-[#414651] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg hover:bg-[#E8EBF0] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-10 text-sm font-medium text-white bg-[#7F57D3] rounded-lg hover:bg-[#6d47be] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!title.trim()}
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCardModal;
