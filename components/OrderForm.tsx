
import React, { useState, useEffect } from 'react';
import { Order, Client, OrderStatus } from '../types';

interface OrderFormProps {
  clients: Client[];
  onSave: (order: Order) => void;
  onClose: () => void;
  order: Order | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ clients, onSave, onClose, order }) => {
  const [formData, setFormData] = useState<Omit<Order, 'id' | 'createdAt'>>({
    jobTitle: '',
    clientId: '',
    status: OrderStatus.Quote,
    quantity: 1000,
    paperType: 'كوشيه 150 جرام',
    dimensions: 'A4',
    colors: '4 لون',
    finishing: 'قص',
    price: 0,
    dueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (order) {
        // Omit id and createdAt for editing
        const { id, createdAt, ...editableOrder } = order;
        setFormData(editableOrder);
    }
  }, [order]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientId === '') {
        alert('الرجاء اختيار عميل');
        return;
    }
    const newOrder: Order = {
        ...formData,
        id: order ? order.id : crypto.randomUUID(),
        createdAt: order ? order.createdAt : new Date().toISOString(),
    };
    onSave(newOrder);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">عنوان الطلب</label>
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">العميل</label>
        <select name="clientId" value={formData.clientId} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary bg-white">
          <option value="" disabled>اختر عميل</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
        </select>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">الحالة</label>
        <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary bg-white">
          {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">الكمية</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">السعر (ج.م)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
          </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">نوع الورق</label>
            <input type="text" name="paperType" value={formData.paperType} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">المقاس</label>
            <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
          </div>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">الألوان والتشطيب</label>
        <input type="text" name="finishing" value={formData.finishing} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">تاريخ الاستحقاق</label>
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div className="flex justify-end space-x-reverse space-x-3 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">إلغاء</button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">حفظ الطلب</button>
      </div>
    </form>
  );
};

export default OrderForm;
