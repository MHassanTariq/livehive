import { Request, Response } from "express";
import App from "../database/models/appModel";

async function findAppSession(req: Request, res: Response) {
  const apps = await App.find().limit(5).skip(3);
  const count = await App.count();
  res.json({ apps, count });
}

export default { findAppSession };
