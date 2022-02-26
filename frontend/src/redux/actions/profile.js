import api from "../../api";
import {
  GET_PROFILE,
  GET_PROFILE_LIST,
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  SET_PROFILE,
} from "./types";

export const getProfileList = (params) => (dispatch, getState) => {
  api
    .get(`accounts/profiles/`, { params })
    .then(({ data }) => {
      dispatch({
        type: GET_PROFILE_LIST,
        payload: data,
      });
    })
    .catch((err) => {});
};

export const getProfile = (id) => (dispatch, getState) => {
  api
    .get(`accounts/profile/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const getUserProfile = (id) => (dispatch, getState) => {
  api
    .get(`accounts/profile/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_USER_PROFILE_ERROR,
        payload: response,
      });
    });
};

export const setProfile = (profile) => (dispatch) => {
  dispatch({
    type: SET_PROFILE,
    payload: profile,
  });
};
