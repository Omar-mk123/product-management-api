const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require("../controllers/productController");

const validate = require("../middleware/validate");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/productValidator");

const router = express.Router();

// Public
router.get("/", getAllProducts);

router.get("/stats", getProductStats);

router.get("/:id", getProductById);

// Admin only
router.post(
  "/",
  protect,
  admin,
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;
