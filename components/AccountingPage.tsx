import React from 'react';
import { Transaction, Order, TransactionType } from '../types';

interface AccountingPageProps {
  transactions: Transaction[];
  orders: Order[];
}

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm font-semibold">{title}</p>
            <p className="text-3xl font-bold text-dark">{value}</p>
        </div>
        <div className={`${color} text-white p-3 rounded-full`}>
            {icon}
        </div>
    </div>
);


const AccountingPage: React.FC<AccountingPageProps> = ({ transactions, orders }) => {

    const totalIncome = transactions
        .filter(t => t.type === TransactionType.Income)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === TransactionType.Expense)
        .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    
    const formatCurrency = (amount: number) => amount.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP'});

    const getOrderTitle = (orderId?: string) => {
        if (!orderId) return '-';
        return orders.find(o => o.id === orderId)?.jobTitle || 'طلب محذوف';
    }
  
  return (
    <div className="p-8 bg-light space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="إجمالي الدخل" value={formatCurrency(totalIncome)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} color="bg-green-500" />
            <StatCard title="إجمالي المصروفات" value={formatCurrency(totalExpenses)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>} color="bg-red-500" />
            <StatCard title="صافي الربح" value={formatCurrency(netProfit)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} color="bg-primary" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-dark">سجل المعاملات</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">التاريخ</th>
                        <th scope="col" className="px-6 py-3">الوصف</th>
                        <th scope="col" className="px-6 py-3">الطلب المرتبط</th>
                        <th scope="col" className="px-6 py-3">النوع</th>
                        <th scope="col" className="px-6 py-3">المبلغ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(tx => (
                        <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString('ar-EG')}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                            <td className="px-6 py-4 text-gray-600">{getOrderTitle(tx.orderId)}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    tx.type === TransactionType.Income ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {tx.type}
                                </span>
                            </td>
                            <td className={`px-6 py-4 font-semibold ${
                                tx.type === TransactionType.Income ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {formatCurrency(tx.amount)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default AccountingPage;
