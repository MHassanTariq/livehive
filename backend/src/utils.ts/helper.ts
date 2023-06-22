import { Request } from "express";
import { ListingQuery, Search, TrendQuery } from "./types";
import {
  AppSessionTrend,
  AppSessionTrendType,
} from "../controllers/appSession/trends";

const PAGINATION_LIMIT = 200;
const PAGINATION_OFFSET = 0;

const DEFAULT_RESULTS_IN_TREND = 1;

const DEFAULT_SEARCH_RESULTS = 5;

export function getSearchParams(req: Request<Search>): Search {
  const keyword = getStringFromQuery(req.query.keyword);
  const result = getNumberFromQuery(req.query.result, DEFAULT_SEARCH_RESULTS);
  return { keyword, result };
}

export function getNumberFromQuery(value: any, defaultValue: number) {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return defaultValue;
  }
  return numberValue;
}

function getDateFromQuery(value: any) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? new Date() : date;
}

export function getStringFromQuery(value: any) {
  return (value as string) ?? "";
}

export function convertDateToString(date?: Date) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export function getLimitAndOffsetFromQuery(
  req: Request<ListingQuery>
): ListingQuery {
  const result: ListingQuery = {
    limit: getNumberFromQuery(req.query.limit, PAGINATION_LIMIT),
    offset: getNumberFromQuery(req.query.offset, PAGINATION_OFFSET),
  };
  // offset is considered to be used like a page
  result.offset = result.limit * result.offset;
  return result;
}

export function getTrendsFromQuery(req: Request<TrendQuery | AppSessionTrend>) {
  const result: TrendQuery = {
    start_date: getDateFromQuery(req.query.start_date),
    end_date: getDateFromQuery(req.query.end_date),
    trend_of_results: getNumberFromQuery(
      req.query.trend_of_results,
      DEFAULT_RESULTS_IN_TREND
    ),
  };
  return result;
}

export function getTypeFromAppSession(req: Request<AppSessionTrend>) {
  const type = req.query.type;
  if (type === "Duration" || type === "Opened") {
    return type as AppSessionTrendType;
  }
  return "Duration";
}
