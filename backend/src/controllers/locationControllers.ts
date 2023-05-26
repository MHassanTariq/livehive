import { Request, Response } from "express";
import Location from "../database/models/locationModel";
import {
  ListingQuery,
  ListingResponse,
  LocationResponse,
} from "../utils.ts/types";
import { getLimitAndOffsetFromQuery } from "../utils.ts/helper";

async function fetchLocation(req: Request<ListingQuery>, res: Response) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  const result: LocationResponse[] = await Location.find()
    .limit(limit)
    .skip(offset);
  const count = await Location.count();
  const response: ListingResponse<LocationResponse> = { result, count };
  res.json(response);
}

export default { fetchLocation };
