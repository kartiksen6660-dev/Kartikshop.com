const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  shippingAddress: {
    name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
