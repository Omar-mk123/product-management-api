# 🛒 Product Management REST API

A production-style RESTful API for managing products, users, authentication, authorization, and inventory statistics.

Built with Node.js, Express.js, MongoDB, and Mongoose.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Admin Protection
- Product CRUD
- Product Search
- Category Filtering
- Price Filtering
- Pagination
- Sorting
- Product Statistics
- Request Validation
- Password Hashing
- Rate Limiting
- Helmet Security
- CORS
- Global Error Handling
- Environment Variables
- Postman API Testing

---

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Joi
- Helmet
- Express Rate Limit
- CORS
- Morgan
- Postman
- Nodemon

---

## 📁 Project Structure

```text
15-product-management-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── productService.js
│   │
│   ├── validators/
│   │   └── productValidator.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
