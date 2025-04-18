// server/seeds/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const bcrypt = require("bcryptjs"); // Import bcrypt

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error(err));

// Sample users
const users = [
  {
    name: "Store Owner",
    email: "owner@example.com",
    // password: "owner123",
    password: bcrypt.hashSync("owner123", 10), // Hash the password

    role: "owner",
    address: {
      street: "123 Main St",
      city: "Business City",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    phone: "555-123-4567",
  },
  {
    name: "John Customer",
    email: "customer@example.com",
    // password: "customer123",
    password: bcrypt.hashSync("customer123", 10), // Hash the password

    role: "customer",
    address: {
      street: "456 Market St",
      city: "Shopping City",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    phone: "555-987-6543",
  },
];

// Sample products
const products = [
  {
    name: "Smartphone X",
    description: "Latest smartphone with advanced features",
    price: 799.99,
    category: "Electronics",
    // imageUrl: "https://via.placeholder.com/300x300",
    imageUrl: "http://localhost:5000/uploads/Xiaomi Phone.jpg",
    stock: 50,
    featured: true,
  },
  {
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    category: "Electronics",
    // imageUrl: "https://via.placeholder.com/300x300",
    imageUrl: "http://localhost:5000/uploads/Laptop.jpg",
    stock: 30,
    featured: true,
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 199.99,
    category: "Electronics",
    // imageUrl: "https://via.placeholder.com/300x300",
    imageUrl: "http://localhost:5000/uploads/HeadPhone.webp",
    stock: 100,
    featured: false,
  },
  {
    // server/seeds/seed.js (continued)
    name: "Designer T-shirt",
    description: "Premium cotton designer t-shirt",
    price: 49.99,
    category: "Clothing",
    // imageUrl: "https://via.placeholder.com/300x300",
    imageUrl: "http://localhost:5000/uploads/T-Shirt.webp",
    stock: 200,
    featured: false,
  },
  {
    name: "Athletic Shoes",
    description: "High-performance athletic shoes",
    price: 129.99,
    category: "Footwear",
    // imageUrl: "https://via.placeholder.com/300x300",
    imageUrl: "http://localhost:5000/uploads/HokaShoe.webp",
    stock: 75,
    featured: true,
  },
  {
    name: "Smart Watch",
    description: "Fitness and health tracking smart watch",
    price: 249.99,
    category: "Electronics",
    // imageUrl: "https://via.placeholder.com/300x300",
    imageUrl: "http://localhost:5000/uploads/SmartWatch.jpg",
    stock: 45,
    featured: true,
  },

  //   {
  //     name: "Wireless Headphones",
  //     description:
  //       "High-quality wireless noise-cancelling headphones with long battery life",
  //     price: 199.99,
  //     category: "Electronics",
  //     stockQuantity: 50,
  //     imageUrl: "https://example.com/headphones.jpg",
  //     featured: true,
  //   },
  //   {
  //     name: "Smart Watch",
  //     description: "Advanced fitness tracking smartwatch with heart rate monitor",
  //     price: 249.99,
  //     category: "Electronics",
  //     stockQuantity: 30,
  //     // imageUrl: "https://example.com/smartwatch.jpg",
  //     imageUrl: "http://localhost:5000/uploads/SmartWatch.jpg",
  //     featured: true,
  //   },
  //   {
  //     name: "Leather Jacket",
  //     description: "Classic black leather jacket, perfect for any occasion",
  //     price: 299.99,
  //     category: "Clothing",
  //     stockQuantity: 20,
  //     imageUrl: "https://example.com/jacket.jpg",
  //     featured: true,
  //   },
  //   {
  //     name: "Bestseller Novel",
  //     description: "Latest bestselling fiction novel by a renowned author",
  //     price: 19.99,
  //     category: "Books",
  //     stockQuantity: 100,
  //     imageUrl: "https://example.com/book.jpg",
  //     featured: true,
  //   },
  //   {
  //     name: "Coffee Maker",
  //     description: "Programmable coffee maker with built-in grinder",
  //     price: 129.99,
  //     category: "Home",
  //     stockQuantity: 40,
  //     imageUrl: "https://example.com/coffeemaker.jpg",
  //     featured: true,
  //   },
];

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});

    console.log("Cleared existing data");

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);

    // Create empty carts for users
    for (const user of createdUsers) {
      await Cart.create({ user: user._id, items: [], total: 0 });
    }
    console.log(`Created empty carts for ${createdUsers.length} users`);

    console.log("Seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
