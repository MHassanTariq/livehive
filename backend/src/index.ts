import express from "express";
import dotenv from "dotenv";
import { locationRouter } from "./routers/locationRouter";
import { appSessionRouter } from "./routers/sessionRouter";

dotenv.config();

export function initServer() {
  const app = express();
  const port = process.env.PORT;

  app.use("/location", locationRouter());
  app.use("/app", appSessionRouter());

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
