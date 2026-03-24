import React from 'react';
import { useBoardStore } from '../../store/boardStore';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const CheckAllIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 4.5V7l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckDoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4.5 7l2 2 3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TABS: Tab[] = [
  { id: 'all',       label: 'Todos',      icon: <CheckAllIcon /> },
  { id: 'pending',   label: 'Pendentes',  icon: <ClockIcon /> },
  { id: 'completed', label: 'Concluídas', icon: <CheckDoneIcon /> },
];

const FilterTabs: React.FC = () => {
  const { activeTab, setActiveTab } = useBoardStore();

  return (
    <div className="flex items-center gap-1 mb-6" role="tablist" aria-label="Filter tasks">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium leading-5 transition-all duration-150 border cursor-pointer ${
              isActive
                ? 'bg-[#7F57D3] text-white border-[#7F57D3] shadow-sm'
                : 'bg-transparent text-[#414654] border-transparent hover:bg-[rgba(127,87,211,0.08)]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
