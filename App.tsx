import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DatabaseProvider } from './services/mockDb';
import Home from './views/Home';
import CustomerView from './views/Customer';
import MerchantView from './views/Merchant';
import DriverView from './views/Driver';
import Navbar from './components/Navbar';

// This App component sets up the routing and wraps the app in our 
// "DatabaseProvider" which simulates Supabase for this demo.

const App: React.FC = () => {
  return (
    <DatabaseProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customer" element={<CustomerView />} />
              <Route path="/merchant" element={<MerchantView />} />
              <Route path="/driver" element={<DriverView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </DatabaseProvider>
  );
};

export default App;