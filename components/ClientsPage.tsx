
import React from 'react';
import { Client, Order } from '../types';

interface ClientsPageProps {
  clients: Client[];
  orders: Order[];
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients, orders }) => {
  const getOrderCount = (clientId: string) => {
    return orders.filter(o => o.clientId === clientId).length;
  };

  return (
    <div className="p-8 bg-light">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-dark">قائمة العملاء</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                  <div>
                      <h4 className="font-bold text-lg text-primary">{client.name}</h4>
                      <p className="text-sm text-gray-600">{client.company}</p>
                  </div>
                  <span className="bg-blue-100 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">{getOrderCount(client.id)} طلبات</span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {client.phone}
                </p>
                <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {client.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
