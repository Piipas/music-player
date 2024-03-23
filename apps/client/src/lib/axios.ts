import { Axios } from "axios";

const axios = new Axios({
  withCredentials: true,
  baseURL: "http://localhost:4001/",
  headers: {
    "Content-Type": "application/json",
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

export default axios;
