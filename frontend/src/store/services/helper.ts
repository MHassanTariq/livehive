import { Pagination, SearchQuery } from "./types";

export const DEFAULT_PAGINATION_LIMIT = 20;
const DEFAULT_OFFSET = 0;
export const DEFAULT_SEARCH_RESULTS = 20;
export function getPaginationWithValues(pagination: Pagination) {
  const { limit = DEFAULT_PAGINATION_LIMIT, offset = DEFAULT_OFFSET } =
    pagination;
  return { limit, offset };
}
export function getSearchWithValues(search: SearchQuery) {
  const { keyword, result = DEFAULT_SEARCH_RESULTS } = search;
  return { keyword, result };
}
export function totalPagesPossible(count: number, pageCount: number) {
  return count / pageCount - 1; // pages start from 0
}
export function prepareHeaders(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  return headers;
}
