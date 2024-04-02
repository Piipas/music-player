import axios from "@/lib/axios";
import { RegisterType, SigninType } from "mp-validation";

export const authApi = {
  signin: async (credentials: SigninType) => {
    const { data } = await axios.post("auth/login", credentials);
    localStorage.setItem("access_token", data.access_token);
  },

  register: async (credentials: RegisterType) => {
    const { data } = await axios.post("auth/register", credentials);
    localStorage.setItem("access_token", data.access_token);
  },

  refresh: async () => {
    const { data } = await axios.post("auth/refresh");
    localStorage.setItem("access_token", data.access_token);
    return data;
  },

  logout: async () => {
    const { data } = await axios.delete("auth/logout");
    localStorage.setItem("access_token", data.access_token);
  },

  me: async () => {
    const { data } = await axios.get("auth/me");
    return data;
  },
};
