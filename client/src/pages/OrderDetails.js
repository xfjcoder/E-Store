// src/pages/OrderDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders/${id}`,
          config
        );

        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, userInfo]);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        <Link to="/orders" className="text-blue-600 hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) return <p className="text-center py-8">Order not found</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        to="/orders"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        Back to Orders
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        Order Details <span className="text-gray-500">#{order._id}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
            <div className="border rounded p-4">
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {order.isDelivered ? (
                  <span className="text-green-600">
                    Delivered on{" "}
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-red-600">Not Delivered</span>
                )}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
            <div className="border rounded p-4">
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {order.isPaid ? (
                  <span className="text-green-600">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-red-600">Not Paid</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          <div className="border rounded p-4">
            <div className="divide-y">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="py-2 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600">
                        {item.qty} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>${order.itemsPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>${order.shippingPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax:</p>
                <p>${order.taxPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <p>Total:</p>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
