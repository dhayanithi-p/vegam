import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { Input, Button } from '../../components/UI';
import { Order } from '../../types';
import { ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, placeOrder } = useStore();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        landmark: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const order: Order = {
                id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                userId: user?.uid || 'guest', // Link order to user
                items: [...cart],
                total: cartTotal + 60, // Adding Delivery (40) + Platform (20)
                customerName: formData.name,
                customerPhone: formData.phone,
                customerAddress: formData.address,
                landmark: formData.landmark,
                date: new Date().toISOString()
            };

            await placeOrder(order);
            navigate('/order-success');
        } catch (error) {
            console.error('Error placing order:', error);
        } finally {
            setLoading(false);
        }
    };

    const isValid = formData.name && formData.phone && formData.address;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-8">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Form Section */}
                <div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                            Delivery Details
                        </h3>
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                placeholder="e.g. 9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Delivery Address"
                                name="address"
                                placeholder="Flat No, Building, Street"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Landmark (Optional)"
                                name="landmark"
                                placeholder="Near City Park"
                                value={formData.landmark}
                                onChange={handleChange}
                            />
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                            Payment Method
                        </h3>
                        <div className="bg-green-50 text-green-800 p-5 rounded-xl border border-green-200 text-sm font-medium flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full shadow-sm">💵</div>
                            <div>
                                <span className="block font-bold">Cash on Delivery</span>
                                <span className="text-green-700/80 text-xs">Pay when you receive your order</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-800 mb-4">Order Review</h3>
                        <div className="space-y-3 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                                    <span className="font-medium">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 my-4 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Fees</span>
                                <span>₹60</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl text-gray-900 pt-2">
                                <span>Total</span>
                                <span>₹{(cartTotal + 60)}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            fullWidth
                            disabled={!isValid || loading}
                            className="mt-4"
                        >
                            {loading ? 'Placing Order...' : `Pay ₹${cartTotal + 60}`}
                        </Button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <ShieldCheck size={14} /> Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;