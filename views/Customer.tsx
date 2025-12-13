import React, { useState } from 'react';
import { useDatabase } from '../services/mockDb';
import { MenuItem, OrderItem } from '../types';
import { Plus, Minus, ShoppingCart, MapPin, Phone } from 'lucide-react';

const CustomerView: React.FC = () => {
  const { restaurant, createOrder } = useDatabase();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [address, setAddress] = useState<string>('');
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 150;

  const handleWhatsAppCheckout = () => {
    if (!address.trim()) {
      alert("Por favor ingresa tu dirección.");
      return;
    }

    // 1. Create Order in 'DB' (Simulated)
    createOrder({
      customer_id: 'cust-demo', // anonymous for demo
      restaurant_id: restaurant.id,
      items: cart,
      total_price: cartTotal,
      delivery_fee: deliveryFee,
      delivery_address: address,
      customer_phone: '809-555-0000' // Demo phone
    });

    // 2. Format WhatsApp Message
    const itemsList = cart.map(item => `- ${item.quantity}x ${item.name} (RD$${item.price * item.quantity})`).join('\n');
    const message = `Hola! Quiero pedir en ${restaurant.name}:
${itemsList}

Subtotal: RD$${cartTotal}
Envío: RD$${deliveryFee}
*Total: RD$${cartTotal + deliveryFee}*

Dirección: ${address}

(Enviado desde DomiDelivery App)`;

    // 3. Open WhatsApp
    const url = `https://wa.me/${restaurant.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Reset
    setCart([]);
    setShowCart(false);
    setAddress('');
  };

  if (showCart) {
    return (
      <div className="p-4 min-h-screen bg-gray-50">
        <button onClick={() => setShowCart(false)} className="mb-4 text-gray-500 font-medium hover:text-brand-red flex items-center">
          &larr; Volver al menú
        </button>
        <h2 className="text-2xl font-bold mb-6">Tu Orden</h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-brand-red text-sm">RD${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">-</button>
                    <span className="font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price } as MenuItem)} className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>RD${cartTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Envío (Driver)</span>
                <span>RD${deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                <span>Total</span>
                <span>RD${cartTotal + deliveryFee}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Entrega</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, Número, Sector..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-red outline-none"
                />
              </div>
            </div>

            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 hover:bg-[#20b858] transition-colors"
            >
              <Phone size={24} />
              <span>Ordenar por WhatsApp</span>
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-48 bg-gray-200">
        <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-white/90 text-sm flex items-center mt-1">
            <MapPin size={14} className="mr-1" />
            {restaurant.address}
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Menú</h2>
        <div className="space-y-4">
          {restaurant.menu_items.map(item => (
            <div key={item.id} className="flex bg-white p-3 rounded-xl shadow-sm border border-gray-100">
              <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-200" />
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-brand-red">RD${item.price}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-brand-red text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 max-w-md mx-auto z-40">
          <button 
            onClick={() => setShowCart(true)}
            className="w-full bg-brand-red text-white py-3 px-6 rounded-xl shadow-xl flex justify-between items-center font-bold animate-bounce-short"
          >
            <div className="flex items-center">
              <span className="bg-white/20 px-2 py-1 rounded text-sm mr-2">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
              <span>Ver Pedido</span>
            </div>
            <span>RD${cartTotal}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerView;