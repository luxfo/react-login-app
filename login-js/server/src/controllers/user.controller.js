import { UserService } from "../services/user.service";

export const UserController = {
  get: async (p_req, p_res) => {
    try {
      const _response = await UserService.get(p_req.params);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },
};
