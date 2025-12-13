import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Store, Truck, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="p-6 bg-brand-red min-h-screen flex flex-col items-center justify-center text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">DomiDelivery</h1>
        <p className="text-brand-light text-lg opacity-90">Pide comida local sin comisiones.</p>
      </div>

      <div className="w-full space-y-4">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
          <h2 className="font-bold text-xl mb-4 flex items-center">
            <span className="bg-white text-brand-red w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
            Selecciona tu Rol
          </h2>
          <div className="space-y-3">
            <Link to="/customer" className="flex items-center justify-between bg-white text-brand-dark p-4 rounded-lg font-bold shadow-lg active:scale-95 transition-transform">
              <div className="flex items-center">
                <ShoppingBag className="mr-3 text-brand-red" />
                Soy Cliente
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </Link>

            <Link to="/merchant" className="flex items-center justify-between bg-white text-brand-dark p-4 rounded-lg font-bold shadow-lg active:scale-95 transition-transform">
              <div className="flex items-center">
                <Store className="mr-3 text-blue-600" />
                Soy Negocio
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </Link>

            <Link to="/driver" className="flex items-center justify-between bg-white text-brand-dark p-4 rounded-lg font-bold shadow-lg active:scale-95 transition-transform">
              <div className="flex items-center">
                <Truck className="mr-3 text-green-600" />
                Soy Driver
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-brand-light/70">
        <p>Prototipo MVP para República Dominicana 🇩🇴</p>
      </div>
    </div>
  );
};

export default Home;