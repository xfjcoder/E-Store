// server/controllers/order.controller.js
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Check if products are in stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock. Only ${product.stock} available.`,
        });
      }
    }

    // Create order items from cart
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create new order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      total: cart.total,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    // Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    // Clear cart after order
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order belongs to user or user is owner
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "owner"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders (owner only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort("-createdAt");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update order status (owner only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (
      !["pending", "processing", "shipped", "delivered", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
