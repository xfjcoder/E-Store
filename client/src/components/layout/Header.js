// client/src/components/layout/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../actions/authActions";

// import "../../dropdown.css";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false); // Define state for dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  // const { userInfo } = useSelector((state) => state.auth);
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin ? userLogin.userInfo : null;
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ShopEasy
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="flex items-center">
            <FaShoppingCart className="mr-1" />
            {cartItems.length > 0 && (
              <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* {userInfo ? (
            <div className="relative group">
              <button className="flex items-center">
                <FaUserAlt className="mr-1" />
                <span>{userInfo.user.name.split(" ")[0]}</span>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Orders
                  </Link>

                  {userInfo.user.role === "owner" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline mr-1" /> Logout
                  </button>
                </div>
              </div>
            </div> */}
          {userInfo ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center">
                <FaUserAlt className="mr-1" />
                <span>{userInfo.user.name.split(" ")[0]}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    {userInfo.user.role === "owner" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-1" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center">
              <FaUserAlt className="mr-1" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
