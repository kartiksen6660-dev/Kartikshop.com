import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderHistory = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/user/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      toast.error('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">₹{order.totalAmount}</p>
                  <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                    order.orderStatus === 'delivered' ? 'bg-green-500' :
                    order.orderStatus === 'shipped' ? 'bg-blue-500' :
                    order.orderStatus === 'confirmed' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Items:</h3>
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex justify-between mb-2">
                    <span>{product.name} x {product.quantity}</span>
                    <span>₹{product.price * product.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <p className="text-sm text-gray-600"><strong>Shipping To:</strong> {order.shippingAddress.city}, {order.shippingAddress.state}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
