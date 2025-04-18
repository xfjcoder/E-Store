// client/src/pages/ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { listProductDetails } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";
import Rating from "../components/products/Rating";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 mb-4"
      >
        <FaArrowLeft className="mr-1" /> Go Back
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <Rating value={4.5} text={`4.5 from 10 reviews`} />

            <div className="my-4 border-t border-b py-2">
              <div className="text-xl font-bold mb-2">
                ${product.price?.toFixed(2)}
              </div>

              <div className="mb-2">
                Status:{" "}
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="mb-4">
                <label className="block mb-2">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded p-2 w-full md:w-auto"
                >
                  {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto disabled:bg-gray-400"
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Category</h2>
              <p className="text-gray-700">{product.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
