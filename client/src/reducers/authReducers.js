// client/src/reducers/authReducers.js
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/authConstants";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_DETAILS_REQUEST:
      return { ...state, loadingDetails: true };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loadingDetails: false,
        userDetails: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loadingDetails: false,
        errorDetails: action.payload,
      };
    case USER_DETAILS_RESET:
      return { ...state, userDetails: null };
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loadingUpdate: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        userInfo: action.payload,
        successUpdate: true,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { ...state, successUpdate: false, errorUpdate: null };
    default:
      return state;
  }
};
