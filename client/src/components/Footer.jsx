import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🛒 KartikShop</h3>
            <p className="text-gray-400">Your one-stop destination for all your shopping needs. Quality products at the best prices.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/" className="hover:text-white">Products</a></li>
              <li><a href="/" className="hover:text-white">About Us</a></li>
              <li><a href="/" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">FAQ</a></li>
              <li><a href="/" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/" className="hover:text-white">Returns</a></li>
              <li><a href="/" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <FiPhone /> +91 9876543210
              </li>
              <li className="flex items-center gap-2">
                <FiMail /> support@kartikshop.com
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1" /> 123 Main Street, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 KartikShop. All rights reserved.</p>
          <p>Made with ❤️ by Kartik</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
