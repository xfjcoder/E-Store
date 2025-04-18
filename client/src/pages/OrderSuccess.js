// src/pages/OrderSuccess.js
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const { id } = useParams();

  useEffect(() => {
    // You could fetch the order details here if needed
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="mb-6">
        Thank you for your purchase. Your order number is:{" "}
        <span className="font-semibold">{id}</span>
      </p>
      <p className="mb-8">You will receive an email confirmation shortly.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={`/order/${id}`}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View Order Details
        </Link>
        <Link
          to="/"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
