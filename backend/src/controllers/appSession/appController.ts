import { Request, Response } from "express";
import App from "../../models/appModel";
import {
  AppSessionResponse,
  ListingQuery,
  ListingResponse,
  Search,
} from "../../utils.ts/types";
import {
  convertDateToString,
  getLimitAndOffsetFromQuery,
  getSearchParams,
  getTrendsFromQuery,
  getTypeFromAppSession,
} from "../../utils.ts/helper";
import { AppSessionTrend, calculateAppSessionTrends } from "./trends";
import { searchAppResults } from "./search";

/**
 * GET API
 * Returns the list of all AppsSessions that have been recorded in the database.
 * It also contains the pagination.
 */
async function findAppSession(req: Request<ListingQuery>, res: Response) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  const queryResult = await App.find().limit(limit).skip(offset);
  const result: AppSessionResponse[] = queryResult.map((res) => ({
    _id: res._id,
    user: res.user,
    app_package: res.app_package,
    app_name: res.app_name,
    duration: res.duration,
    start_time: res.start_time?.toISOString(),
    end_time: res.start_time?.toISOString(),
  }));
  const count = await App.count();
  const response: ListingResponse<AppSessionResponse> = { result, count };
  res.json(response);
}

/**
 * GET API
 * Returns the list of top trending results (trend_of_results) for the time duration
 * in start_date and end_date.
 */
async function getLastMonthsTrends(
  req: Request<AppSessionTrend>,
  res: Response
) {
  const type = getTypeFromAppSession(req);
  const appSessionTrend = getTrendsFromQuery(req);
  const dbQuery = await calculateAppSessionTrends({
    type,
    ...appSessionTrend,
  });
  const result = dbQuery.map((query) => ({
    name: query._id,
    ...(type === "Opened"
      ? { repetition: query.count }
      : { duration: query.count }),
  }));
  return res.json(result);
}

/**
 * Filters results on the basis of user name, and app_name
 */
async function searchAppSessions(req: Request<Search>, res: Response) {
  const search: Search = getSearchParams(req);
  const response = await searchAppResults(search);
  return res.json(response);
}

export default { findAppSession, getLastMonthsTrends, searchAppSessions };
