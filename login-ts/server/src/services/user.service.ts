import User from "../models/user";
import { GetUserRequest } from "./../types/user.type";

export const UserService = {
  get: async (p_req: GetUserRequest) => {
    try {
      console.log("UserService: get");

      const { id } = p_req;

      const _user = await User.findById(id);
      if (!_user) throw "User not exists";

      return { user: _user };
    } catch (error) {
      throw error;
    }
  },
};
