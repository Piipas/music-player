import { Axios } from "axios";
import { authApi } from "./api/auth-api";

const authRoutes = ["/auth/login", "/auth/register", "/auth/refresh"];
const axios = new Axios({
  // withCredentials: true,
  baseURL: "http://localhost:4001/",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    config.data = JSON.stringify(config.data);
    if (access_token) config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry && !authRoutes.includes(originalRequest.url)) {
      originalRequest._retry = true;
      try {
        await authApi.refresh();
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error.response.data);
  },
);

export default axios;
