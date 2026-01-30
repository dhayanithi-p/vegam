import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/StoreContext';
import { Button } from '../../components/UI';
import { ArrowLeft, Clock, ShoppingBag, Flame, Star, Truck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { menu, addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const item = menu.find(i => i.id === id);

  if (!item) return <div className="p-8 text-center text-gray-500">Item not found</div>;

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => {
        setAdded(false);
        // On desktop, we might not want to navigate away immediately, 
        // but for consistency with mobile flow, let's go back or maybe show a toast.
        // For now, let's redirect to menu to encourage more ordering.
        navigate('/'); 
    }, 800);
  };

  return (
    <div className="bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-100 overflow-hidden min-h-[80vh]">
        <div className="md:grid md:grid-cols-2 h-full">
            {/* Image Section */}
            <div className="relative h-72 md:h-full bg-gray-100 group overflow-hidden">
                 <button 
                    onClick={() => navigate(-1)} 
                    className="absolute top-4 left-4 z-20 bg-white/90 p-2.5 rounded-full shadow-md backdrop-blur-sm hover:bg-white transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-800"/>
                </button>
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col h-full p-6 md:p-10 relative">
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${
                            item.spiceLevel === 'Spicy' ? 'bg-red-50 text-red-600 border border-red-100' : 
                            item.spiceLevel === 'Medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                            'bg-green-50 text-green-600 border border-green-100'
                        }`}>
                            <Flame size={12} fill="currentColor" /> {item.spiceLevel}
                        </span>
                        
                        {item.isBestseller && (
                            <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">
                                <Star size={12} fill="currentColor" /> Bestseller
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{item.name}</h1>
                    <p className="text-2xl font-bold text-gray-900 mb-6">₹{item.price}</p>

                    <div className="h-px bg-gray-100 w-full mb-6"></div>

                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                        {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Clock size={20} className="text-gray-400" />
                            <div>
                                <span className="block text-xs text-gray-500 font-bold uppercase">Prep Time</span>
                                <span className="font-semibold text-gray-800">20-25 mins</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <Truck size={20} className="text-gray-400" />
                            <div>
                                <span className="block text-xs text-gray-500 font-bold uppercase">Delivery</span>
                                <span className="font-semibold text-gray-800">Free &gt; ₹500</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100 md:border-none">
                    <Button 
                        fullWidth 
                        onClick={handleAdd}
                        size="lg"
                        className="text-lg py-4"
                    >
                        {added ? 'ADDED TO CART!' : 'ADD TO CART'}
                        {!added && <ShoppingBag size={20} />}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetails;