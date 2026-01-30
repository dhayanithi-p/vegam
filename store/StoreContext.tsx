import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem, CartItem, RestaurantDetails, Order } from '../types';
import { INITIAL_MENU, DEFAULT_RESTAURANT } from '../constants';

interface StoreContextType {
  // Restaurant & Menu
  restaurant: RestaurantDetails;
  menu: FoodItem[];
  addMenuItem: (item: FoodItem) => void;
  updateRestaurant: (details: RestaurantDetails) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Order
  placeOrder: (order: Order) => void;
  lastOrder: Order | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from local storage or defaults
  const [restaurant, setRestaurant] = useState<RestaurantDetails>(() => {
    const saved = localStorage.getItem('meatExpress_restaurant');
    return saved ? JSON.parse(saved) : DEFAULT_RESTAURANT;
  });

  const [menu, setMenu] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('meatExpress_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('meatExpress_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Persistence Effects
  useEffect(() => localStorage.setItem('meatExpress_restaurant', JSON.stringify(restaurant)), [restaurant]);
  useEffect(() => localStorage.setItem('meatExpress_menu', JSON.stringify(menu)), [menu]);
  useEffect(() => localStorage.setItem('meatExpress_cart', JSON.stringify(cart)), [cart]);

  // Actions
  const addMenuItem = (item: FoodItem) => {
    setMenu(prev => [item, ...prev]);
  };

  const updateRestaurant = (details: RestaurantDetails) => {
    setRestaurant(details);
  };

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const placeOrder = (order: Order) => {
    setLastOrder(order);
    clearCart();
    // In a real app, send to API here
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      restaurant,
      menu,
      addMenuItem,
      updateRestaurant,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      placeOrder,
      lastOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};