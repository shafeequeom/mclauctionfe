import axios from "axios";
import router from "../router";

const $axios = axios.create({
  baseURL:
    process.env.VUE_APP_API_BASE_URL !== undefined
      ? process.env.VUE_APP_API_BASE_URL
      : "http://157.175.48.49/api/v1/",
});

$axios.CancelToken = axios.CancelToken;
$axios.isCancel = axios.isCancel;

$axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      if (
        router.currentRoute.name != "Root" &&
        router.currentRoute.name != "Login"
      ) {
        router.push({ name: "Login" });
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default $axios;
