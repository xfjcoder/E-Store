// server/routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const {
  authenticate,
  authorizeOwner,
} = require("../middleware/auth.middleware");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", authenticate, authorizeOwner, productController.createProduct);
router.put(
  "/:id",
  authenticate,
  authorizeOwner,
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorizeOwner,
  productController.deleteProduct
);

module.exports = router;
