import Geocoder from "node-geocoder";
import Location from "../../models/locationModel";
import { TrendQuery } from "../../utils.ts/types";

const geocoder = Geocoder({
  provider: "google",
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

export type LocationTrendType = "Per person" | "Accumulative";

export type LocationTrend = {
  type: LocationTrendType;
} & TrendQuery;

/**
 * This service calculates the data list of every user that has an entry in any city.
 * Multiple cities for each user are counted in this resulting data.
 * @param trendQuery takes in the params for the query to calculate trends
 * @returns an array of top trend_of_result cities having
 * city_name, and count of users in each city_name
 */
export async function calculateLocationTrends(trendQuery: TrendQuery) {
  const { start_date, end_date, trend_of_results: trendOfCitys } = trendQuery;
  const result = await Location.aggregate([
    {
      $match: {
        time: {
          $lte: end_date,
          $gt: start_date,
        },
      },
    },
    {
      $group: {
        _id: {
          user_name: "$user.name",
          city: "$location.city",
        },
      },
    },
    {
      $group: {
        _id: "$_id.city",
        population: { $sum: 1 },
      },
    },
  ])
    .sort({ population: "desc" })
    .limit(trendOfCitys);
  return result;
}

/**
 * This service calculates trends for each user. Responds with percentage distribution
 * of each user spent in each city
 * @param trendQuery
 * @param userId
 * @returns
 */
export async function calculateLocationTrendsForAUser(
  trendQuery: TrendQuery,
  userId: string
) {
  const { start_date, end_date, trend_of_results: trendOfCitys } = trendQuery;
  const dbQuery = await Location.aggregate([
    {
      $match: {
        time: {
          $lte: end_date,
          $gt: start_date,
        },
      },
    },
    {
      $match: {
        user: {
          name: userId,
        },
      },
    },
    {
      $sort: {
        time: 1,
      },
    },
  ]);
  return dbQuery;
}
