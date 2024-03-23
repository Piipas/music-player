import axios from "@/lib/axios";
import { RegisterType, SigninType } from "mp-validation";

export const authApi = {
  signin: async (credentials: SigninType) => {
    const signin = await axios.post("auth/login", credentials);
    localStorage.setItem("access_token", signin.data.access_token);
  },

  register: async (credentials: RegisterType) => {
    const register = await axios.post("auth/register", credentials);
    localStorage.setItem("access_token", register.data.access_token);
  },

  refresh: async () => {
    const refresh = await axios.post("auth/refresh");
    localStorage.setItem("access_token", refresh.data.access_token);
  },
};
