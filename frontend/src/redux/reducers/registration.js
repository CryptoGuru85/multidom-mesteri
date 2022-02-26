import { GET_CITIES, GET_ROLES, GET_SERVICES } from "../actions/types";

const initialState = {
  cities: [],
  roles: [],
  services: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    default:
      return state;
  }
}
