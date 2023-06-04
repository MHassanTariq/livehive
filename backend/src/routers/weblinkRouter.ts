import { Router } from "express";
import weblinkControllers from "../controllers/weblink/weblinkControllers";

export function weblinkRouter() {
  const router = Router();

  router.get("/", weblinkControllers.fetchWeblinkListing);
  router.get("/search", weblinkControllers.searchWeblink);

  return router;
}
