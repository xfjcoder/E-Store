// client/src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import OrdersList from "./pages/admin/OrdersList";
import PrivateRoute from "./components/routes/PrivateRoute";
import OwnerRoute from "./components/routes/OwnerRoute";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main className="min-h-screen py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              // <PrivateRoute>
              <Checkout />
              // </PrivateRoute>
            }
          />
          <Route
            path="/success"
            element={
              // <PrivateRoute>
              <OrderSuccess />
              // </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              // <PrivateRoute>
              <Profile />
              // </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              // <PrivateRoute>
              <Orders />
              // </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              // <PrivateRoute>
              <OrderDetails />
              // </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              // <OwnerRoute>
              <Dashboard />
              // </OwnerRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              // <OwnerRoute>
              <ProductsList />
              // </OwnerRoute>
            }
          />
          <Route
            path="/admin/product/new"
            element={
              // <OwnerRoute>
              <AddProduct />
              // </OwnerRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              // <OwnerRoute>
              <EditProduct />
              // </OwnerRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              // <OwnerRoute>
              <OrdersList />
              // </OwnerRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
