import { Request, Response } from "express";
import App from "../database/models/appModel";
import {
  AppSessionResponse,
  ListingQuery,
  ListingResponse,
} from "../utils.ts/types";
import { getLimitAndOffsetFromQuery } from "../utils.ts/helper";

async function findAppSession(req: Request<ListingQuery>, res: Response) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  const result: AppSessionResponse[] = await App.find()
    .limit(limit)
    .skip(offset);
  const count = await App.count();
  const response: ListingResponse<AppSessionResponse> = { result, count };
  res.json(response);
}

export default { findAppSession };
