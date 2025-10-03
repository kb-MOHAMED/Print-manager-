import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionFormProps {
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    type: TransactionType.Expense,
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || formData.amount <= 0) {
        alert('الرجاء إدخال وصف صحيح ومبلغ أكبر من صفر.');
        return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">نوع المعاملة</label>
        <select name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary bg-white">
          {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">الوصف</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">المبلغ (ج.م)</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">التاريخ</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div className="flex justify-end space-x-reverse space-x-3 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">إلغاء</button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">حفظ</button>
      </div>
    </form>
  );
};

export default TransactionForm;
