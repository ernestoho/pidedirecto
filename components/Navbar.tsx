import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Store, Truck } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  // Helper to determine active state
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center z-50 max-w-md mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <NavLink 
        to="/" 
        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/') ? 'text-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Home size={24} />
        <span className="text-xs font-medium mt-1">Inicio</span>
      </NavLink>
      
      <NavLink 
        to="/customer" 
        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/customer') ? 'text-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <ShoppingBag size={24} />
        <span className="text-xs font-medium mt-1">Pedir</span>
      </NavLink>

      <NavLink 
        to="/merchant" 
        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/merchant') ? 'text-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Store size={24} />
        <span className="text-xs font-medium mt-1">Negocio</span>
      </NavLink>

      <NavLink 
        to="/driver" 
        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/driver') ? 'text-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Truck size={24} />
        <span className="text-xs font-medium mt-1">Driver</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;