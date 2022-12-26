import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

const userApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

//const { authUser } = useAuth();

userApi.defaults.headers.common["Content-Type"] = "application/json";
//userApi.defaults.headers.common = { Authorization: `bearer ${authUser.token}` };

export const UserApi = {
  get: async (data) => {
    try {
      const res = await userApi.get("/user/get/" + data.id, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
};
