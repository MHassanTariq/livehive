import { NextFunction, Request, Response } from "express";
import Location from "../../models/locationModel";
import { ListingQuery, LocationResponse, Search } from "../../utils.ts/types";
import {
  getLimitAndOffsetFromQuery,
  getSearchParams,
  getTrendsFromQuery,
} from "../../utils.ts/helper";
import { LocationTrend, calculateLocationTrendsForAUser } from "./trends";
import { searchLocationResults } from "./search";

async function fetchLocation(req: Request<ListingQuery>, res: Response) {
  const { limit, offset } = getLimitAndOffsetFromQuery(req);
  // calculate location listing
  const dbQuery = await Location.find().limit(limit).skip(offset);
  const count = await Location.count();

  // parsing
  const locationResp: LocationResponse[] = dbQuery.map((res) => {
    const response: LocationResponse = {
      _id: res._id,
      user: res.user,
      lat: res.lat,
      lng: res.lng,
      alt: res.alt,
      accuracy: res.accuracy,
      location: res.location,
      isRoaming: res.isRoaming,
    };
    if (res.time) {
      response.time = res.time.toISOString();
    }
    return response;
  });

  // response
  const response = {
    result: locationResp,
    count,
  };
  res.json(response);
}

async function getLocationTrends(req: Request<LocationTrend>, res: Response) {
  const trendQuery = getTrendsFromQuery(req);
  const response = await calculateLocationTrendsForAUser(
    trendQuery,
    "Test User"
  );
  res.json(response);
}

/**
 * Filters the results based on the city name, country name, and user name
 */
async function searchLocation(req: Request<Search>, res: Response) {
  const search: Search = getSearchParams(req);
  const response = await searchLocationResults(search);
  return res.json(response);
}

export default { fetchLocation, getLocationTrends, searchLocation };
