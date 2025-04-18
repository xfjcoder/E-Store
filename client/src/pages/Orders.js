// src/pages/Orders.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders`,
          config
        );
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">You haven't placed any orders yet.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Paid</th>
                <th className="py-2 px-4 text-left">Delivered</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="py-2 px-4">
                    {order.isPaid ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {order.isDelivered ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
