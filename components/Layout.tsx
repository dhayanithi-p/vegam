import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Home, Settings, PlusCircle, LogOut, LayoutDashboard, UtensilsCrossed, Menu, User } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  const { cartCount, restaurant } = useStore();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Desktop/Mobile Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link to="/" className="md:hidden p-1 -ml-2 text-gray-600 hover:text-primary">
                <ChevronLeft size={24} />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-red-600 text-white p-1.5 md:p-2 rounded-lg group-hover:bg-red-700 transition-colors">
                <UtensilsCrossed size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg md:text-xl leading-none text-gray-900 tracking-tight">
                  {restaurant.name}
                </h1>
                <p className="hidden md:block text-xs text-gray-500 font-medium">{restaurant.city}</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link to="/" className="hover:text-red-600 transition-colors">Menu</Link>
              <Link to="/#about" className="hover:text-red-600 transition-colors">About</Link>
              <Link to="/#contact" className="hover:text-red-600 transition-colors">Contact</Link>
              {user ? (
                <button onClick={() => logout()} className="hover:text-red-600 transition-colors flex items-center gap-1">
                  <LogOut size={16} /> Logout
                </button>
              ) : (
                <Link to="/login" className="hover:text-red-600 transition-colors flex items-center gap-1">
                  <User size={16} /> Login
                </Link>
              )}
            </nav>

            <Link to="/cart" className="relative group flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
              <span className="hidden md:inline">My Cart</span>
              <div className="relative">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {children}
      </main>

      {/* Mobile Floating Cart (only on home) */}
      {cartCount > 0 && location.pathname === '/' && (
        <div className="md:hidden fixed bottom-6 left-0 right-0 px-4 z-50">
          <Link to="/cart" className="flex items-center justify-between bg-primary text-white p-4 rounded-xl shadow-lg hover:bg-red-700 transition-all active:scale-95">
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm">{cartCount} ITEMS</span>
              <span className="text-xs opacity-90">Review Order</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              View Cart <ShoppingBag size={18} />
            </div>
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {restaurant.name}. Crafted for meat lovers.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-600">Privacy Policy</a>
            <a href="#" className="hover:text-red-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 text-red-500 mb-1">
            <UtensilsCrossed size={24} />
            <h1 className="text-xl font-bold tracking-wider text-white">ADMIN<span className="text-red-500">.</span></h1>
          </div>
          <p className="text-xs text-gray-400">Restaurant Management</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <LayoutDashboard size={20} className="group-hover:text-red-500" /> Dashboard
          </Link>
          <Link to="/admin/add-item" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <PlusCircle size={20} className="group-hover:text-red-500" /> Add Food
          </Link>
          <Link to="/admin/restaurant" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <Settings size={20} className="group-hover:text-red-500" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 hover:bg-gray-800 rounded-lg">
            <LogOut size={16} /> Exit to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md md:hidden sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-wider text-red-500">ADMIN</span>
          </div>
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            <LogOut size={14} /> Exit
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 text-xs font-medium text-gray-500 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Link to="/admin/dashboard" className="flex flex-col items-center gap-1 hover:text-primary focus:text-primary">
            <Home size={20} /> Home
          </Link>
          <Link to="/admin/add-item" className="flex flex-col items-center gap-1 hover:text-primary focus:text-primary">
            <PlusCircle size={20} /> Add Food
          </Link>
          <Link to="/admin/restaurant" className="flex flex-col items-center gap-1 hover:text-primary focus:text-primary">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};
