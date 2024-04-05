import ax from "axios";
import { authApi } from "./api/auth-api";

const authRoutes = ["auth/login", "auth/register", "auth/refresh"];
const axios = ax.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "Content-Type",
  },
});

axios.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
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
