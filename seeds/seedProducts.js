const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
    seller: 'TechStore'
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable and durable cotton t-shirt',
    price: 499,
    originalPrice: 999,
    discount: 50,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 100,
    rating: 4.2,
    seller: 'FashionHub'
  },
  {
    name: 'LED Table Lamp',
    description: 'Energy-efficient LED table lamp with USB charging',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1565636192335-14c2b7f76c1d?w=500',
    stock: 30,
    rating: 4.3,
    seller: 'HomeDecor'
  },
  {
    name: 'Sports Running Shoes',
    description: 'Professional running shoes with cushion support',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 40,
    rating: 4.6,
    seller: 'SportGear'
  },
  {
    name: 'Programming in Python',
    description: 'Complete guide to learn Python programming',
    price: 399,
    originalPrice: 799,
    discount: 50,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
    stock: 60,
    rating: 4.4,
    seller: 'BookStore'
  },
  {
    name: 'Smartphone Stand',
    description: 'Adjustable phone stand for desk',
    price: 299,
    originalPrice: 599,
    discount: 50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1586253408387-d0d97e37edd6?w=500',
    stock: 80,
    rating: 4.1,
    seller: 'TechStore'
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500',
    stock: 45,
    rating: 4.5,
    seller: 'FitnessPro'
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Keeps drinks hot or cold for 24 hours',
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602143407151-7e406dc6c999?w=500',
    stock: 70,
    rating: 4.3,
    seller: 'HomeEssentials'
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kartikshop')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
