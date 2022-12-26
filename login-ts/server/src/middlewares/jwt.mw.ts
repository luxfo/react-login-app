import { expressjwt } from "express-jwt";
import { Config } from "../config";

function jwt() {
  return expressjwt({ secret: Config.jwt_key, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      { url: "/api/auth/register" },
      { url: /^\/api\/auth\/verify\/.*/ },
      { url: "/api/auth/signin" },
    ],
  });
}

export default jwt;
