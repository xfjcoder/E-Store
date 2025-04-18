// client/src/pages/Home.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import ProductCard from "../components/products/ProductCard";
import SearchBox from "../components/ui/SearchBox";
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";
import Pagination from "../components/ui/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";
  const pageNumber = query.get("page") || 1;

  const [category, setCategory] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(
      listProducts(`keyword=${keyword}&page=${pageNumber}&category=${category}`)
    );
  }, [dispatch, keyword, pageNumber, category]);

  const categories = [
    { name: "All Categories", value: "" },
    { name: "Electronics", value: "electronics" },
    { name: "Clothing", value: "clothing" },
    { name: "Books", value: "books" },
    { name: "Home & Kitchen", value: "home" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Latest Products</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <SearchBox />
          <div>
            <label htmlFor="category" className="mr-2">
              Filter by:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.length === 0 ? (
            <Message>No products found</Message>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination pages={pages} page={page} keyword={keyword} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

// client/src/pages/Home.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";
// import ProductCard from "../components/products/ProductCard";
// import Loader from "../components/ui/Loader";
// import Message from "../components/ui/Message";

// const Home = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");

//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products } = productList;

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   const searchHandler = (e) => {
//     e.preventDefault();
//     let query = "";

//     if (searchTerm) {
//       query += `search=${searchTerm}`;
//     }

//     if (category) {
//       query += `${query ? "&" : ""}category=${category}`;
//     }

//     dispatch(listProducts(query));
//   };

//   const categories = [
//     "All Categories",
//     "Electronics",
//     "Clothing",
//     "Footwear",
//     "Home & Kitchen",
//     "Books",
//   ];

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">Latest Products</h1>

//       <div className="mb-6">
//         <form onSubmit={searchHandler} className="flex flex-wrap gap-2">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="border rounded px-3 py-2 flex-grow"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             value={searchTerm}
//           />

//           <select
//             className="border rounded px-3 py-2"
//             onChange={(e) =>
//               setCategory(
//                 e.target.value === "All Categories" ? "" : e.target.value
//               )
//             }
//             value={category || "All Categories"}
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Search
//           </button>
//         </form>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.length === 0 ? (
//             <Message>No products found</Message>
//           ) : (
//             products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
