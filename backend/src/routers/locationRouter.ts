import { Router } from "express";
import locationControllers from "../controllers/locationControllers";

export function locationRouter() {
  const router = Router();

  router.get("/", locationControllers.fetchLocation);

  return router;
}
