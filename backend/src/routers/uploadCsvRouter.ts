import { Router } from "express";
import multer from "multer";
import {
  handleUploadAppCsv,
  handleUploadLocationCsv,
  handleUploadWeblinkCsv,
} from "../controllers/uploadCsv/uploadCsv";

export function uploadCsvRouter() {
  const router = Router();
  const upload = multer({ dest: "uploads/" });

  router.post("/location", upload.single("location"), handleUploadLocationCsv);
  router.post("/apps", upload.single("apps"), handleUploadAppCsv);
  router.post("/weblink", upload.single("weblink"), handleUploadWeblinkCsv);

  return router;
}
