import React, { useEffect } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { TrashIcon, CloseIcon } from '../Common/icons';

const DeleteCardModal: React.FC = () => {
  const { deletingCard, closeModal, deleteCard } = useBoardStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

  if (!deletingCard) return null;

  const handleConfirm = () => {
    deleteCard(deletingCard.columnId, deletingCard.card.id);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Delete task confirmation"
    >
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FEF3F2] flex items-center justify-center text-[#D92D20] flex-shrink-0">
            <TrashIcon />
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#717680] hover:bg-[#F5F7FA] hover:text-[#0A0D12] transition-colors flex-shrink-0 ml-auto"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-[#0A0D12]">Excluir tarefa</h2>
          <p className="text-sm text-[#717680]">
            Tem certeza que deseja excluir{' '}
            <span className="font-medium text-[#414651]">"{deletingCard.card.title}"</span>?
            Essa ação não pode ser desfeita.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 h-10 text-sm font-medium text-[#414651] bg-[#F5F7FA] border border-[#E8EBF0] rounded-lg hover:bg-[#E8EBF0] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 h-10 text-sm font-medium text-white bg-[#D92D20] rounded-lg hover:bg-[#b91c1c] transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardModal;
