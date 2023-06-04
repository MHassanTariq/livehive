import { Response, Request } from "express";
import { ListingQuery, Search, WeblinkResponse } from "../../utils.ts/types";
import {
  getLimitAndOffsetFromQuery,
  getSearchParams,
} from "../../utils.ts/helper";
import Weblink from "../../models/webLink";
import { searchWeblinkResults } from "./search";

async function fetchWeblinkListing(req: Request<ListingQuery>, res: Response) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  // calculate location listing
  const dbQuery = await Weblink.find().limit(limit).skip(offset);
  const count = await Weblink.count();

  // parsing
  const weblinkResponse: WeblinkResponse[] = dbQuery.map((res) => {
    const response: WeblinkResponse = {
      app_name: res.app_name,
      user: res.user,
      _id: res._id,
      link: res.link,
    };
    if (res.time) {
      response.time = res.time.toISOString();
    }
    return response;
  });

  // response
  const response = {
    result: weblinkResponse,
    count,
  };
  res.json(response);
}

/**
 * Filters the results based on the city name, country name, and user name
 */
async function searchWeblink(req: Request<Search>, res: Response) {
  const search: Search = getSearchParams(req);
  const response = await searchWeblinkResults(search);
  return res.json(response);
}

export default { fetchWeblinkListing, searchWeblink };
