import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
  user: {},
  isRegistered: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        isRegistered: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isRegistered: false,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.tokens.access);
      return {
        ...state,
        ...action.payload,
        token: action.payload.tokens.access,
        isAuthenticated: true,
        isLoading: false,
        isRegistered: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isRegistered: true,
      };

    case AUTH_ERROR:
      return state;
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isRegistered: true,
      };

    default:
      return state;
  }
}
