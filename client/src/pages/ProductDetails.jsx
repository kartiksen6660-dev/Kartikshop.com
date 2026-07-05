import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast.error('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      await axios.post(`/api/cart/${user.id}/add`, {
        productId: id,
        quantity
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;
  if (!product) return <div className="container mx-auto py-20 text-center">Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.image || 'https://via.placeholder.com/400'}
              alt={product.name}
              className="w-full max-w-md h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">⭐ {product.rating || 4.5}</span>
              <span className="text-gray-600">({product.reviews?.length || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-blue-600">₹{product.price}</p>
              {product.originalPrice && (
                <p className="text-lg line-through text-gray-500">₹{product.originalPrice}</p>
              )}
              {product.discount && (
                <p className="text-lg text-green-600 font-semibold">{product.discount}% OFF</p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold">✓ In Stock</p>
              ) : (
                <p className="text-red-600 font-semibold">✗ Out of Stock</p>
              )}
            </div>

            {/* Category & Seller */}
            <div className="mb-6 space-y-2">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Seller:</strong> {product.seller || 'KartikShop'}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-16 px-2 py-2 border rounded text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
            >
              <FiShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="border-b pb-4">
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
