// src/pages/Checkout.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  console.log("Rendering Checkout page");
  console.log("cartItems:", cartItems);
  console.log("userInfo:", userInfo);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [userInfo, cartItems, navigate]);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice: calculateTotal(),
        },
        config
      );

      // Clear cart
      dispatch({ type: "CART_CLEAR_ITEMS" });
      localStorage.removeItem("cartItems");

      navigate(`/order-success/${data._id}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-6">Payment Method</h2>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={paymentMethod === "PayPal"}
                  onChange={() => setPaymentMethod("PayPal")}
                  className="mr-2"
                />
                PayPal or Credit Card
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="border rounded p-4">
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item._id} className="py-2 flex justify-between">
                  <div>
                    {item.name} x {item.qty}
                  </div>
                  <div>${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between font-bold">
              <div>Total:</div>
              <div>${calculateTotal()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
