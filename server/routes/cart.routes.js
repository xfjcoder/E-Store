// server/routes/cart.routes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.use(authenticate); // All cart routes require authentication

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/:itemId", cartController.updateCartItem);
router.delete("/:itemId", cartController.removeFromCart);

module.exports = router;
