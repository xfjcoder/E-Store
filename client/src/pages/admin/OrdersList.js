import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAllOrders, updateOrderStatus } from "../../actions/orderActions";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList || { orders: [] };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">USER</th>
                <th className="py-2 px-4 text-left">DATE</th>
                <th className="py-2 px-4 text-left">TOTAL</th>
                <th className="py-2 px-4 text-left">PAID</th>
                <th className="py-2 px-4 text-left">DELIVERED</th>
                <th className="py-2 px-4 text-left">STATUS</th>
                <th className="py-2 px-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {order.user ? order.user.name : "Deleted User"}
                  </td>
                  <td className="py-2 px-4">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-2 px-4">${order.totalPrice}</td>
                  <td className="py-2 px-4">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <span className="text-red-500">Not Paid</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <span className="text-red-500">Not Delivered</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status || "Processing"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-sm"
                    >
                      Details
                    </button>
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

export default OrdersList;
