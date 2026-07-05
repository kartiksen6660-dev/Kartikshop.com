import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';

const Cart = ({ user }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(`/api/cart/${user.id}/remove`, { productId });
      setCart(response.data);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Error removing from cart');
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="bg-white p-6 rounded-lg shadow mb-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-blue-600 font-bold">₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 size={24} />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{cart.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{cart.totalPrice}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 block text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
