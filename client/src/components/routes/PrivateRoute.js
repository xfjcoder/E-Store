// client/src/components/routes/PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useSelector((state) => state.auth);

//   return userInfo ? children : <Navigate to="/login" />;
// };

const PrivateRoute = ({ ownerOnly = false }) => {
  // Safely access userInfo using the pattern we've been applying
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin ? userLogin.userInfo : null;

  // If not logged in, redirect to login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If ownerOnly route and user is not an owner, redirect to home
  if (ownerOnly && userInfo.role !== "owner") {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return <Outlet />;
};

export default PrivateRoute;
