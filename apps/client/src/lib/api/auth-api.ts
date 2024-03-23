import axios from "@/lib/axios";

export const authApi = {
  signin: async (credentials: { username: string; password: string }) => {
    const signin = await axios.post("login", credentials);
    localStorage.setItem("access_token", signin.data.access_token);
  },

  register: async (credentials: { username: string; email: string; password: string; confirm_password: string }) => {
    const register = await axios.post("register", credentials);
    localStorage.setItem("access_token", register.data.access_token);
  },

  refresh: async () => {
    const refresh = await axios.post("refresh");
    localStorage.setItem("access_token", refresh.data.access_token);
  },
};
