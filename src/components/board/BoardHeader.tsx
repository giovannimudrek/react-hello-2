import React from 'react';

interface BoardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header
      className="flex items-center justify-between bg-white border-b border-gray-200 px-8"
      style={{ height: '76px', minHeight: '76px' }}
    >
      {/* Brand / Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #F4EBFF 0%, #7F56D9 100%)' }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="6" height="14" rx="1.5" fill="white" opacity="0.9" />
            <rect x="11" y="3" width="6" height="8" rx="1.5" fill="white" opacity="0.9" />
            <rect x="11" y="13" width="6" height="4" rx="1.5" fill="white" opacity="0.6" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900" style={{ fontSize: '18px', letterSpacing: '-0.3px' }}>
          Task View
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Pesquise suas tarefas"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            aria-label="Pesquisar tarefas"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          aria-label="Notificações"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* User avatar */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#7F56D9' }}
          aria-label="Menu do usuário - DS"
        >
          DS
        </button>
      </div>
    </header>
  );
};
