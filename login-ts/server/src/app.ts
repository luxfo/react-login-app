import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { Config } from "./config";
import jwt from "./middlewares/jwt.mw";
import errorMw from "./middlewares/error.mw";
import { AuthRouter } from "./routes/auth.routes";
import { UserRouter } from "./routes/user.routes";
import { DataSource } from "./database";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.connections();
  }

  settings() {
    this.app.set("pkg", { name: "Authentication", version: "1.0" });
    this.app.set("port", Config.port);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: "http://localhost:5173", credentials: true }));
    this.app.use(express.json());
    this.app.use(jwt());
    this.app.use(errorMw);
  }

  routes() {
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/user", UserRouter);
  }

  connections() {
    DataSource.initialize();
  }

  async listen() {
    const _port = this.app.get("port");
    this.app.listen(_port);
    console.log("server on port", _port);
  }
}
