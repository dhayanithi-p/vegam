import React, { useState } from 'react';
import { FoodItem } from '../types';
import { Plus, ShoppingBag } from 'lucide-react';

// --- Food Card ---
interface FoodCardProps {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
}

export const FoodCard = ({ item, onAdd }: FoodCardProps) => {
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const originalPrice = item.discount 
    ? Math.round(item.price * (100 / (100 - item.discount))) 
    : null;

  return (
    <div className="flex flex-row md:flex-col bg-white p-3 md:p-0 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full gap-3 md:gap-0 relative overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="w-28 h-28 md:w-full md:h-56 flex-shrink-0 bg-gray-200 md:rounded-t-xl rounded-lg overflow-hidden relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        
        {/* Badges Container */}
        <div className="absolute top-0 left-0 flex flex-col items-start gap-1 z-10">
            {item.discount && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm">
                {item.discount}% OFF
            </span>
            )}
            {item.isBestseller && (
            <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-r-lg shadow-sm">
                BESTSELLER
            </span>
            )}
        </div>

        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-1 md:p-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-800 text-base md:text-lg leading-tight pr-2">{item.name}</h3>
            <span className={`text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap ${
              item.spiceLevel === 'Spicy' ? 'border border-red-200 text-red-600 bg-red-50' :
              item.spiceLevel === 'Medium' ? 'border border-orange-200 text-orange-600 bg-orange-50' :
              'border border-green-200 text-green-600 bg-green-50'
            }`}>
              {item.spiceLevel}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2 mb-3">{item.description}</p>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2 md:pt-4 border-t border-gray-50 md:border-gray-100">
           <div className="flex flex-col">
             {item.discount ? (
               <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                 <span className="font-bold text-gray-900 text-lg">₹{item.price}</span>
                 <span className="text-xs text-gray-400 line-through decoration-red-400">₹{originalPrice}</span>
               </div>
             ) : (
               <span className="font-bold text-gray-900 text-lg">₹{item.price}</span>
             )}
           </div>
           
           <button 
             onClick={handleAdd}
             className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
               added 
               ? 'bg-green-600 text-white scale-105' 
               : 'bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300'
             }`}
           >
             {added ? 'Added' : 'Add'}
             {!added && <Plus size={16} strokeWidth={3} />}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- Category Pill ---
interface CategoryPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:-translate-y-0.5 ${
      isActive 
        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 scale-105' 
        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
    }`}
  >
    {label}
  </button>
);

// --- Input Field ---
interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
      {label}
    </label>
    <input
      className={`w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 block p-3.5 outline-none transition-all shadow-sm ${className || ''}`}
      {...props}
    />
  </div>
);

// --- Button ---
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, size = 'md', className, ...props }) => {
  const baseStyle = "font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3.5 px-6",
    lg: "py-4 px-8 text-lg"
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-red-700 shadow-lg shadow-red-200 hover:shadow-red-300",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200",
    outline: "bg-transparent border-2 border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
  };

  return (
    <button 
      className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
