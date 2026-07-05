import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      toast.error('Error loading stats');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { orderStatus: status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Error updating order');
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'stats'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'orders'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          Orders
        </button>
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{order._id.slice(-6)}</td>
                  <td className="p-4">{order.shippingAddress?.name}</td>
                  <td className="p-4 font-semibold">₹{order.totalAmount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded text-white text-sm ${
                      order.orderStatus === 'delivered' ? 'bg-green-500' :
                      order.orderStatus === 'shipped' ? 'bg-blue-500' :
                      order.orderStatus === 'confirmed' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="border p-2 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
