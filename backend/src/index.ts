import express from "express";
import dotenv from "dotenv";
import { locationRouter } from "./routers/locationRouter";
import { appSessionRouter } from "./routers/appSessionRouter";
import { setupMongoDB } from "./database/setup";

dotenv.config();

export async function initServer() {
  // configurations
  const app = express();
  const port = process.env.PORT;
  const mongoUri = process.env.MONGO_CONNECTION_STRING ?? "";

  // routers
  app.use("/location", locationRouter());
  app.use("/app", appSessionRouter());

  // db setup
  await setupMongoDB(mongoUri);

  // server setup
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
