import React, { useState } from 'react';
import { useStore } from '../../store/StoreContext';
import { Input, Button } from '../../components/UI';
import { Category, FoodItem } from '../../types';
import { Plus, Save, Settings, TrendingUp, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

// --- Analytics Components ---

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">{title}</p>
      <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
      <p className={`text-xs font-medium mt-1 ${color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>{sub}</p>
    </div>
    <div className={`p-3 rounded-xl ${color === 'green' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
      <Icon size={24} />
    </div>
  </div>
);

const BarChart = () => {
  // Mock data for the last 7 days
  const data = [45, 70, 30, 85, 55, 65, 90];
  const max = Math.max(...data);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="h-48 flex items-end justify-between gap-2 md:gap-4 px-2">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-2 group flex-1">
           <div className="relative w-full flex justify-center">
             <div 
                className="w-full max-w-[40px] bg-red-500 rounded-t-md hover:bg-red-600 transition-all relative group-hover:scale-y-110 origin-bottom"
                style={{ height: `${(val / max) * 120}px` }}
             ></div>
             <div className="absolute -top-8 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                 ₹{val}k
             </div>
           </div>
           <span className="text-xs text-gray-400 font-medium">{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

export const AdminDashboard = () => {
  const { restaurant, menu } = useStore();
  
  // Derived / Mock Stats
  const totalItems = menu.length;
  const bestSellers = menu.filter(i => i.isBestseller).length;
  const categoriesCount = Object.values(Category).length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-500">Welcome back to {restaurant.name} admin panel.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Last 7 Days</button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">Export Report</button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Revenue" 
            value="₹48,250" 
            sub="+12.5% from last week" 
            icon={DollarSign} 
            color="green" 
        />
        <StatCard 
            title="Total Orders" 
            value="342" 
            sub="+8% new customers" 
            icon={ShoppingCart} 
            color="blue" 
        />
         <StatCard 
            title="Menu Items" 
            value={totalItems} 
            sub={`${bestSellers} Bestsellers active`} 
            icon={Activity} 
            color="blue" 
        />
        <StatCard 
            title="Active Users" 
            value="1,205" 
            sub="Currently online" 
            icon={Users} 
            color="green" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Revenue Chart */}
         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Revenue Analytics</h3>
            <BarChart />
         </div>

         {/* Category Distribution */}
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Popular Categories</h3>
            <div className="space-y-4">
                {[
                    { label: 'Biryani', val: 75, color: 'bg-orange-500' },
                    { label: 'Starters', val: 60, color: 'bg-red-500' },
                    { label: 'Gravy', val: 45, color: 'bg-yellow-500' },
                    { label: 'Rolls', val: 30, color: 'bg-green-500' },
                ].map(c => (
                    <div key={c.label}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{c.label}</span>
                            <span className="text-gray-500">{c.val}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className={`h-2 rounded-full ${c.color}`} style={{ width: `${c.val}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-bold text-sm text-gray-800 mb-2">Insight</h4>
                <p className="text-xs text-gray-500">Biryani sales peak on weekends. Consider running a combo offer on Fridays.</p>
            </div>
         </div>
      </div>

      {/* Recent Activity Mock */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
            <button className="text-red-600 text-sm font-bold hover:underline">View All</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4 font-bold">Order ID</th>
                        <th className="px-6 py-4 font-bold">Customer</th>
                        <th className="px-6 py-4 font-bold">Items</th>
                        <th className="px-6 py-4 font-bold">Amount</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[1,2,3].map((_, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-mono text-gray-600">#ORD-29{i}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">Customer {i+1}</td>
                            <td className="px-6 py-4 text-gray-500">2 Items</td>
                            <td className="px-6 py-4 font-bold">₹{(450 + i * 100)}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Completed</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export const AddItem = () => {
  const { addMenuItem } = useStore();
  const [formData, setFormData] = useState<Partial<FoodItem>>({
    name: '',
    price: 0,
    category: Category.BIRYANI,
    description: '',
    image: '',
    spiceLevel: 'Medium',
    discount: 0
  });
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category as Category,
      description: formData.description || '',
      image: formData.image || `https://picsum.photos/seed/${Date.now()}/400/300`,
      isAvailable: true,
      isBestseller: false,
      spiceLevel: (formData.spiceLevel as any) || 'Medium',
      discount: Number(formData.discount) || 0
    };

    addMenuItem(newItem);
    setSuccess('Item added successfully!');
    setFormData({ ...formData, name: '', price: 0, description: '', discount: 0 });
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plus size={24} className="text-red-600" /> Add New Food Item
      </h2>

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-sm font-bold flex items-center gap-2">
          <Activity size={18} /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Food Name" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Mutton Fry"
        />
        
        <div className="grid grid-cols-2 gap-6">
             <div className="mb-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Category</label>
                <div className="relative">
                    <select 
                        className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl p-3.5 outline-none appearance-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value as Category})}
                    >
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="mb-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Spice Level</label>
                <select 
                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                    value={formData.spiceLevel}
                    onChange={e => setFormData({...formData, spiceLevel: e.target.value as any})}
                >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Spicy">Spicy</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <Input 
                label="Selling Price (₹)" 
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
            />
            <Input 
                label="Discount % (Optional)" 
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={e => setFormData({...formData, discount: parseFloat(e.target.value)})}
            />
        </div>

        <Input 
          label="Image URL (Optional)" 
          value={formData.image}
          onChange={e => setFormData({...formData, image: e.target.value})}
          placeholder="https://..."
        />

        <div className="mb-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Description</label>
            <textarea 
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl p-3.5 outline-none h-32 focus:ring-2 focus:ring-red-100 focus:border-red-500"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the dish ingredients and taste..."
            />
        </div>

        <Button type="submit" fullWidth>Save Item to Menu</Button>
      </form>
    </div>
  );
};

export const RestaurantSettings = () => {
    const { restaurant, updateRestaurant } = useStore();
    const [data, setData] = useState(restaurant);
    const [msg, setMsg] = useState('');

    const handleSave = () => {
        updateRestaurant(data);
        setMsg('Settings Saved Successfully!');
        setTimeout(() => setMsg(''), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Settings size={24} className="text-gray-700" /> Restaurant Configuration
            </h2>

             {msg && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-sm font-bold">
                {msg}
                </div>
            )}

            <div className="space-y-5">
                <Input label="Restaurant Name" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                <Input label="City / Area" value={data.city} onChange={e => setData({...data, city: e.target.value})} />
                <Input label="Phone Contact" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Opening Time" type="time" value={data.opensAt} onChange={e => setData({...data, opensAt: e.target.value})} />
                    <Input label="Closing Time" type="time" value={data.closesAt} onChange={e => setData({...data, closesAt: e.target.value})} />
                </div>
                
                <div className="pt-4">
                    <Button onClick={handleSave} fullWidth>Update Configuration</Button>
                </div>
            </div>
        </div>
    );
}
