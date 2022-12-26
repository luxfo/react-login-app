import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { VerifyRequest } from "./../types/login.type";

export const AuthController = {
  register: async (p_req: Request, p_res: Response) => {
    try {
      const _response = await AuthService.register(p_req.body);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },

  verify: async (p_req: Request<VerifyRequest>, p_res: Response) => {
    try {
      const _response = await AuthService.verify(p_req.params);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },

  signIn: async (p_req: Request, p_res: Response) => {
    try {
      const _response = await AuthService.authenticate(p_req.body);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },
};
