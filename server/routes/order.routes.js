// server/routes/order.routes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const {
  authenticate,
  authorizeOwner,
} = require("../middleware/auth.middleware");

router.use(authenticate); // All order routes require authentication

router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);

// Owner only routes
router.get("/admin/orders", authorizeOwner, orderController.getAllOrders);
router.put(
  "/admin/orders/:id",
  authorizeOwner,
  orderController.updateOrderStatus
);

module.exports = router;
