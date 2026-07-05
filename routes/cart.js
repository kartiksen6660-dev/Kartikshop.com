const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1, price: product.price });
    }

    // Calculate total
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.post('/:userId/remove', async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.post('/:userId/clear', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.module.exports = router;
