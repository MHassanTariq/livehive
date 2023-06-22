import { Router } from "express";
import smsController from "../controllers/sms/smsControllers";

export function smsDataRouter() {
  const router = Router();

  router.get("/", smsController.fetchSmsListing);
  router.get("/search", smsController.searchSms);
  router.post("/upload_sms_data", smsController.updateSms);

  return router;
}
