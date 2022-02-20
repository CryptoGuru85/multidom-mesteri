import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization:
          !config.url.includes("register") && !config.url.includes("login")
            ? `Bearer ${localStorage.getItem("token")}`
            : null,
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
