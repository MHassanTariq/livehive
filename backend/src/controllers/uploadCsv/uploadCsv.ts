import { Request, Response } from "express";
import { ingestLocationData } from "./locationService";
import { ingestAppData } from "./appService";
import { ingestWeblinkData } from "./weblinkService";

export async function handleUploadLocationCsv(req: Request, res: Response) {
  // base cases
  const file = req.file;
  if (!file) {
    return res.json({ msg: "File not found" });
  }
  res.json({ msg: "File ingestion started!" });

  // ingestion of file to DB
  const csvFilePath = file.path;
  await ingestLocationData(csvFilePath);
}

export async function handleUploadAppCsv(req: Request, res: Response) {
  // base cases
  const file = req.file;
  if (!file) {
    return res.json({ msg: "File not found" });
  }
  res.json({ msg: "File ingestion started!" });

  const csvFilePath = file.path;
  await ingestAppData(csvFilePath);
}

export async function handleUploadWeblinkCsv(req: Request, res: Response) {
  // base cases
  const file = req.file;
  if (!file) {
    return res.json({ msg: "File not found" });
  }
  res.json({ msg: "File ingestion started!" });

  const csvFilePath = file.path;
  await ingestWeblinkData(csvFilePath);
}
