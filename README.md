# KartikShop - Complete E-commerce Platform

## Overview
KartikShop is a full-stack e-commerce platform built with modern web technologies. It provides a complete shopping experience with product listing, cart management, secure payments, and admin dashboard.

## Features
✅ User Authentication (Login/Signup)  
✅ Product Catalog with Search & Filter  
✅ Shopping Cart Management  
✅ Secure Checkout  
✅ Razorpay Payment Integration  
✅ Order Tracking  
✅ User Profile Management  
✅ Admin Dashboard  
✅ Responsive Design (Mobile & Desktop)  
✅ Real-time Notifications  

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password**: bcryptjs
- **Payment**: Razorpay API

### Frontend
- **Framework**: React.js
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Git

### Backend Setup
```bash
# Clone repository
git clone https://github.com/kartiksen6660-dev/Kartikshop.com.git
cd Kartikshop.com

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# RAZORPAY_KEY_ID=your_razorpay_key
# RAZORPAY_KEY_SECRET=your_razorpay_secret

# Start server
npm run dev
```

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

## Project Structure
```
Kartikshop.com/
├── models/              # Database schemas
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/              # API routes
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── orders.js
│   ├── users.js
│   └── admin.js
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── server.js            # Main server file
├── package.json
└── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId/add` - Add to cart
- `POST /api/cart/:userId/remove` - Remove from cart
- `POST /api/cart/:userId/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `POST /api/orders/verify-payment` - Verify payment

### Admin
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

## Usage

### User Registration
1. Click "Sign Up" on navbar
2. Fill in name, email, and password
3. Account created successfully

### Shopping
1. Browse products on home page
2. Search or filter by category
3. Click on product for details
4. Add to cart
5. Proceed to checkout

### Checkout
1. Review cart items
2. Enter shipping address
3. Select payment method
4. Complete payment via Razorpay
5. Order confirmation

### Admin Dashboard
1. Login with admin account
2. Navigate to Admin panel
3. View stats, manage products and orders

## Environment Variables
```
MONGODB_URI=mongodb://localhost:27017/kartikshop
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
PORT=5000
```

## Future Enhancements
- ✨ Email notifications
- ✨ Product reviews and ratings
- ✨ Wishlist feature
- ✨ Multiple payment options
- ✨ Order tracking with maps
- ✨ Analytics dashboard
- ✨ Mobile app

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

## Support
For support, email support@kartikshop.com or open an issue on GitHub.

## Author
**Kartik Sen**  
GitHub: [@kartiksen6660-dev](https://github.com/kartiksen6660-dev)
