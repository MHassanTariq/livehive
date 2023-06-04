import { Router } from "express";
import appController from "../controllers/appSession/appController";

export function appSessionRouter() {
  const router = Router();

  router.get("/", appController.findAppSession);
  router.get("/trends", appController.getLastMonthsTrends);
  router.get("/search", appController.searchAppSessions);

  return router;
}
