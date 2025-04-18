import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../../actions/productActions";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get products from Redux store safely
  const productList = useSelector((state) => state.productList);
  const products = productList ? productList.products : [];
  const loading = productList ? productList.loading : false;
  const error = productList ? productList.error : null;

  // Get user info from Redux store safely
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin ? userLogin.userInfo : null;

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!userInfo || userInfo.role !== "owner") {
      navigate("/login");
      return;
    }

    dispatch(listProducts());
  }, [dispatch, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    navigate("/admin/product/create");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Products</h1>
        <button onClick={createProductHandler}>Create Product</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteHandler(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsList;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Button, Row, Col } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import Paginate from "../../components/Paginate";
// import { listProducts, deleteProduct } from "../../actions/productActions";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

// const ProdsuctList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Get products from Redux store safely
//   const productList = useSelector((state) => state.productList);
//   const products = productList ? productList.products : [];
//   const loading = productList ? productList.loading : false;
//   const error = productList ? productList.error : null;
//   const pages = productList && productList.pages ? productList.pages : 0;

//   // Get delete product status from Redux store safely
//   const productDelete = useSelector((state) => state.productDelete);
//   const {
//     loading: loadingDelete,
//     error: errorDelete,
//     success: successDelete,
//   } = productDelete || {};

//   // Get user info from Redux store safely
//   const userLogin = useSelector((state) => state.userLogin);
//   const userInfo = userLogin ? userLogin.userInfo : null;

//   useEffect(() => {
//     // Redirect if not logged in or not an admin
//     if (!userInfo || userInfo.role !== "owner") {
//       navigate("/login");
//       return;
//     }

//     dispatch(listProducts("", currentPage, itemsPerPage));
//   }, [dispatch, navigate, userInfo, successDelete, currentPage, itemsPerPage]);

//   const deleteHandler = (id) => {
//     confirmAlert({
//       title: "Confirm Deletion",
//       message: "Are you sure you want to delete this product?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => dispatch(deleteProduct(id)),
//         },
//         {
//           label: "No",
//         },
//       ],
//     });
//   };

//   const createProductHandler = () => {
//     navigate("/admin/product/create");
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <Row className="align-items-center">
//         <Col>
//           <h1>Products</h1>
//         </Col>
//         <Col className="text-end">
//           <Button className="my-3" onClick={createProductHandler}>
//             <FaPlus /> Create Product
//           </Button>
//         </Col>
//       </Row>

//       {loadingDelete && <Loader />}
//       {errorDelete && <Message variant="danger">{errorDelete}</Message>}

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           <Table striped bordered hover responsive className="table-sm">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>NAME</th>
//                 <th>PRICE</th>
//                 <th>CATEGORY</th>
//                 <th>BRAND</th>
//                 <th>STOCK</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id}>
//                   <td>{product._id}</td>
//                   <td>{product.name}</td>
//                   <td>${product.price}</td>
//                   <td>{product.category}</td>
//                   <td>{product.brand}</td>
//                   <td>{product.countInStock}</td>
//                   <td>
//                     <Link to={`/admin/product/${product._id}/edit`}>
//                       <Button variant="light" className="btn-sm">
//                         <FaEdit />
//                       </Button>
//                     </Link>
//                     <Button
//                       variant="danger"
//                       className="btn-sm"
//                       onClick={() => deleteHandler(product._id)}
//                     >
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Paginate
//             pages={pages}
//             page={currentPage}
//             isAdmin={true}
//             onPageChange={handlePageChange}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default ProdsuctList;
