// client/src/components/products/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.imageUrl}
        // src={"/images/Xiaomi Phone.jpg"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        </Link>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              product.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
          <Link
            to={`/product/${product._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
