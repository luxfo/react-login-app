process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

import dotenv from "dotenv";

console.log(process.env.APP_ENV);

dotenv.config({
  path: __dirname + "/../env/" + process.env.APP_ENV + ".env",
});

export const Config = {
  port: process.env.PORT || 3000,
  client_origin: "http://localhost:5173",
  jwt_key: process.env.JWT_KEY || "",
  datasource: {
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
  },
};
