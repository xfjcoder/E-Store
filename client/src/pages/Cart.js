// client/src/pages/Cart.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  // addToCart,
  removeFromCart,
  updateCartItem,
  fetchCart,
} from "../actions/cartActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userInfo } = useSelector((state) => state.auth);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {};

  const cart = useSelector((state) => state.cart);
  const { cartItems, loading, error } = cart;

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCart());
    }
  }, [dispatch, userInfo]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(userInfo ? "/checkout" : "/login?redirect=checkout");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : cartItems.length === 0 ? (
        <Message>
          Your cart is empty{" "}
          <Link to="/" className="text-blue-500">
            Go Back
          </Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.product}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="ml-4">
                            <Link
                              to={`/product/${item.product}`}
                              className="text-blue-500"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateCartItem(
                                item.product,
                                Number(e.target.value)
                              )
                            )
                          }
                          className="border rounded p-1"
                        >
                          {[...Array(Math.min(item.stock, 10)).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="border-t border-b py-2 my-2">
                <div className="flex justify-between mb-2">
                  <span>Items:</span>
                  <span>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
