const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, products, shippingAddress, totalAmount } = req.body;

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create order in DB
    const order = new Order({
      userId,
      products,
      shippingAddress,
      totalAmount,
      paymentMethod: 'razorpay',
      razorpayOrderId: razorpayOrder.id
    });

    await order.save();

    res.json({
      order,
      razorpayOrder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;

    const order = await Order.findOne({ razorpayOrderId: orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = 'completed';
    order.razorpayPaymentId = razorpayPaymentId;
    order.orderStatus = 'confirmed';
    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate({ userId: order.userId }, { items: [], totalPrice: 0 });

    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
