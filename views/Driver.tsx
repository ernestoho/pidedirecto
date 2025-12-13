import React, { useState } from 'react';
import { useDatabase } from '../services/mockDb';
import { MapPin, Navigation, DollarSign, CheckCircle } from 'lucide-react';

const DriverView: React.FC = () => {
  const { orders, claimOrder, updateOrderStatus } = useDatabase();
  const [driverId] = useState('driver-me'); // Simulating logged in driver

  // 1. Available Orders (The "Open Board")
  const availableOrders = orders.filter(o => o.status === 'ready_for_pickup' && o.driver_id === null);

  // 2. My Active Orders
  const myActiveOrders = orders.filter(o => o.driver_id === driverId && o.status !== 'delivered');

  const handleClaim = (orderId: string) => {
    claimOrder(orderId, driverId);
  };

  const handleComplete = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-24">
      <div className="bg-brand-dark text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold mb-1">Hola, Driver 👋</h1>
        <p className="opacity-80 text-sm">Gana dinero entregando pedidos.</p>
        <div className="mt-4 flex gap-4">
          <div className="bg-white/10 p-3 rounded-xl flex-1 text-center backdrop-blur-sm">
            <span className="block text-xl font-bold text-green-400">RD$450</span>
            <span className="text-xs opacity-70">Ganado Hoy</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl flex-1 text-center backdrop-blur-sm">
            <span className="block text-xl font-bold text-yellow-400">{myActiveOrders.length}</span>
            <span className="text-xs opacity-70">Activos</span>
          </div>
        </div>
      </div>

      <div className="px-4">
        {myActiveOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-gray-800 mb-3 flex items-center">
              <Navigation size={18} className="mr-2 text-blue-600" />
              En Curso
            </h2>
            {myActiveOrders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 mb-4">
                 <div className="flex justify-between mb-2">
                    <span className="font-bold text-lg">Ganancia: RD${order.delivery_fee}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">En Camino</span>
                 </div>
                 <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p><span className="font-semibold">Recoger:</span> Chimi 'El Dominicano'</p>
                    <p><span className="font-semibold">Entregar:</span> {order.delivery_address}</p>
                    <p className="text-xs text-gray-400 mt-1">Cobrar al cliente: RD${order.total_price + order.delivery_fee}</p>
                 </div>
                 <button 
                  onClick={() => handleComplete(order.id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                   <CheckCircle size={18} />
                   Completar Entrega
                 </button>
              </div>
            ))}
          </div>
        )}

        <h2 className="font-bold text-gray-800 mb-3 flex items-center">
          <MapPin size={18} className="mr-2 text-brand-red" />
          Pizarra Disponible
        </h2>
        
        {availableOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-400">No hay pedidos disponibles ahora mismo.</p>
            <p className="text-xs text-gray-300 mt-2">Espera un momento...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-50 p-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500">#{order.id.slice(-4)}</span>
                  <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded border border-green-100">Listo para recoger</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">RD${order.delivery_fee}</h3>
                      <span className="text-xs text-gray-400">Tu ganancia</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Distancia</p>
                      <p className="font-bold text-gray-700">1.2 km</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0"></div>
                      <p className="text-sm text-gray-600 line-clamp-1">Restaurante: Chimi 'El Dominicano'</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2 shrink-0"></div>
                      <p className="text-sm text-gray-600 line-clamp-1">Cliente: {order.delivery_address}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleClaim(order.id)}
                    className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-lg active:scale-95 transform"
                  >
                    Tomar Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverView;