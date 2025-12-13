export type Role = 'customer' | 'merchant' | 'driver';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface Restaurant {
  id: string;
  name: string;
  whatsapp_number: string;
  address: string;
  menu_items: MenuItem[];
  image_url: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready_for_pickup' | 'on_way' | 'delivered';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string; // simulating profile id
  restaurant_id: string;
  driver_id: string | null;
  items: OrderItem[];
  total_price: number;
  delivery_fee: number;
  status: OrderStatus;
  delivery_address: string;
  created_at: string;
  customer_phone: string;
}
