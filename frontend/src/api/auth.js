import api from "api";

export const register = (values) => {
  return api.post("accounts/register/", values);
};

export const updateProfile = (id, values) => {
  return api.patch(`accounts/profile/${id}/`, values);
};

export const login = (values) => {
  return api.post("accounts/login/", values);
};
