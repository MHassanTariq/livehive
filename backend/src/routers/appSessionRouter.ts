import { Router } from "express";
import appController from "../controllers/appController";

export function appSessionRouter() {
  const router = Router();

  router.get("/", appController.findAppSession);

  return router;
}
