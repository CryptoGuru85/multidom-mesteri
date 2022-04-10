import axios from "axios";

// const env_base_url = process.env.API_BASE_URL;

// const getBaseUrl = () => {
//   const _default = new URL(env_base_url);

//   if (env_base_url && env_base_url.indexOf(_default.host)) return env_base_url;

//   //   process.env.NODE_ENV !== "production" && typeof
//   if (typeof window !== "undefined") {
//     const url = new URL(_default.pathname, window.location.href);
//     const _port = _default.port;

//     if (!!_port) {
//       url.port = _port;
//       return url.href;
//     }
//     return url.href;
//   }
//   return _default.href;
// };

const baseURL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(!!token &&
          !config.url.includes("register") &&
          !config.url.includes("login") &&
          !config.url.includes("cities") &&
          !config.url.includes("profiles") && {
            Authorization: `Bearer ${token}`,
          }),
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
