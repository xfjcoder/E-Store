// client/src/reducers/cartReducers.js
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderUpdateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_STATUS_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_STATUS_SUCCESS:
      return { loading: false, success: true };
    case ORDER_UPDATE_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// For completeness, also including the cart reducer that was referenced in the error
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case "CART_CLEAR_ITEMS":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

// import {
//   CART_ADD_ITEM,
//   CART_REMOVE_ITEM,
//   CART_UPDATE_ITEM,
//   CART_CLEAR_ITEMS,
//   CART_FETCH_REQUEST,
//   CART_FETCH_SUCCESS,
//   CART_FETCH_FAIL,
//   CART_SAVE_SHIPPING_ADDRESS,
//   CART_SAVE_PAYMENT_METHOD,
// } from "../constants/cartConstants";

// export const cartReducer = (
//   state = { cartItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;
//       const existItem = state.cartItems.find((x) => x.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };
//     case CART_UPDATE_ITEM:
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item.product === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         ),
//       };
//     case CART_FETCH_REQUEST:
//       return { ...state, loading: true };
//     case CART_FETCH_SUCCESS:
//       return { ...state, loading: false, cartItems: action.payload };
//     case CART_FETCH_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     case CART_CLEAR_ITEMS:
//       return {
//         ...state,
//         cartItems: [],
//       };
//     case CART_SAVE_SHIPPING_ADDRESS:
//       return {
//         ...state,
//         shippingAddress: action.payload,
//       };
//     case CART_SAVE_PAYMENT_METHOD:
//       return {
//         ...state,
//         paymentMethod: action.payload,
//       };
//     default:
//       return state;
//   }
// };
