import { Response, Request } from "express";
import {
  ListingQuery,
  SMSResponse,
  Search,
} from "../../utils.ts/types";
import {
  getLimitAndOffsetFromQuery,
  getSearchParams,
} from "../../utils.ts/helper";
import SMSModel from "../../models/smsModel";
import { searchSmsResults } from "./search";
import { updateSmsData } from "./updateSmsData";

async function fetchSmsListing(req: Request<ListingQuery>, res: Response) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  // calculate location listing
  const dbQuery = await SMSModel.find().limit(limit).skip(offset);
  const count = await SMSModel.count();

  // parsing
  const smsResponse: SMSResponse[] = dbQuery.map((res) => {
    const response: SMSResponse = {
      user: res.user_id ?? "<no user>",
      _id: res._id,
      content: res.content ?? "<no content>",
      origin: res.origin ?? "<no origin>",
      timestamp: new Date(res.timestamp ?? Date.now()).toISOString(),
    };
    return response;
  });

  // response
  const response = {
    result: smsResponse,
    count,
  };
  res.json(response);
}

/**
 * Filters the results based on the city name, country name, and user name
 */
async function searchSms(req: Request<Search>, res: Response) {
  const search: Search = getSearchParams(req);
  const response = await searchSmsResults(search);
  return res.json(response);
}

async function updateSms(req: Request<Search>, res: Response) {
  const body = req.body;
  if (!body) {
    return res.json("Invalid req body");
  }
  const response = await updateSmsData(body);

  return res.json(response);
}

export default { fetchSmsListing, searchSms, updateSms };
