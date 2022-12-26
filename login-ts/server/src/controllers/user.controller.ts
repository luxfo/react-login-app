import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { GetUserRequest } from "./../types/user.type";

export const UserController = {
  get: async (p_req: Request<GetUserRequest>, p_res: Response) => {
    try {
      const _response = await UserService.get(p_req.params);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },
};
