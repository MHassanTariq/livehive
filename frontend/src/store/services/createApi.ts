import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AppSession,
  Location,
  Pagination,
  SearchQuery,
  WebLinkResponse,
} from "./types";
import {
  getPaginationWithValues,
  getSearchWithValues,
  prepareHeaders,
} from "./helper";
import Config from "./apis";

export const streamMatricsApi = createApi({
  reducerPath: "StreamMatricsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
    prepareHeaders,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

const endpoints = streamMatricsApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * ----------- Location --------------
     */
    getLocationListing: builder.query<Location[], Pagination>({
      query: (pagination) => {
        const { limit, offset } = getPaginationWithValues(pagination);
        return `/location?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (data: any) => {
        return data.result;
      },
    }),
    searchLocation: builder.mutation<Location[], SearchQuery>({
      query: (search) => {
        const { result, keyword } = getSearchWithValues(search);
        return `/location/search?result=${result}&keyword=${keyword}`;
      },
    }),

    /**
     * ----------- App Session --------------
     */
    getAppSessionListing: builder.query<AppSession[], Pagination>({
      query: (pagination) => {
        const { limit, offset } = getPaginationWithValues(pagination);
        return `/app?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (data: any) => {
        return data.result;
      },
    }),
    searchAppSession: builder.mutation<AppSession[], SearchQuery>({
      query: (search) => {
        const { result, keyword } = getSearchWithValues(search);
        return `/app/search?result=${result}&keyword=${keyword}`;
      },
    }),

    /**
     * ----------- Web Link --------------
     */
    getWebLinkListing: builder.query<WebLinkResponse[], Pagination>({
      query: (pagination) => {
        const { limit, offset } = getPaginationWithValues(pagination);
        return `/weblink?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (data: any) => {
        return data.result;
      },
    }),
    searchWeblink: builder.mutation<WebLinkResponse[], SearchQuery>({
      query: (search) => {
        const { result, keyword } = getSearchWithValues(search);
        return `/weblink/search?result=${result}&keyword=${keyword}`;
      },
    }),
  }),
});

export const {
  useGetLocationListingQuery,
  useGetAppSessionListingQuery,
  useGetWebLinkListingQuery,
  useSearchWeblinkMutation,
  useSearchAppSessionMutation,
  useSearchLocationMutation,
} = endpoints;
