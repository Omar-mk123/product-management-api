const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


// =========================
// Security Middleware
// =========================

// Security HTTP headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body size limit
app.use(
  express.json({
    limit: "10kb",
  })
);

// Logging
app.use(morgan("dev"));


// =========================
// Rate Limiting
// =========================

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});


// Authentication limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
});


// Apply general limiter BEFORE routes
app.use("/api", apiLimiter);


// =========================
// Health Check
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Management API is running",
  });
});


// =========================
// Routes
// =========================

// Authentication routes
app.use(
  "/api/auth",
  authLimiter,
  authRoutes
);

// Product routes
app.use(
  "/api/products",
  productRoutes
);


// =========================
// 404 Handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// =========================
// Global Error Handler
// =========================

app.use(errorMiddleware);


module.exports = app;
