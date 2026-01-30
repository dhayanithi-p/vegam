import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/firestoreService';
import { Order } from '../../types';
import { Package, ChevronDown, ChevronUp, Clock, MapPin, Phone, Loader2 } from 'lucide-react';

const OrderHistory = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        if (user?.uid) {
            loadOrders();
        }
    }, [user, authLoading, isAuthenticated, navigate]);

    const loadOrders = async () => {
        try {
            const userOrders = await getUserOrders(user!.uid);
            // Transform Firestore data to Order type
            const transformedOrders = userOrders.map(order => ({
                ...order,
                id: order.id,
            })) as Order[];
            setOrders(transformedOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'confirmed': return 'bg-blue-100 text-blue-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading || authLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-red-600 mb-4" size={48} />
                <p className="text-gray-500 font-medium">Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-100 p-3 rounded-xl">
                    <Package className="text-red-600" size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
                    <p className="text-gray-500 text-sm">{orders.length} orders placed</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Start ordering delicious food!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            {/* Order Header */}
                            <div
                                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <Package className="text-gray-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">#{order.id.slice(-6).toUpperCase()}</p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Clock size={12} /> {formatDate(order.date)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                                        {order.status || 'pending'}
                                    </span>
                                    <span className="font-bold text-gray-900">₹{order.total}</span>
                                    {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>

                            {/* Order Details (Expanded) */}
                            {expandedOrder === order.id && (
                                <div className="border-t border-gray-100 p-5 bg-gray-50">
                                    <h4 className="font-bold text-sm text-gray-600 mb-3">Items Ordered</h4>
                                    <div className="space-y-2 mb-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span className="text-gray-700">
                                                    {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                                </span>
                                                <span className="font-medium">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 space-y-2">
                                        <h4 className="font-bold text-sm text-gray-600 mb-2">Delivery Details</h4>
                                        <p className="text-sm text-gray-700 flex items-center gap-2">
                                            <Phone size={14} className="text-gray-400" /> {order.customerPhone}
                                        </p>
                                        <p className="text-sm text-gray-700 flex items-start gap-2">
                                            <MapPin size={14} className="text-gray-400 mt-0.5" />
                                            {order.customerAddress}
                                            {order.landmark && ` (${order.landmark})`}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigate('/')}
                                        className="mt-4 w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors"
                                    >
                                        Order Again
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
