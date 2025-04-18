// client/src/actions/cartActions.js
import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
  CART_FETCH_FAIL,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

// Add to cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${id}`
    );

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.imageUrl,
        price: data.price,
        stock: data.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Update cart item quantity
export const updateCartItem = (id, quantity) => (dispatch, getState) => {
  dispatch({
    type: CART_UPDATE_ITEM,
    payload: { id, quantity },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Fetch user cart from server
export const fetchCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_FETCH_REQUEST });

    const {
      auth: { userInfo },
    } = getState();

    if (!userInfo) {
      dispatch({
        type: CART_FETCH_FAIL,
        payload: "User not authenticated",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/cart`,
      config
    );

    dispatch({
      type: CART_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Clear cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  localStorage.removeItem("cartItems");
};
