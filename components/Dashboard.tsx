
import React from 'react';
import { Order, Client, OrderStatus } from '../types';
import { STATUS_COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  orders: Order[];
  clients: Client[];
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm font-semibold">{title}</p>
            <p className="text-3xl font-bold text-dark">{value}</p>
        </div>
        <div className="bg-primary text-white p-3 rounded-full">
            {icon}
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ orders, clients }) => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.price, 0).toLocaleString('ar-EG', { style: 'currency', currency: 'EGP'});
    const ordersInProgress = orders.filter(o => o.status !== OrderStatus.Completed && o.status !== OrderStatus.Delivered).length;
    
    const statusCounts = Object.values(OrderStatus).map(status => ({
        name: status,
        count: orders.filter(o => o.status === status).length,
    }));
    
    const getClientName = (clientId: string) => {
        return clients.find(c => c.id === clientId)?.name || 'عميل غير معروف';
    };

    const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    return (
        <div className="p-8 bg-light space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="إجمالي الإيرادات" value={totalRevenue} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
                 <StatCard title="إجمالي الطلبات" value={orders.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
                 <StatCard title="طلبات قيد التنفيذ" value={ordersInProgress} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                 <StatCard title="إجمالي العملاء" value={clients.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-dark">أحدث الطلبات</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">عنوان الطلب</th>
                                    <th scope="col" className="px-6 py-3">العميل</th>
                                    <th scope="col" className="px-6 py-3">السعر</th>
                                    <th scope="col" className="px-6 py-3">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.jobTitle}</td>
                                        <td className="px-6 py-4">{getClientName(order.clientId)}</td>
                                        <td className="px-6 py-4">{order.price.toLocaleString('ar-EG')} ج.م</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-dark">توزيع الطلبات</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statusCounts} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                            <Tooltip cursor={{fill: '#f3f4f6'}} />
                            <Bar dataKey="count" barSize={20} radius={[0, 10, 10, 0]}>
                                {statusCounts.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={Object.values(STATUS_COLORS)[index].split(' ')[0].replace('bg-', 'text-').replace('-200', '-500')} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
