import { Request } from "express";
import { ListingQuery } from "./types";

const PAGINATION_LIMIT = 20;
const PAGINATION_OFFSET = 0;

function getNumberFromQuery(value: any, defaultValue: number) {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return defaultValue;
  }
  return numberValue;
}

export function getLimitAndOffsetFromQuery(
  req: Request<ListingQuery>
): ListingQuery {
  const result: ListingQuery = {
    limit: getNumberFromQuery(req.query.limit, PAGINATION_LIMIT),
    offset: getNumberFromQuery(req.query.offset, PAGINATION_OFFSET),
  };
  return result;
}
