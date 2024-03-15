import { Axios } from "axios";

const axios = new Axios({
  withCredentials: true,
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "appliaction/json",
  },
});

export default axios;
