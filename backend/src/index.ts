import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { locationRouter } from "./routers/locationRouter";
import { appSessionRouter } from "./routers/appSessionRouter";
import { setupMongoDB } from "./config/mongodbSetup";
import cors from "cors";
import bodyParser from "body-parser";
import { uploadCsvRouter } from "./routers/uploadCsvRouter";
import { weblinkRouter } from "./routers/weblinkRouter";
import { smsDataRouter } from "./routers/smsRouter";
import { lv2RawDataRouter } from "./routers/lv2RawRouter";

dotenv.config();

export async function initServer() {
  // configurations
  const app = express();
  const port = process.env.PORT ?? 3001;
  const mongoUri = process.env.MONGO_CONNECTION_STRING ?? "mongodb://0.0.0.0:27017";
  app.use(express.json())

  // middlewares
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // status
  app.use("/status", (req, res) => {
    res.json({ msg: "Welcome to LiveHive" });
  });
  
  // routers
  app.use("/location", locationRouter());
  app.use("/apps_usage", appSessionRouter());
  app.use("/weblink", weblinkRouter());
  app.use("/sms_data", smsDataRouter());
  app.use("/apps_raw_data", lv2RawDataRouter());

  app.use("/upload", uploadCsvRouter());

  // db setup
  await setupMongoDB(mongoUri);

  // server setup
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
