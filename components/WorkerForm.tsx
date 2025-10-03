import React, { useState, useEffect } from 'react';
import { Worker } from '../types';

interface WorkerFormProps {
  onSave: (worker: Worker) => void;
  onClose: () => void;
  worker: Worker | null;
}

const WorkerForm: React.FC<WorkerFormProps> = ({ onSave, onClose, worker }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    salary: 0,
    hireDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (worker) {
      const { id, ...editableWorker } = worker;
      setFormData(editableWorker);
    }
  }, [worker]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'salary' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorker: Worker = {
        ...formData,
        id: worker ? worker.id : crypto.randomUUID(),
        hireDate: formData.hireDate || new Date().toISOString().split('T')[0],
    };
    onSave(newWorker);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">اسم العامل</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">الوظيفة</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">الراتب (ج.م)</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">تاريخ التعيين</label>
        <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
      </div>
      <div className="flex justify-end space-x-reverse space-x-3 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">إلغاء</button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">حفظ</button>
      </div>
    </form>
  );
};

export default WorkerForm;
