import axios from "axios";
import { TSignIn } from "../types/auth.type";
import { TUserRequest } from "../types/user.type";

const BASE_URL = "http://localhost:4000/api/";

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const AuthApi = {
  register: async (data: TUserRequest) => {
    try {
      const res = await authApi.post("/auth/register", data);
      return res;
    } catch (error) {
      throw error;
    }
  },
  verify: async (data: string) => {
    try {
      const res = await authApi.post("/auth/verify/" + data);
      return res;
    } catch (error) {
      throw error;
    }
  },
  signIn: async (data: TSignIn) => {
    try {
      const res = await authApi.post("/auth/signin", data);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
