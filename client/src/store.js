// client/src/store.js

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

import {
  orderReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderUpdateStatusReducer,
  cartReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer, // This should now work correctly
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderUpdateStatus: orderUpdateStatusReducer,
});

// Get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Get shipping address from localStorage
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userInfo: null, loading: false, error: null },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import {
//   productListReducer,
//   productDetailsReducer,
//   productDeleteReducer,
//   productCreateReducer,
//   productUpdateReducer,
// } from "./reducers/productReducers";

// import {
//   userLoginReducer,
//   userRegisterReducer,
//   userDetailsReducer,
//   userUpdateProfileReducer,
// } from "./reducers/userReducers";

// import {
//   orderReducer,
//   orderDetailsReducer,
//   orderListMyReducer,
//   orderListReducer,
//   orderUpdateStatusReducer,
//   cartReducer, // Import cartReducer from orderReducers
// } from "./reducers/orderReducers";

// const reducer = combineReducers({
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
//   productDelete: productDeleteReducer,
//   productCreate: productCreateReducer,
//   productUpdate: productUpdateReducer,
//   cart: cartReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userUpdateProfile: userUpdateProfileReducer,
//   order: orderReducer,
//   orderDetails: orderDetailsReducer,
//   orderListMy: orderListMyReducer,
//   orderList: orderListReducer,
//   orderUpdateStatus: orderUpdateStatusReducer,
// });

// // Get cart items from localStorage
// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// // Get user info from localStorage
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// // Get shipping address from localStorage
// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : {};

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//     shippingAddress: shippingAddressFromStorage,
//   },
//   userLogin: { userInfo: userInfoFromStorage },
// };

// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import {
//   productListReducer,
//   productDetailsReducer,
//   productDeleteReducer,
//   productCreateReducer,
//   productUpdateReducer,
// } from "./reducers/productReducers";

// import { cartReducer } from "./reducers/orderReducers";

// import {
//   userLoginReducer,
//   userRegisterReducer,
//   userDetailsReducer,
//   userUpdateProfileReducer,
// } from "./reducers/userReducers";

// import {
//   orderReducer,
//   orderDetailsReducer,
//   orderListMyReducer,
//   orderListReducer,
//   orderUpdateStatusReducer,
// } from "./reducers/orderReducers";

// const reducer = combineReducers({
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
//   productDelete: productDeleteReducer,
//   productCreate: productCreateReducer,
//   productUpdate: productUpdateReducer,
//   cart: cartReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userUpdateProfile: userUpdateProfileReducer,
//   order: orderReducer,
//   orderDetails: orderDetailsReducer,
//   orderListMy: orderListMyReducer,
//   orderList: orderListReducer,
//   orderUpdateStatus: orderUpdateStatusReducer,
// });

// // Get cart items from localStorage
// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// // Get user info from localStorage
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// // Get shipping address from localStorage
// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : {};

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//     shippingAddress: shippingAddressFromStorage,
//   },
//   userLogin: { userInfo: userInfoFromStorage },
// };

// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { authReducer } from "./reducers/authReducers";
// import {
//   productReducer,
//   productDetailsReducer,
// } from "./reducers/productReducers";
// import { cartReducer } from "./reducers/cartReducers";
// import { orderReducer, orderDetailsReducer } from "./reducers/orderReducers";

// const reducer = combineReducers({
//   auth: authReducer,
//   productList: productReducer,
//   productDetails: productDetailsReducer,
//   cart: cartReducer,
//   order: orderReducer,
//   orderDetails: orderDetailsReducer,
// });

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//   },
//   auth: {
//     userInfo: userInfoFromStorage,
//   },
// };

// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
