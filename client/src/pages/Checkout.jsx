import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = ({ user }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/cart/${user.id}`);
      setCart(response.data);
    } catch (error) {
      toast.error('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      const orderData = {
        userId: user.id,
        products: cart.items,
        shippingAddress: formData,
        totalAmount: cart.totalPrice
      };

      // For now, create order without payment
      const response = await axios.post('/api/orders', orderData);

      // Clear cart
      await axios.post(`/api/cart/${user.id}/clear`);

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Error placing order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipcode"
                placeholder="ZIP Code"
                value={formData.zipcode}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 mt-6"
            >
              {processing ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
              <div key={item.productId._id} className="flex justify-between">
                <span>{item.productId.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹{cart.totalPrice}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{cart.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
