import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            🛒 KartikShop
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-l-lg text-black"
            />
            <button
              type="submit"
              className="bg-blue-800 px-6 py-2 rounded-r-lg hover:bg-blue-900"
            >
              Search
            </button>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-200">
              <FiShoppingCart size={20} />
              <span>Cart</span>
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-gray-200">
                  <FiUser size={20} />
                  <span>{user.name}</span>
                </Link>
                <Link to="/orders" className="hover:text-gray-200">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-gray-200"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-l-lg text-black"
              />
              <button type="submit" className="bg-blue-800 px-4 rounded-r-lg">
                Go
              </button>
            </form>
            <Link to="/cart" className="block hover:text-gray-200">
              🛒 Cart
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="block hover:text-gray-200">
                  👤 {user.name}
                </Link>
                <Link to="/orders" className="block hover:text-gray-200">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block bg-red-500 px-3 py-2 rounded">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:text-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="block bg-yellow-500 text-black px-4 py-2 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
