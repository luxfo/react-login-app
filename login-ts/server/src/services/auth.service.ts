import { Crypt } from "../lib/crypt.lib";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import User from "../models/user";
import { MailVerificationCode } from "../lib/mail.lib";
import { LoginRequest, VerifyRequest } from "./../types/login.type";
import { CreateUserRequest } from "./../types/user.type";

export const AuthService = {
  register: async (p_req: CreateUserRequest) => {
    try {
      console.log("AuthService: register");

      const { first_name, last_name, email, password } = p_req;

      const _user = await User.findOne({ email: email });
      if (_user) throw "User already exists";

      const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: await Crypt.encrypt(password),
        verificationCode: await Crypt.verificationCode(),
      });

      await newUser.save();

      await MailVerificationCode(newUser.email, newUser.verificationCode);

      return {
        message: "User saved succesfully. Check your email to validate user.",
      };
    } catch (error) {
      throw error;
    }
  },

  verify: async (p_req: VerifyRequest) => {
    try {
      console.log("AuthService: verify");

      const { verificationCode } = p_req;

      const _user = await User.findOne({ verificationCode: verificationCode });
      if (!_user) throw "User not exists";

      _user.verified = true;
      _user.verificationCode = null!;

      await _user.save();

      return { message: "User verified succesfully. Please Login." };
    } catch (error) {
      throw error;
    }
  },

  authenticate: async (p_req: LoginRequest) => {
    try {
      console.log("AuthService: authenticate");

      const { email, password } = p_req;

      const user = await User.findOne({ email: email });
      if (!user) throw "Username is incorrect";

      if (!user.verified) {
        const info = await MailVerificationCode(
          user.email,
          user.verificationCode
        );
        throw "User is not verified. Check your email: " + info;
      }

      const matchPassword = await Crypt.compare(password, user.password!);

      if (!matchPassword) throw "Password is incorrect";

      const token = jwt.sign({ id: user._id }, Config.jwt_key, {
        expiresIn: 86400,
      });

      return { id: user._id, token: token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
