import React, { useState, useRef, useEffect } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { LogoIcon, SearchIcon, BellIcon, CloseIcon } from '../Common/icons';

const Header: React.FC = () => {
  const { board, searchQuery, setSearchQuery } = useBoardStore();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, setSearchQuery]);

  // Show first 4 members + overflow
  const visibleMembers = board.members.slice(0, 4);
  const overflowCount = board.members.length - 4;

  return (
    <header className="flex items-center justify-between h-[76px] px-6 bg-white border-b border-[#E9EAEB] flex-shrink-0 z-50">
      {/* Brand */}
      <a
        href="#"
        className="flex items-center gap-1.5 no-underline flex-shrink-0"
        aria-label="Task View home"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #F4EBFF 0%, #7F56D9 100%)',
            boxShadow: 'inset -1px 1px 4px rgba(255,255,255,0.25)',
          }}
        >
          <LogoIcon className="w-[18px] h-[18px]" />
        </div>
        <span className="text-base font-semibold leading-6 text-[#0A0D12]">Task View</span>
      </a>

      {/* Search */}
      <div className="flex-none w-80 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717680] pointer-events-none flex items-center">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search tasks"
          className={`w-full h-11 pl-10 pr-9 text-sm font-normal text-[#0A0D12] bg-white border rounded-lg outline-none transition-all duration-150 placeholder:text-[#717680] ${
            isFocused
              ? 'border-[#7F56D9] shadow-[0_0_0_4px_rgba(127,86,217,0.2)]'
              : 'border-[#D5D7DA]'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#717680] hover:text-[#0A0D12] transition-colors"
            aria-label="Clear search"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Member avatars */}
        <div className="flex items-center">
          {visibleMembers.map((member, i) => (
            <div
              key={member.id}
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-semibold text-white cursor-pointer transition-transform hover:-translate-y-0.5 hover:z-10 flex-shrink-0"
              style={{
                backgroundColor: member.color,
                marginLeft: i === 0 ? 0 : '-6px',
              }}
              title={member.name}
              aria-label={member.name}
            >
              {member.initials}
            </div>
          ))}
          {overflowCount > 0 && (
            <div
              className="w-8 h-8 rounded-full border-2 border-white bg-[#F4EBFF] flex items-center justify-center text-xs font-medium text-[#7F56D9] cursor-pointer"
              style={{ marginLeft: '-6px' }}
              title={`+${overflowCount} more members`}
            >
              +{overflowCount}
            </div>
          )}
        </div>

        {/* Bell */}
        <button
          className="w-9 h-9 flex items-center justify-center bg-transparent border-none rounded-lg cursor-pointer text-[#414651] transition-colors hover:bg-[#F4EBFF] hover:text-[#7F56D9]"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>

        {/* User avatar */}
        <div
          className="w-10 h-10 rounded-full bg-[#F4EBFF] flex items-center justify-center text-sm font-semibold text-[#7F56D9] cursor-pointer flex-shrink-0 select-none"
          title="Your profile"
        >
          AS
        </div>
      </div>
    </header>
  );
};

export default Header;
