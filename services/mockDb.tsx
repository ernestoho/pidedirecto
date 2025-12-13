import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus, Restaurant, MenuItem } from '../types';

// Mock Data for the MVP
const MOCK_RESTAURANT: Restaurant = {
  id: 'rest-001',
  name: "Chimi 'El Dominicano'",
  whatsapp_number: "18095550101", // Example number
  address: "Av. Winston Churchill, Santo Domingo",
  image_url: "https://picsum.photos/800/400",
  menu_items: [
    {
      id: 'm1',
      name: "Chimi Completo",
      description: "Pan de agua, carne de res, repollo, tomate, salsa rosa.",
      price: 250,
      image_url: "https://picsum.photos/200/200?random=1"
    },
    {
      id: 'm2',
      name: "Yaroa de Pollo",
      description: "Papas fritas, pollo desmenuzado, queso danés y cheddar.",
      price: 350,
      image_url: "https://picsum.photos/200/200?random=2"
    },
    {
      id: 'm3',
      name: "Jugo de Chinola (16oz)",
      description: "Natural, con o sin azúcar.",
      price: 100,
      image_url: "https://picsum.photos/200/200?random=3"
    },
    {
      id: 'm4',
      name: "Mofongo con Chicharrón",
      description: "Plátano majado con ajo y chicharrón crujiente.",
      price: 450,
      image_url: "https://picsum.photos/200/200?random=4"
    }
  ]
};

interface DatabaseContextType {
  restaurant: Restaurant;
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'created_at' | 'status' | 'driver_id'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  claimOrder: (orderId: string, driverId: string) => void;
  currentUserRole: string; // Just for demo context
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize with some dummy data for the driver to see immediately
  useEffect(() => {
    const initialOrders: Order[] = [
      {
        id: 'ord-init-1',
        customer_id: 'cust-1',
        restaurant_id: MOCK_RESTAURANT.id,
        driver_id: null,
        items: [{ id: 'm1', name: "Chimi Completo", price: 250, quantity: 2 }],
        total_price: 500,
        delivery_fee: 150,
        status: 'ready_for_pickup',
        delivery_address: "Calle 5 #23, Ensanche Quisqueya",
        created_at: new Date().toISOString(),
        customer_phone: "809-555-0001"
      }
    ];
    setOrders(initialOrders);
  }, []);

  const createOrder = (newOrderData: Omit<Order, 'id' | 'created_at' | 'status' | 'driver_id'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `ord-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'pending',
      driver_id: null,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const claimOrder = (orderId: string, driverId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, driver_id: driverId, status: 'on_way' as OrderStatus } : o
    ));
  };

  return (
    <DatabaseContext.Provider value={{
      restaurant: MOCK_RESTAURANT,
      orders,
      createOrder,
      updateOrderStatus,
      claimOrder,
      currentUserRole: 'guest'
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
