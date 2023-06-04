import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { locationRouter } from "./routers/locationRouter";
import { appSessionRouter } from "./routers/appSessionRouter";
import { setupMongoDB } from "./config/mongodbSetup";
import cors from "cors";
import bodyParser from "body-parser";
import { uploadCsvRouter } from "./routers/uploadCsvRouter";
import { weblinkRouter } from "./routers/weblinkRouter";

dotenv.config();

export async function initServer() {
  // configurations
  const app = express();
  const port = process.env.PORT;
  const mongoUri = process.env.MONGO_CONNECTION_STRING ?? "";

  // middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));

  // routers
  app.use("/location", locationRouter());
  app.use("/app", appSessionRouter());
  app.use("/weblink", weblinkRouter());

  app.use("/upload", uploadCsvRouter());

  // db setup
  await setupMongoDB(mongoUri);

  // server setup
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
