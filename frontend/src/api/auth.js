import api from "api";

export const updateProfile = (id, values) =>
  api.patch(`accounts/profile/${id}/`, values);

export const getCities = () => api.get("accounts/cities/");

export const getRoles = () => api.get("accounts/roles/");

export const getServices = (params) =>
  api.get("accounts/services/", { params });

export const register = (params) => {
  return api.post("accounts/register/", params);
};
