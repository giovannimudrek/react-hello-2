import React from 'react';

interface AddCardButtonProps {
  onClick: () => void;
  label?: string;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({
  onClick,
  label = 'Add a card',
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full py-2.5 px-3 mt-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors border-2 border-dashed border-gray-300 hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      aria-label={label}
    >
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      {label}
    </button>
  );
};
