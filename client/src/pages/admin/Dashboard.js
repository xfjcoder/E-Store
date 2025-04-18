// src/pages/admin/Dashboard.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaBox, FaShoppingCart, FaDollarSign, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.userLogin);
  const defaultValue = {}; // Default value for userLogin
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin ? userLogin.userInfo : defaultValue;

  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    totalSales: 0,
    userCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo || userInfo.role !== "owner") {
      navigate("/login");
    } else {
      const fetchDashboardData = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/dashboard`,
            config
          );
          setStats(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [userInfo, navigate]);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center">
            <FaBox className="text-blue-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Products</p>
              <p className="text-2xl font-bold">{stats.productCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center">
            <FaShoppingCart className="text-green-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Orders</p>
              <p className="text-2xl font-bold">{stats.orderCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center">
            <FaDollarSign className="text-yellow-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">
                ${stats.totalSales.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center">
            <FaUsers className="text-purple-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Customers</p>
              <p className="text-2xl font-bold">{stats.userCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-white rounded shadow overflow-hidden">
            {/* This would be populated with actual order data */}
            <div className="p-4 text-center text-gray-500">
              Latest orders will appear here
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Popular Products</h2>
            <Link
              to="/admin/products"
              className="text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="bg-white rounded shadow overflow-hidden">
            {/* This would be populated with actual product data */}
            <div className="p-4 text-center text-gray-500">
              Best selling products will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
