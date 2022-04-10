import api from "./../../api";
import {
  GET_CITIES,
  GET_CITIES_ERROR,
  GET_ROLES,
  GET_ROLES_ERROR,
  GET_SERVICES,
  GET_SERVICES_ERROR,
} from "./types";

export const getCities = () => (dispatch) => {
  api
    .get("accounts/cities/")
    .then(({ data }) => {
      dispatch({
        type: GET_CITIES,
        payload: data,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_CITIES_ERROR,
        payload: response,
      });
    });
};

export const getRoles = () => (dispatch) => {
  api
    .get("accounts/roles/")
    .then(({ data }) => {
      dispatch({
        type: GET_ROLES,
        payload: data,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ROLES_ERROR,
        payload: response,
      });
    });
};

export const getServices = (params) => (dispatch) => {
  api
    .get("accounts/services/", { params })
    .then(({ data }) => {
      dispatch({
        type: GET_SERVICES,
        payload: data,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_SERVICES_ERROR,
        payload: response,
      });
    });
};
