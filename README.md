# E-Commerce Web Application

A full-stack e-commerce application with React frontend, Express.js backend, MongoDB database, and JWT authentication.

## Features

- **User Authentication**: JWT-based authentication with two user roles (customer and owner)
- **Product Management**: Store owners can add, edit, and delete products
- **Shopping Cart**: Customers can add products to cart and checkout
- **Order Management**: View order history and details
- **Responsive Design**: Mobile-friendly UI

## Project Structure

```
ecommerce-app/
├── client/               # Frontend React application
├── server/               # Backend Express application
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/yourusername/estore-app.git
cd estore-app
```

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Dependency Updates

- Updated `multer` to `1.4.4-lts.1` to address CVE-2022-24434.
- Updated `jsonwebtoken` to `9.0.2` to resolve multiple vulnerabilities.

### Dependency Updates

- Updated `nodemon` to the latest version to address vulnerabilities in `semver`.

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Dependency Updates

- Updated `axios` to the latest version to address security vulnerabilities.
- Updated `react-scripts` to the latest version to resolve vulnerabilities in `nth-check` and `postcss`.

## Default Users

After setting up the application, you can use these default users for testing:

### Store Owner

- Email: owner@example.com
- Password: owner123

### Customer

- Email: customer@example.com
- Password: customer123

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Add a new product (owner only)
- `PUT /api/products/:id` - Update a product (owner only)
- `DELETE /api/products/:id` - Delete a product (owner only)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders

- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details
- `GET /api/admin/orders` - Get all orders (owner only)
- `PUT /api/admin/orders/:id` - Update order status (owner only)

## Tech Stack

- **Frontend**: React, Redux, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Others**: Bcrypt (password hashing), Multer (file uploads)
