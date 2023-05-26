import express from "express";
import dotenv from "dotenv";
import { locationRouter } from "./routers/locationRouter";
import { appSessionRouter } from "./routers/sessionRouter";
import { setupMongoDB } from "./database/setup";

dotenv.config();

export async function initServer() {
  const app = express();
  const port = process.env.PORT;
  const mongoUri = process.env.MONGO_CONNECTION_STRING ?? "";

  app.use("/location", locationRouter());
  app.use("/app", appSessionRouter());

  await setupMongoDB(mongoUri);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
