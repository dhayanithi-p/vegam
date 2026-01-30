import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/StoreContext';
import { Button } from '../../components/UI';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();

  // Helper component for ShoppingBag icon
  function ShoppingBag({size}: {size: number}) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      )
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6 bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-200">
           <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't made your choice yet. Browse our menu to find something delicious.</p>
        <Button onClick={() => navigate('/')} variant="primary">Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
          Your Order
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{cart.length} items</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-gray-900 text-lg">₹{(item.price * item.quantity)}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
                </div>
            </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Item Total</span>
                        <span className="font-medium">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span className="font-medium">₹40</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Platform Fee</span>
                        <span className="font-medium">₹20</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-4 pt-4 flex justify-between font-extrabold text-xl text-gray-900">
                        <span>Total</span>
                        <span>₹{(cartTotal + 60)}</span>
                    </div>
                </div>

                <Button fullWidth onClick={() => navigate('/checkout')} className="mb-3">
                    Proceed to Checkout <ArrowRight size={18} />
                </Button>
                <p className="text-center text-xs text-gray-400">Safe & Secure Payment</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Cart;