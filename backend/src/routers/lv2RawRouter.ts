import { Router } from "express";
import level2RawController from "../controllers/level2Raw/level2RawController";

export function lv2RawDataRouter() {
  const router = Router();

  router.get("/", level2RawController.fetchLevel2RawListings);
  router.get("/search", level2RawController.searchLevel2Raw);
  router.post("/upload_raw_data", level2RawController.updateLevel2Raw);
  return router;
}