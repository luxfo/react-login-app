import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/verify/:verificationCode", AuthController.verify);
AuthRouter.post("/sendverificationcode", AuthController.sendVerificationCode);
AuthRouter.post("/signin", AuthController.signIn);

export { AuthRouter };
