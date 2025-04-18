// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        { name, email, password },
        config
      );

      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));

      setSuccess(true);
      setMessage("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Update failed"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="border rounded divide-y">
            {/* This would be populated from the Orders component logic */}
            <p className="p-4">Your recent orders will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
