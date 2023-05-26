import { ObjectId } from "mongodb";

export type ListingResponse<T> = {
  result: T[];
  count: number;
};

export type ListingQuery = {
  limit: number;
  offset: number;
};

export type AppSessionResponse = {
  _id: ObjectId;
  userId: ObjectId;
  app_package?: string;
  app_name?: string;
  start_time?: string;
  end_time?: string;
  duration?: string;
};

export type LocationResponse = {
  _id: ObjectId;
  userId: ObjectId;
  lat?: number;
  lng?: number;
  alt?: number;
  accuracy?: number;
  isRoaming?: boolean;
  time?: string;
};
