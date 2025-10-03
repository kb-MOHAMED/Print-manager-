
import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Order, Client, OrderStatus } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import OrdersPage from './components/OrdersPage';
import ClientsPage from './components/ClientsPage';
import ProductionKanban from './components/ProductionKanban';
import Modal from './components/Modal';
import OrderForm from './components/OrderForm';

// Mock Data
const createInitialClients = (): Client[] => [
    { id: 'c1', name: 'أحمد محمود', company: 'شركة النور', phone: '01012345678', email: 'ahmed@noor.com' },
    { id: 'c2', name: 'فاطمة علي', company: 'مؤسسة الإبداع', phone: '01287654321', email: 'fatima@ebdaa.com' },
    { id: 'c3', name: 'محمد حسن', company: 'مطابع العاصمة', phone: '01155566677', email: 'mohamed@capital.com' },
];

const createInitialOrders = (clients: Client[]): Order[] => [
    { id: 'o1', jobTitle: 'بروشورات دعائية', clientId: clients[0].id, status: OrderStatus.Completed, quantity: 5000, paperType: 'كوشيه 150 جرام', dimensions: 'A4', colors: '4 لون', finishing: 'سلوفان', price: 2500, dueDate: '2024-07-20', createdAt: '2024-07-10T10:00:00Z' },
    { id: 'o2', jobTitle: 'كروت شخصية', clientId: clients[1].id, status: OrderStatus.Printing, quantity: 1000, paperType: 'كوشيه 350 جرام', dimensions: '9x5.5 سم', colors: '4 لون وجهين', finishing: 'سلوفان مط', price: 400, dueDate: '2024-07-28', createdAt: '2024-07-22T11:30:00Z' },
    { id: 'o3', jobTitle: 'دفاتر ملاحظات', clientId: clients[0].id, status: OrderStatus.PrePress, quantity: 500, paperType: 'أبيض 80 جرام', dimensions: 'A5', colors: '1 لون', finishing: 'تجليد سلك', price: 1800, dueDate: '2024-08-05', createdAt: '2024-07-24T14:00:00Z' },
    { id: 'o4', jobTitle: 'بانر إعلاني كبير', clientId: clients[2].id, status: OrderStatus.Quote, quantity: 1, paperType: 'فينيل', dimensions: '3x2 متر', colors: '4 لون', finishing: 'حلقات', price: 900, dueDate: '2024-08-01', createdAt: '2024-07-25T09:00:00Z' },
];


const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [clients, setClients] = useLocalStorage<Client[]>('clients', createInitialClients());
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', createInitialOrders(clients));

  const handleNewOrderClick = () => {
      setSelectedOrder(null);
      setModalOpen(true);
  };

  const handleSaveOrder = (order: Order) => {
    setOrders(prevOrders => {
        const existing = prevOrders.find(o => o.id === order.id);
        if (existing) {
            return prevOrders.map(o => o.id === order.id ? order : o);
        }
        return [order, ...prevOrders];
    });
  };

  const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  }, [setOrders]);


  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard orders={orders} clients={clients} />;
      case 'orders':
        return <OrdersPage orders={orders} clients={clients} setSelectedOrder={setSelectedOrder} setModalOpen={setModalOpen} />;
      case 'production':
        return <ProductionKanban orders={orders} clients={clients} updateOrderStatus={updateOrderStatus} />;
      case 'clients':
        return <ClientsPage orders={orders} clients={clients} />;
      default:
        return <Dashboard orders={orders} clients={clients} />;
    }
  };

  return (
    <div className="flex h-screen bg-light font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header activePage={activePage} onNewOrderClick={handleNewOrderClick} />
        <div className="flex-1 overflow-y-auto">
            {renderPage()}
        </div>
      </main>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedOrder ? "تعديل الطلب" : "إضافة طلب جديد"}
      >
        <OrderForm 
            clients={clients} 
            onSave={handleSaveOrder} 
            onClose={() => setModalOpen(false)} 
            order={selectedOrder}
        />
      </Modal>
    </div>
  );
};

export default App;
