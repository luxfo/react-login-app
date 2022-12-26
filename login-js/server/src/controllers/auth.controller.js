import { AuthService } from "../services/auth.service";

export const AuthController = {
  register: async (p_req, p_res) => {
    try {
      const _response = await AuthService.register(p_req.body);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },

  verify: async (p_req, p_res) => {
    try {
      const _response = await AuthService.verify(p_req.params);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },

  sendVerificationCode: async (p_req, p_res) => {
    try {
      const _response = await AuthService.sendVerificationCode(p_req.body);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },

  signIn: async (p_req, p_res) => {
    try {
      const _response = await AuthService.authenticate(p_req.body);
      return p_res.json(_response);
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },
};
