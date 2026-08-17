# 🛒 ShopEase - E-Commerce Platform

ShopEase is a modern full-stack e-commerce web application built with **React.js**, **Tailwind CSS**, and **JSON Server**. It provides a complete shopping experience for customers along with a role-based admin dashboard to manage products, users, and orders.

The application includes product browsing, cart management, wishlist functionality, checkout flow, order tracking, and an admin management system.

---

# 🚀 Features

## 👤 Customer Features

### Authentication
- User registration and login
- Role-based access control
- Secure user session management

### Shopping Experience
- Browse products
- Search products
- Filter products by category
- View detailed product information
- Responsive product cards

### Cart Management
- Add products to cart
- Update product quantity
- Remove products from cart
- Dynamic order summary

### Wishlist
- Add products to wishlist
- Remove wishlist items
- User-specific wishlist management

### Checkout & Orders
- Checkout process
- Order creation
- Order history
- Detailed order view
- Real-time order status timeline

Order tracking flow:

```
Confirmed
    ↓
Processing
    ↓
Shipped
    ↓
Delivered
```

---

# 🛠️ Admin Features

## Admin Dashboard

- Role-based admin access
- Dashboard analytics
- Product statistics
- User statistics
- Order statistics
- Revenue tracking
- Sales overview chart

## Product Management

Admin can:

- Add new products
- Edit products
- Delete products
- Manage inventory

## User Management

Admin can:

- View users
- Manage customer information

## Order Management

Admin can:

- View all orders
- View customer details
- Update order status

---

# 💻 Tech Stack

## Frontend

- React.js
- JavaScript (ES6+)
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons
- Recharts

## Backend / API

- JSON Server
- REST API architecture

## Development Tools

- Vite
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
ShopEase
│
├── public
│
├── src
│   │
│   ├── api
│   │
│   ├── components
│   │
│   ├── pages
│   │
│   ├── services
│   │
│   ├── utils
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/ShopEase.git
```

Navigate into project:

```bash
cd ShopEase
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Running the Application

## Start React Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Start JSON Server

Open another terminal:

```bash
npm run server
```

API runs on:

```
http://localhost:3000
```

---

# 🔑 Demo Accounts

## Admin Account

```
Email:
admin@example.com

Password:
********
```

## Customer Account

```
Email:
customer@example.com

Password:
********
```

---

# 📸 Screenshots

Add your screenshots here:

```
screenshots/
│
├── home.png
├── shop.png
├── product-details.png
├── cart.png
├── checkout.png
└── admin-dashboard.png
```

Example:

```markdown
![Admin Dashboard](screenshots/admin-dashboard.png)
```

---

# 🌟 Key Highlights

- Fully responsive design
- Modern ecommerce UI
- Reusable React components
- Role-based authorization
- Dynamic product management
- Complete shopping workflow
- Admin analytics dashboard

---

# 🔮 Future Improvements

- Django REST Framework backend
- PostgreSQL/MySQL database
- JWT authentication
- Online payment integration
- Product reviews and ratings
- Cloud deployment
- Email notifications

---

# 👨‍💻 Author

**Inturi Manikanta Naidu**

B.Tech - Computer Science Engineering (AI)

---

# 📄 License

This project is developed for learning and portfolio purposes.