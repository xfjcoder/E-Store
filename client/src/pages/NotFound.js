import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
