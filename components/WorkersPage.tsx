import React from 'react';
import { Worker } from '../types';

interface WorkersPageProps {
  workers: Worker[];
  onEditWorker: (worker: Worker) => void;
}

const WorkersPage: React.FC<WorkersPageProps> = ({ workers, onEditWorker }) => {
  return (
    <div className="p-8 bg-light">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-dark">قائمة العمال</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map(worker => (
            <div key={worker.id} className="bg-gray-50 p-5 rounded-lg border border-gray-200 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-primary">{worker.name}</h4>
                            <p className="text-sm text-gray-600">{worker.role}</p>
                        </div>
                         <span className="bg-purple-100 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">راتب: {worker.salary.toLocaleString('ar-EG')} ج.م</span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            تاريخ التعيين: {new Date(worker.hireDate).toLocaleDateString('ar-EG')}
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={() => onEditWorker(worker)} className="font-medium text-primary hover:underline text-sm">تعديل</button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;
