import { GET_PROFILE, GET_PROFILE_LIST, SET_PROFILE } from "../actions/types";

const initialState = {
  profile_list: [],
  profile: {},
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

    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}
