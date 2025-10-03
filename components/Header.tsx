import React from 'react';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
    activePage: string;
    onNewOrderClick: () => void;
    onNewWorkerClick: () => void;
    onNewTransactionClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNewOrderClick, onNewWorkerClick, onNewTransactionClick }) => {
    const currentPage = NAV_ITEMS.find(item => item.id === activePage);

    const getButtonConfig = () => {
        switch (activePage) {
            case 'dashboard':
            case 'orders':
            case 'production':
                return { label: 'طلب جديد', action: onNewOrderClick };
            case 'workers':
                return { label: 'إضافة عامل', action: onNewWorkerClick };
            case 'accounting':
                return { label: 'إضافة معاملة', action: onNewTransactionClick };
            default:
                return null;
        }
    }

    const buttonConfig = getButtonConfig();


    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark">{currentPage?.label || 'لوحة التحكم'}</h1>
            {buttonConfig && (
                 <button
                    onClick={buttonConfig.action}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {buttonConfig.label}
                </button>
            )}
        </header>
    );
};

export default Header;