import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/StoreContext';
import { Button } from '../../components/UI';
import { CheckCircle, ChefHat } from 'lucide-react';

const OrderSuccess = () => {
  const { lastOrder } = useStore();
  const navigate = useNavigate();

  if (!lastOrder) {
      // If user refreshes, redirect home
      setTimeout(() => navigate('/'), 100);
      return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle size={48} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">
            Sit back and relax. Your non-veg feast is being prepared.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 w-full max-w-sm mb-8 text-left border border-gray-100">
            <div className="flex justify-between mb-4 border-b border-gray-200 pb-4">
                <div>
                    <span className="block text-xs text-gray-500 uppercase">Order ID</span>
                    <span className="font-mono font-bold text-lg">#{lastOrder.id}</span>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-gray-500 uppercase">Amount</span>
                    <span className="font-bold text-lg">₹{lastOrder.total}</span>
                </div>
            </div>
            
            <div className="space-y-2">
                <span className="block text-xs text-gray-500 uppercase mb-1">Items</span>
                {lastOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-800">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                    </div>
                ))}
            </div>

             <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="block text-xs text-gray-500 uppercase mb-1">Delivering To</span>
                <p className="text-sm font-medium text-gray-800">{lastOrder.customerAddress}</p>
            </div>
        </div>

        <Button onClick={() => navigate('/')} fullWidth>Order More</Button>
    </div>
  );
};

export default OrderSuccess;