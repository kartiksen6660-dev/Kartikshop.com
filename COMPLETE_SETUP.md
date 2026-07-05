# 🛍️ KartikShop - Complete Step-by-Step Setup Guide

---

## 📋 TABLE OF CONTENTS
1. [Installation Prerequisites](#installation-prerequisites)
2. [Step 1: Clone Repository](#step-1-clone-repository)
3. [Step 2: Backend Setup](#step-2-backend-setup)
4. [Step 3: MongoDB Setup](#step-3-mongodb-setup)
5. [Step 4: Frontend Setup](#step-4-frontend-setup)
6. [Step 5: Sample Data](#step-5-sample-data)
7. [Step 6: Running Website](#step-6-running-website)
8. [Website Usage](#website-usage)
9. [Troubleshooting](#troubleshooting)
10. [Admin Setup](#admin-setup)

---

## ✅ Installation Prerequisites

### What You Need:
1. **Node.js** (v14 or higher)
2. **MongoDB** (v4.0 or higher)
3. **Git** (for cloning)
4. **Text Editor** (VS Code recommended)
5. **Terminal/Command Prompt**

### Download Links:
- **Node.js**: https://nodejs.org/ (Download LTS version)
- **MongoDB**: https://www.mongodb.com/try/download/community
- **Git**: https://git-scm.com/
- **VS Code**: https://code.visualstudio.com/

### Verify Installation:
```bash
node --version
npm --version
git --version
mongod --version
```

---

## 🚀 Step 1: Clone Repository

### Command:
```bash
git clone https://github.com/kartiksen6660-dev/Kartikshop.com.git
cd Kartikshop.com
```

### Verify:
```bash
ls -la
# You should see: client, models, routes, server.js, package.json, etc.
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Install Dependencies
```bash
npm install
```

**Wait for installation to complete... (2-3 minutes)**

### 2.2 Create .env File

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

### 2.3 Edit .env File

**Open with VS Code:**
```bash
code .env
```

**Or open in any text editor and paste:**
```
MONGODB_URI=mongodb://localhost:27017/kartikshop
JWT_SECRET=kartikshop_secret_key_2024
NODE_ENV=development
PORT=5000
```

**Save the file** (Ctrl+S or Cmd+S)

---

## 🗄️ Step 3: MongoDB Setup

### 3.1 Start MongoDB Server

**IMPORTANT: Open a NEW terminal window for MongoDB**

**Windows (PowerShell as Admin):**
```bash
mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo systemctl start mongod
```

**Expected Output:**
```
[initandlisten] Listening on port 27017
[initandlisten] waiting for connections
```

**Keep this terminal open! Don't close it.**

---

## 💻 Step 4: Frontend Setup

### 4.1 Open NEW Terminal (3rd terminal)

```bash
cd Kartikshop.com/client
```

### 4.2 Install Dependencies
```bash
npm install
```

**Wait for 2-3 minutes...**

### 4.3 Create Tailwind Config (if not exists)
Already done! ✅

---

## 📦 Step 5: Sample Data

### 5.1 Open NEW Terminal (4th terminal)

```bash
cd Kartikshop.com
node seeds/seedProducts.js
```

**Expected Output:**
```
Connected to MongoDB
Sample products added successfully
```

**8 products will be added to database!** ✅

---

## ▶️ Step 6: Running Website

### TERMINAL 1 - Backend Server
```bash
cd Kartikshop.com
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected
```

### TERMINAL 2 - MongoDB
```bash
mongod
```

**Should show:**
```
waiting for connections on port 27017
```

### TERMINAL 3 - Frontend
```bash
cd Kartikshop.com/client
npm start
```

**Browser will auto-open:**
```
http://localhost:3000 ✅
```

---

## 📖 Website Usage

### 1️⃣ Sign Up
```
Home Page → "Sign Up" Button
├─ Enter Full Name
├─ Enter Email
├─ Enter Password
└─ Click Sign Up → Account Created! ✅
```

### 2️⃣ Browse Products
```
Home Page
├─ See 8 Sample Products
├─ Click Category (Electronics, Fashion, etc.)
├─ Use Search Bar
└─ Click Product → See Details
```

### 3️⃣ Add to Cart
```
Product Page
├─ View Product Details
├─ Select Quantity
├─ Click "Add to Cart" Button
└─ Toast: "Added to cart" ✅
```

### 4️⃣ Shopping Cart
```
Top Right → "🛒 Cart" Icon
├─ View All Cart Items
├─ Change Quantity
├─ Remove Items
└─ Click "Proceed to Checkout"
```

### 5️⃣ Checkout
```
Checkout Page
├─ Fill Shipping Address:
│  ├─ Full Name
│  ├─ Email
│  ├─ Phone
│  ├─ Street Address
│  ├─ City
│  ├─ State
│  ├─ ZIP Code
│  └─ Country
├─ See Order Summary
└─ Click "Place Order" → Order Created! ✅
```

### 6️⃣ View Orders
```
Top Menu → "Orders"
├─ See All Your Orders
├─ View Order Status (Pending/Confirmed/Shipped/Delivered)
├─ See Items Details
└─ See Shipping Address
```

### 7️⃣ Update Profile
```
Top Menu → "👤 Profile"
├─ Change Name
├─ Change Phone
├─ Update Address:
│  ├─ Street
│  ├─ City
│  ├─ State
│  ├─ ZIP Code
│  └─ Country
└─ Click "Save Changes" → Profile Updated! ✅
```

### 8️⃣ Admin Dashboard (Only Admin Users)
```
Top Menu → "Admin" Button
├─ View Dashboard Stats:
│  ├─ Total Products
│  ├─ Total Orders
│  ├─ Total Users
│  └─ Total Revenue
├─ Manage Orders:
│  ├─ View All Orders
│  ├─ Change Order Status
│  └─ See Customer Details
└─ Update Order Status (Pending→Confirmed→Shipped→Delivered)
```

---

## 🔍 Troubleshooting

### ❌ Error: MongoDB Connection Failed

**Solution:**
```bash
# Terminal 2 - Run MongoDB
mongod
```

**Or restart MongoDB:**
```bash
# Mac:
brew services restart mongodb-community

# Linux:
sudo systemctl restart mongod

# Windows: Restart MongoDB service from Services
```

---

### ❌ Error: Port 3000 already in use

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows (PowerShell as Admin):**
```bash
netstat -ano | findstr :3000
# Find PID in last column
taskkill /PID <PID> /F
```

**Then run:**
```bash
npm start
```

---

### ❌ Error: Port 5000 already in use

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Then run:**
```bash
npm run dev
```

---

### ❌ Error: npm command not found

**Solution:**
1. Uninstall Node.js completely
2. Download fresh from https://nodejs.org/
3. Install again
4. Restart terminal/computer

**Verify:**
```bash
node --version
npm --version
```

---

### ❌ Error: Cannot find module 'express'

**Solution:**
```bash
# In Kartikshop.com folder:
rm -rf node_modules package-lock.json
npm install

# In client folder:
cd client
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Error: .env file not found

**Solution:**
```bash
# In Kartikshop.com folder:
cp .env.example .env
```

**Then edit:**
```bash
code .env
```

---

### ❌ Error: Cannot GET / (Blank Page)

**Check:**
1. Is Backend running? (Terminal 1 - `npm run dev`)
2. Is MongoDB running? (Terminal 2 - `mongod`)
3. Is Frontend running? (Terminal 3 - `npm start`)

**Restart all:**
```bash
# Terminal 1:
npm run dev

# Terminal 2:
mongod

# Terminal 3:
npm start
```

---

### ❌ Error: Cannot read property '_id' of undefined

**Solution:**
```bash
# Add sample products:
node seeds/seedProducts.js
```

---

## 👨‍💼 Admin Setup

### How to Make User an Admin?

**Method 1: Using MongoDB GUI**

1. Download MongoDB Compass: https://www.mongodb.com/products/tools/compass
2. Connect: `mongodb://localhost:27017`
3. Database: `kartikshop`
4. Collection: `users`
5. Find your user
6. Edit: Change `role: "user"` to `role: "admin"`
7. Save
8. Logout and login again

**Method 2: Using Terminal**

```bash
mongosh
use kartikshop
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
exit
```

**Then login and admin button will appear!** ✅

---

## 📊 Database Structure

### Collections Created:
```
kartikshop/
├── users
│   ├── name
│   ├── email
│   ├── password
│   ├── role (user/admin)
│   └── address
├── products
│   ├── name
│   ├── price
│   ├── category
│   ├── stock
│   └── rating
├── carts
│   ├── userId
│   ├── items[]
│   └── totalPrice
└── orders
    ├── userId
    ├── products[]
    ├── totalAmount
    ├── shippingAddress
    └── orderStatus
```

---

## 🎯 Quick Reference

### All Commands:
```bash
# Backend Install
cd Kartikshop.com
npm install

# Backend Run
npm run dev

# Frontend Install
cd client
npm install

# Frontend Run
npm start

# Add Sample Products
node seeds/seedProducts.js

# MongoDB Start
mongod

# View Code
code .
```

### All URLs:
```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
MongoDB:   mongodb://localhost:27017
```

### All Folders:
```
Kartikshop.com/
├── client/        (React Frontend)
├── models/        (MongoDB Schemas)
├── routes/        (API Routes)
├── middleware/    (Auth Middleware)
├── seeds/         (Sample Data)
└── server.js      (Main Server)
```

---

## ✅ Complete Checklist

- [ ] Node.js installed? `node --version`
- [ ] MongoDB installed? `mongod --version`
- [ ] Git installed? `git --version`
- [ ] Repository cloned? `git clone ...`
- [ ] Backend dependencies? `npm install`
- [ ] .env file created? `cp .env.example .env`
- [ ] .env file edited? (MongoDB URI, JWT Secret)
- [ ] MongoDB running? Terminal 2: `mongod`
- [ ] Backend running? Terminal 1: `npm run dev`
- [ ] Frontend dependencies? `cd client && npm install`
- [ ] Frontend running? Terminal 3: `npm start`
- [ ] Browser opened? http://localhost:3000
- [ ] Sample products added? `node seeds/seedProducts.js`
- [ ] Signup working?
- [ ] Products loading?
- [ ] Cart working?
- [ ] Checkout working?
- [ ] Admin accessible? (if admin role)

---

## 🎉 You're All Set!

### Next Steps:
1. Explore the website
2. Test all features
3. Create orders
4. Check admin panel
5. Read code and learn!

### If Any Error:
1. Check troubleshooting section
2. Verify all 3 terminals running
3. Check .env file
4. Restart all terminals

---

## 📱 Share Your Feedback

GitHub: https://github.com/kartiksen6660-dev/Kartikshop.com
Email: kartiksen6660@gmail.com

**Happy Shopping! 🛍️**

---

## 🎓 Learn More

### Frontend (React):
- `client/src/pages/` - All pages
- `client/src/components/` - Reusable components
- `client/src/App.jsx` - Main app structure

### Backend (Node.js):
- `routes/` - API endpoints
- `models/` - Database schemas
- `middleware/` - Authentication logic
- `server.js` - Express server setup

### Database (MongoDB):
- `seeds/seedProducts.js` - Sample data
- Each model has schema definition

---

**Version: 1.0.0**  
**Last Updated: 2024**  
**Author: Kartik Sen**  
**License: MIT**

---

## 🚀 Extra Features Coming Soon!

- 💳 Payment Integration (Razorpay)
- 📧 Email Notifications
- ⭐ Product Reviews & Ratings
- ❤️ Wishlist Feature
- 📱 Mobile App
- 🎁 Coupon Codes
- 🔍 Advanced Search Filters

---

**Made with ❤️ by Kartik**
