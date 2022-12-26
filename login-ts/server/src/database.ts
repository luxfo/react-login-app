import mongoose from "mongoose";
import { Config } from "./config";

export const DataSource = {
  initialize: () => {
    mongoose
      .connect(
        "mongodb://" + Config.datasource.host + "/" + Config.datasource.database
      )
      .then((db) => console.log("Database is connected"))
      .catch((error) => console.log(error));
  },
};
