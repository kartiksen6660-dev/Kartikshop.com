import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    fetchProducts();
  }, [search, category, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products', {
        params: { search, category, page, limit: 12 }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to KartikShop</h1>
          <p className="text-xl">Best deals on electronics, fashion, and more</p>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {['Electronics', 'Fashion', 'Home', 'Sports', 'Books'].map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center"
            >
              <p className="font-semibold">{cat}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto pb-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        {products.length === 0 ? (
          <div className="text-center py-12">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
