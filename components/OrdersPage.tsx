
import React, { useState } from 'react';
import { Order, Client } from '../types';
import { STATUS_COLORS } from '../constants';

interface OrdersPageProps {
  orders: Order[];
  clients: Client[];
  setSelectedOrder: (order: Order | null) => void;
  setModalOpen: (isOpen: boolean) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, clients, setSelectedOrder, setModalOpen }) => {
  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.name || 'عميل غير معروف';
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  }

  return (
    <div className="p-8 bg-light">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-dark">قائمة الطلبات</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">رقم الطلب</th>
                <th scope="col" className="px-6 py-3">عنوان الطلب</th>
                <th scope="col" className="px-6 py-3">العميل</th>
                <th scope="col" className="px-6 py-3">تاريخ الاستحقاق</th>
                <th scope="col" className="px-6 py-3">السعر</th>
                <th scope="col" className="px-6 py-3">الحالة</th>
                <th scope="col" className="px-6 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-700 text-xs">{order.id.substring(0, 8)}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.jobTitle}</td>
                  <td className="px-6 py-4">{getClientName(order.clientId)}</td>
                  <td className="px-6 py-4">{new Date(order.dueDate).toLocaleDateString('ar-EG')}</td>
                  <td className="px-6 py-4">{order.price.toLocaleString('ar-EG')} ج.م</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(order)} className="font-medium text-primary hover:underline">تعديل</button>
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

export default OrdersPage;
