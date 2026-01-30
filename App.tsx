import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { UserLayout, AdminLayout } from './components/Layout';
import Home from './pages/user/Home';
import ProductDetails from './pages/user/ProductDetails';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import OrderSuccess from './pages/user/OrderSuccess';
import OrderHistory from './pages/user/OrderHistory';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminDashboard, AddItem, RestaurantSettings } from './pages/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

// Simple guard for admin routes
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <StoreProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* User Routes */}
            <Route path="/" element={<UserLayout><Home /></UserLayout>} />
            <Route path="/product/:id" element={<UserLayout><ProductDetails /></UserLayout>} />
            <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <UserLayout><Checkout /></UserLayout>
              </ProtectedRoute>
            } />
            <Route path="/order-success" element={
              <ProtectedRoute>
                <UserLayout><OrderSuccess /></UserLayout>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <UserLayout><OrderHistory /></UserLayout>
              </ProtectedRoute>
            } />

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
      </AuthProvider>
    </StoreProvider >
  );
};

export default App;
