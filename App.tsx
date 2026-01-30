import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { UserLayout, AdminLayout } from './components/Layout';
import Home from './pages/user/Home';
import ProductDetails from './pages/user/ProductDetails';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import OrderSuccess from './pages/user/OrderSuccess';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminDashboard, AddItem, RestaurantSettings } from './pages/admin/AdminDashboard';

// Simple guard for admin routes
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          <Route path="/product/:id" element={<UserLayout><ProductDetails /></UserLayout>} />
          <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
          <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />
          <Route path="/order-success" element={<UserLayout><OrderSuccess /></UserLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/add-item" element={
            <ProtectedAdminRoute>
              <AddItem />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/restaurant" element={
            <ProtectedAdminRoute>
              <RestaurantSettings />
            </ProtectedAdminRoute>
          } />

        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
