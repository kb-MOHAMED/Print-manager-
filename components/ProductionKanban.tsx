import React from 'react';
import { Order, Client, OrderStatus } from '../types';
import { STATUS_COLORS, STATUS_BORDERS } from '../constants';

interface ProductionKanbanProps {
  orders: Order[];
  clients: Client[];
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderCard: React.FC<{order: Order, clientName: string}> = ({ order, clientName }) => {
    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('orderId', order.id)}
            className={`p-4 mb-4 bg-white rounded-lg shadow-sm cursor-pointer border-r-4 ${STATUS_BORDERS[order.status]}`}
        >
            <p className="font-bold text-dark">{order.jobTitle}</p>
            <p className="text-sm text-gray-600">{clientName}</p>
            <div className="flex justify-between items-center mt-3 text-xs">
                <span className="text-gray-500">{order.id.substring(0, 8)}</span>
                <span className={`px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                </span>
            </div>
        </div>
    );
};

const KanbanColumn: React.FC<{
    status: OrderStatus;
    orders: Order[];
    clients: Client[];
    onDrop: (status: OrderStatus, orderId: string) => void;
}> = ({ status, orders, clients, onDrop }) => {
    
    const getClientName = (clientId: string) => clients.find(c => c.id === clientId)?.name || 'عميل غير معروف';

    return (
        <div 
            className="flex-1 bg-gray-100 rounded-xl p-4 min-w-[300px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const orderId = e.dataTransfer.getData('orderId');
                if (orderId) {
                    onDrop(status, orderId);
                }
            }}
        >
            <h3 className={`font-bold mb-4 text-lg ${STATUS_BORDERS[status].replace('border-', 'text-')}`}>{status} ({orders.length})</h3>
            <div>
                {orders.map(order => (
                    <OrderCard key={order.id} order={order} clientName={getClientName(order.clientId)} />
                ))}
            </div>
        </div>
    );
};


const ProductionKanban: React.FC<ProductionKanbanProps> = ({ orders, clients, updateOrderStatus }) => {
    
    const handleDrop = (orderId: string, newStatus: OrderStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    const productionStatuses = Object.values(OrderStatus).filter(s => s !== OrderStatus.Delivered);

    return (
        <div className="p-8 bg-light">
             <div className="flex space-x-reverse space-x-6 overflow-x-auto pb-4">
                {productionStatuses.map(status => (
                    <KanbanColumn 
                        key={status}
                        status={status}
                        orders={orders.filter(o => o.status === status)}
                        clients={clients}
                        onDrop={(newStatus, orderId) => handleDrop(orderId, newStatus)}
                    />
                ))}
             </div>
        </div>
    );
};

export default ProductionKanban;