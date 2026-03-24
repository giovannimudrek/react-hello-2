import React, { useState, useEffect, useRef } from 'react';
import { useBoardStore } from '../../store/boardStore';
import type { Tag, TagVariant } from '../../types';
import { CloseIcon } from '../Common/icons';

const AddCardModal: React.FC = () => {
  const { board, modalTargetColumnId, closeModal, addCard } = useBoardStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagVariant, setTagVariant] = useState<TagVariant>('green');
  const [tags, setTags] = useState<Tag[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);

  const targetColumn = board.columns.find((c) => c.id === modalTargetColumnId);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    setTags((prev) => [
      ...prev,
      { id: `new-tag-${Date.now()}`, label: tagInput.trim(), variant: tagVariant },
    ]);
    setTagInput('');
  };

  const handleRemoveTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !modalTargetColumnId) return;
    addCard(modalTargetColumnId, {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      subtasks: { completed: 0, total: 0 },
      tags,
      assignees: [],
      attachmentCount: 0,
      commentCount: 0,
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
      aria-label="Add new task"
    >
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] w-full max-w-md mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0A0D12]">
            Adicionar tarefa{targetColumn ? ` — ${targetColumn.name}` : ''}
          </h2>
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
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome da tarefa"
              className="h-10 px-3 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none transition-all focus:border-[#7F57D3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(127,87,211,0.15)] placeholder:text-[#718096]"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#414651]">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a tarefa..."
              rows={3}
              className="px-3 py-2 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none resize-none transition-all focus:border-[#7F57D3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(127,87,211,0.15)] placeholder:text-[#718096]"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#414651]">Data de entrega</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="h-10 px-3 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none transition-all focus:border-[#7F57D3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(127,87,211,0.15)]"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#414651]">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                placeholder="Nome da tag"
                className="flex-1 h-9 px-3 text-sm text-[#0A0D12] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none transition-all focus:border-[#7F57D3] focus:bg-white placeholder:text-[#718096]"
              />
              <select
                value={tagVariant}
                onChange={(e) => setTagVariant(e.target.value as TagVariant)}
                className="h-9 px-2 text-sm text-[#414651] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg outline-none cursor-pointer"
              >
                <option value="green">Verde</option>
                <option value="yellow">Laranja</option>
                <option value="red">Vermelho</option>
              </select>
              <button
                type="button"
                onClick={handleAddTag}
                className="h-9 px-3 text-sm font-medium text-[#7F57D3] bg-[#F3EBF9] border border-[#7F57D3] rounded-lg hover:bg-[#ede4f7] transition-colors"
              >
                +
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${TAG_VARIANT_COLORS[tag.variant]}`}
                  >
                    {tag.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.id)}
                      className="leading-none opacity-70 hover:opacity-100"
                      aria-label={`Remove tag ${tag.label}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

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
              Adicionar tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
