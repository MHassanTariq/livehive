import { Pagination, SearchQuery } from "./types";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const DEFAULT_SEARCH_RESULTS = 5;
export function getPaginationWithValues(pagination: Pagination) {
  const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = pagination;
  return { limit, offset };
}
export function getSearchWithValues(search: SearchQuery) {
  const { keyword, result = DEFAULT_SEARCH_RESULTS } = search;
  return { keyword, result };
}
export function prepareHeaders(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  return headers;
}
