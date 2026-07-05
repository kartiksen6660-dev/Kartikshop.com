import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${user.id}`);
      setFormData(response.data);
    } catch (error) {
      toast.error('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const response = await axios.put(`/api/users/${user.id}`, formData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label className="block font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            disabled
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8">Address</h2>

        <div>
          <label className="block font-semibold mb-2">Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address?.street || ''}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address?.city || ''}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">State</label>
            <input
              type="text"
              name="address.state"
              value={formData.address?.state || ''}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">ZIP Code</label>
            <input
              type="text"
              name="address.zipcode"
              value={formData.address?.zipcode || ''}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Country</label>
            <input
              type="text"
              name="address.country"
              value={formData.address?.country || ''}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
