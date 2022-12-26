import { Crypt } from "../lib/crypt.lib";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import User from "../models/user";

export const UserService = {
  get: async (p_params) => {
    try {
      console.log("UserService: get");

      const { id } = p_params;

      const _user = await User.findById(id);
      if (!_user) throw "User not exists";

      return { user: _user };
    } catch (error) {
      throw error;
    }
  },
};
