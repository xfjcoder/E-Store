// client/src/reducers/productReducers.js

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// import {
//   PRODUCT_LIST_REQUEST,
//   PRODUCT_LIST_SUCCESS,
//   PRODUCT_LIST_FAIL,
//   PRODUCT_DETAILS_REQUEST,
//   PRODUCT_DETAILS_SUCCESS,
//   PRODUCT_DETAILS_FAIL,
//   PRODUCT_CREATE_REQUEST,
//   PRODUCT_CREATE_SUCCESS,
//   PRODUCT_CREATE_FAIL,
//   PRODUCT_CREATE_RESET,
//   PRODUCT_UPDATE_REQUEST,
//   PRODUCT_UPDATE_SUCCESS,
//   PRODUCT_UPDATE_FAIL,
//   PRODUCT_UPDATE_RESET,
//   PRODUCT_DELETE_REQUEST,
//   PRODUCT_DELETE_SUCCESS,
//   PRODUCT_DELETE_FAIL,
// } from "../constants/productConstants";

// export const productReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true, products: [] };
//     case PRODUCT_LIST_SUCCESS:
//       return { loading: false, products: action.payload };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_CREATE_REQUEST:
//       return { ...state, loadingCreate: true };
//     case PRODUCT_CREATE_SUCCESS:
//       return {
//         ...state,
//         loadingCreate: false,
//         successCreate: true,
//         products: [...state.products, action.payload],
//       };
//     case PRODUCT_CREATE_FAIL:
//       return { ...state, loadingCreate: false, errorCreate: action.payload };
//     case PRODUCT_CREATE_RESET:
//       return { ...state, successCreate: false, errorCreate: null };
//     case PRODUCT_DELETE_REQUEST:
//       return { ...state, loadingDelete: true };
//     case PRODUCT_DELETE_SUCCESS:
//       return {
//         ...state,
//         loadingDelete: false,
//         successDelete: true,
//         products: state.products.filter(
//           (product) => product._id !== action.payload
//         ),
//       };
//     case PRODUCT_DELETE_FAIL:
//       return { ...state, loadingDelete: false, errorDelete: action.payload };
//     default:
//       return state;
//   }
// };

// export const productDetailsReducer = (
//   state = { product: { reviews: [] } },
//   action
// ) => {
//   switch (action.type) {
//     case PRODUCT_DETAILS_REQUEST:
//       return { loading: true, ...state };
//     case PRODUCT_DETAILS_SUCCESS:
//       return { loading: false, product: action.payload };
//     case PRODUCT_DETAILS_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_UPDATE_REQUEST:
//       return { ...state, loadingUpdate: true };
//     case PRODUCT_UPDATE_SUCCESS:
//       return {
//         ...state,
//         loadingUpdate: false,
//         successUpdate: true,
//         product: action.payload,
//       };
//     case PRODUCT_UPDATE_FAIL:
//       return { ...state, loadingUpdate: false, errorUpdate: action.payload };
//     case PRODUCT_UPDATE_RESET:
//       return { ...state, successUpdate: false, errorUpdate: null };
//     default:
//       return state;
//   }
// };
