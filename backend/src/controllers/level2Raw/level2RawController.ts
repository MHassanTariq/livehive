import { Response, Request } from "express";
import {
  Level2RawResponse,
  ListingQuery,
  Search,
} from "../../utils.ts/types";
import {
  getLimitAndOffsetFromQuery,
  getSearchParams,
} from "../../utils.ts/helper";
import { searchLevel2RawData } from "./search";
import { updateLevel2RawData } from "./updateLevel2RawData";
import Level2RawModel from "../../models/level2RawModel";

async function fetchLevel2RawListings(
  req: Request<ListingQuery>,
  res: Response
) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  // calculate location listing
  const dbQuery = await Level2RawModel.find().limit(limit).skip(offset);
  const count = await Level2RawModel.count();

  // parsing
  const level2Response: Level2RawResponse[] = dbQuery.map((res) => {
    const response: Level2RawResponse = {
      app_name: res.app_name ?? "<no app name>",
      package_name: res.package_name ?? "<no package name>",
      user: res.user_id ?? "",
      _id: res._id,
      raw_string: res.raw_string,
      timestamp: new Date(res.timestamp ?? Date.now()).toISOString(),
    };
    return response;
  });

  // response
  const response = {
    result: level2Response,
    count,
  };
  res.json(response);
}

/**
 * Filters the results based on the city name, country name, and user name
 */
async function searchLevel2Raw(req: Request<Search>, res: Response) {
  const search: Search = getSearchParams(req);
  const response = await searchLevel2RawData(search);
  return res.json(response);
}

async function updateLevel2Raw(req: Request<Search>, res: Response) {
  const body = req.body;
  if (!body) {
    return res.json("Invalid req body");
  }
  const response = await updateLevel2RawData(body);

  return res.json(response);
}

export default { fetchLevel2RawListings, searchLevel2Raw, updateLevel2Raw };
