import React from 'react';
import { useDatabase } from '../services/mockDb';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';

const MerchantView: React.FC = () => {
  const { orders, updateOrderStatus } = useDatabase();

  // Filter for orders relevant to the merchant dashboard
  const activeOrders = orders.filter(o => 
    o.status !== 'delivered' && o.status !== 'on_way'
  );

  const handleRequestDriver = (orderId: string) => {
    // This action makes the order visible on the Driver Board
    updateOrderStatus(orderId, 'ready_for_pickup');
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-dark">Pedidos Activos</h1>
        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
          Negocio Abierto
        </div>
      </header>

      {activeOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Package size={48} className="mb-2 opacity-50" />
          <p>No hay pedidos pendientes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="font-mono text-xs text-gray-500">#{order.id.slice(-6)}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  order.status === 'ready_for_pickup' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status === 'pending' ? 'Pendiente' : 'Esperando Driver'}
                </span>
              </div>
              
              <div className="p-4">
                <div className="mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-800 font-medium">{item.quantity}x {item.name}</span>
                      <span className="text-gray-500">RD${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total (Cobrar)</span>
                    <span>RD${order.total_price + order.delivery_fee}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    *Incluye RD${order.delivery_fee} de envío para el driver
                  </div>
                </div>

                {order.status === 'pending' && (
                  <button 
                    onClick={() => handleRequestDriver(order.id)}
                    className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold shadow hover:bg-[#356381] transition-colors flex items-center justify-center gap-2"
                  >
                    <Truck size={18} />
                    Comida Lista - Pedir Driver
                  </button>
                )}

                {order.status === 'ready_for_pickup' && (
                  <div className="text-center py-2 text-green-600 font-medium flex items-center justify-center gap-2 animate-pulse">
                    <Clock size={18} />
                    Esperando que un driver acepte...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MerchantView;