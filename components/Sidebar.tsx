
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 bg-dark text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-10 text-center text-accent">إدارة المطبعة</div>
      <nav>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="mr-4">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
