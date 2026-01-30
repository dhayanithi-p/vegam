import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flame, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import { Category } from '../../types';
import { FoodCard, CategoryPill } from '../../components/UI';

const Home = () => {
  const { menu, addToCart } = useStore();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.values(Category)];

  const filteredItems = useMemo(() => {
    return menu.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menu, searchQuery, selectedCategory]);

  return (
    <div className="pb-8">
      {/* Hero / Search Section */}
      <div className="relative bg-white rounded-2xl p-6 md:p-10 mb-8 shadow-sm border border-gray-100 overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-xl">
                <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                    <Flame size={20} fill="currentColor" />
                    <span className="text-sm tracking-wider uppercase">Premium Quality</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Craving something <span className="text-red-600">Meaty?</span>
                </h2>
                <p className="text-gray-500 text-lg mb-6">Order fresh, hot, and spicy non-veg delicacies delivered straight to your door.</p>
                
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for Biryani, Chicken, Rolls..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-base outline-none focus:ring-4 focus:ring-red-50 focus:border-red-500 transition-all shadow-sm"
                    />
                </div>
            </div>
            
            <div className="hidden md:block">
                {/* Decorative element or illustration could go here */}
                <div className="bg-orange-100 text-orange-800 px-6 py-4 rounded-2xl font-bold text-center">
                    <span className="text-3xl block mb-1">🔥</span>
                    Hot Deals<br/>Inside
                </div>
            </div>
         </div>
      </div>

      {/* Promotional Banner */}
      <div 
        onClick={() => navigate('/product/30')}
        className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-2xl shadow-lg mb-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="z-10 text-center md:text-left">
             <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold mb-3 shadow-sm mx-auto md:mx-0">
                <Tag size={12} /> LIMITED TIME OFFER
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">The Royal Seafood Platter 🦞</h3>
            <p className="font-medium opacity-90 text-sm md:text-base max-w-md mb-4 md:mb-0">
                Grilled Prawns, Fish Tikka, Calamari & Crab. A feast fit for a king. 
                <span className="block mt-1 text-yellow-300 font-bold text-lg">Flat 30% OFF Today!</span>
            </p>
        </div>
        <div className="mt-4 md:mt-0 z-10 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden hidden md:block shadow-lg">
                <img src="https://images.unsplash.com/photo-1599458253896-76497f88f7bc?auto=format&fit=crop&w=800&q=80" alt="Seafood Platter" className="w-full h-full object-cover" />
             </div>
            <button 
                className="bg-white text-red-700 font-bold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
                Order Now <ArrowRight size={16} />
            </button>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 text-[150px] opacity-5 pointer-events-none rotate-12">
            🐟
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">Browse Categories</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {categories.map(cat => (
            <CategoryPill
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
            />
            ))}
        </div>
      </div>

      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-2xl text-gray-900">
            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory === 'All' ? 'Popular Items' : selectedCategory}
          </h2>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">{filteredItems.length} items</span>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
                <div key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                <FoodCard 
                    item={item} 
                    onAdd={(i) => addToCart(i)} 
                />
                </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
             <div className="text-6xl mb-4">🍖</div>
             <h3 className="text-xl font-bold text-gray-800 mb-2">No meat found here!</h3>
             <p className="text-gray-500 mb-6">Try searching for something else or browse all categories.</p>
             <button onClick={() => {setSearchQuery(''); setSelectedCategory('All')}} className="text-red-600 font-bold hover:underline">View Full Menu</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;