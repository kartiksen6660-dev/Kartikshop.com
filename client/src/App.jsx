import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/checkout" element={<Checkout user={user} />} />
            <Route path="/orders" element={<OrderHistory user={user} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            {user?.role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
