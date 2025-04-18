// server/controllers/product.controller.js
const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // const { category, featured, search } = req.query;
    const { category, featured, searchTerm } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (featured) {
      query.featured = featured === "true";
    }

    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new product (owner only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock, featured } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      featured: featured || false,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update product (owner only)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock, featured } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;
    product.stock = stock !== undefined ? stock : product.stock;
    product.featured = featured !== undefined ? featured : product.featured;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete product (owner only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
