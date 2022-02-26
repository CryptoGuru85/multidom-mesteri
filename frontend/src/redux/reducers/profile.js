import {
  GET_PROFILE,
  GET_PROFILE_LIST,
  GET_USER_PROFILE,
  SET_PROFILE,
} from "../actions/types";

const initialState = {
  profile_list: [],
  profile: {},
  user_profile: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_LIST:
      return {
        ...state,
        profile_list: action.payload,
        loading: true,
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: true,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        user_profile: action.payload,
      };

    case SET_PROFILE:
      return {
        ...state,
        user_profile: action.payload,
      };

    default:
      return state;
  }
}
