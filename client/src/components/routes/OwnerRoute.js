// client/src/components/routes/OwnerRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OwnerRoute = ({ children }) => {
  // const { userInfo } = useSelector((state) => state.auth);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {}; // Safe destructuring with fallback

  return userInfo && userInfo.user.role === "owner" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default OwnerRoute;
