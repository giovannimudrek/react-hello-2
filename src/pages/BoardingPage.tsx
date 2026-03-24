/**
 * BoardingPage.tsx — Tela principal de boarding (Kanban Task View)
 *
 * Layout: Header (56px) + Sidebar (204px) + Content Area
 * Fiel ao design Figma: https://www.figma.com/design/ik0Qa30O9oNUy3qelJbQO7/Ferramenta-Trello?node-id=1-2
 *
 * Cores Primárias:
 *   #7F57D3 — primária
 *   #F3EBF9 — fundo claro
 *   #0A0D12 — texto escuro
 *   #E8EBF0 — border
 *   #F5F7FA — bg claro
 */

import React, { Suspense, lazy } from 'react';
import { useBoardStore } from '../store/boardStore';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard';

// Lazy-load modals for code splitting
const AddCardModal    = lazy(() => import('../components/Modals/AddCardModal'));
const EditCardModal   = lazy(() => import('../components/Modals/EditCardModal'));
const DeleteCardModal = lazy(() => import('../components/Modals/DeleteCardModal'));

const BoardingPage: React.FC = () => {
  const { modal } = useBoardStore();

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Header — 56px height (spec §3.2) */}
      <Header />

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar — 204px fixed width (spec §6.2) */}
        <Sidebar />

        {/* Main content area */}
        <main
          className="flex-1 flex flex-col min-w-0 overflow-hidden px-6 pt-6 pb-0"
          role="main"
          aria-label="Task board"
        >
          <KanbanBoard />
        </main>
      </div>

      {/* Modals */}
      <Suspense fallback={null}>
        {modal === 'add-card'    && <AddCardModal />}
        {modal === 'edit-card'   && <EditCardModal />}
        {modal === 'delete-card' && <DeleteCardModal />}
      </Suspense>
    </div>
  );
};

export default BoardingPage;
