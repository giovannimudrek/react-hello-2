import React from 'react';
import { useBoardStore } from '../../store/boardStore';
import {
  HomeIcon,
  NotificationIcon,
  TasksIcon,
  AnalyticsIcon,
  BoardIcon,
  SettingsIcon,
  LogoutIcon,
} from '../Common/icons';

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',          label: 'Home',          icon: HomeIcon },
  { id: 'notifications', label: 'Notifications', icon: NotificationIcon },
  { id: 'my-tasks',      label: 'My Tasks',      icon: TasksIcon },
  { id: 'analytics',     label: 'Analytics',     icon: AnalyticsIcon },
  { id: 'board',         label: 'Board',         icon: BoardIcon },
];

const BOTTOM_ITEMS: NavItem[] = [
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
  { id: 'logout',   label: 'Logout',   icon: LogoutIcon },
];

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useBoardStore();

  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const isActive = activeTab === item.id;
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={`flex items-center gap-2 h-10 px-3 rounded-lg cursor-pointer text-sm font-normal leading-5 w-full text-left transition-colors duration-150 ${
          isActive
            ? 'bg-[#F4EBFF] text-[#7F56D9]'
            : 'text-[#0A0D12] hover:bg-[#F4EBFF] hover:text-[#7F56D9]'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isActive ? 'text-[#7F56D9]' : 'text-[#414651]'
          }`}
        />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-[#E9EAEB] flex flex-col py-6 overflow-y-auto">
      {/* Main nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col gap-1 px-3 border-t border-[#E9EAEB] pt-4">
        {BOTTOM_ITEMS.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}

        {/* User profile */}
        <div className="flex items-center gap-2 h-12 px-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-[#F4EBFF] flex items-center justify-center text-xs font-semibold text-[#7F56D9] flex-shrink-0">
            AS
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-[#0A0D12] truncate">Ana Silva</span>
            <span className="text-xs text-[#717680] truncate">ana@empresa.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
