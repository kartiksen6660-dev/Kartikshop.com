import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.error('Please login first');
        return;
      }

      await axios.post(`/api/cart/${user.id}/add`, {
        productId: product._id,
        quantity: 1
      });
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4">
      <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <Link to={`/product/${product._id}`} className="text-lg font-semibold hover:text-blue-600">
        {product.name.slice(0, 50)}...
      </Link>

      <p className="text-gray-600 text-sm mb-2">{product.category}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm line-through text-gray-500">₹{product.originalPrice}</p>
          )}
        </div>
        <p className="text-yellow-500">⭐ {product.rating}</p>
      </div>

      <button
        onClick={addToCart}
        className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
      >
        <FiShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
