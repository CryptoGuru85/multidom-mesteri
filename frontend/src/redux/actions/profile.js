import api from "../../api";
import { GET_PROFILE, GET_PROFILE_LIST } from "./types";

export const getProfileList = (inputState) => (dispatch, getState) => {
  api
    .get(
      `accounts/profiles/?search=${inputState.searchInput}+${inputState.locationInput}+${inputState.entityInput}`
    )
    .then(({ data }) => {
      dispatch({
        type: GET_PROFILE_LIST,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
    .catch((err) => {
      console.log(err);
    });
};
