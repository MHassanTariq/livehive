import { ObjectId } from "mongodb";

export type ListingResponse<T> = {
  result: T[];
  count: number;
};

export type Search = {
  keyword: string;
  result: number;
};

export type TrendQuery = {
  start_date: Date;
  end_date: Date;
  trend_of_results: number;
};

export type ListingQuery = {
  limit: number;
  offset: number;
};

export type UserResponse = {
  name: string;
  email?: string;
};

// Response types

export type AppSessionResponse = {
  _id: ObjectId;
  user: UserResponse;
  app_package?: string;
  app_name?: string;
  start_time?: string;
  end_time?: string;
  duration?: number;
};

export type LocationResponse = {
  _id: ObjectId;
  user: UserResponse;
  lat?: number;
  lng?: number;
  alt?: number;
  accuracy?: number;
  isRoaming?: boolean;
  time?: string;
  location?: {
    city?: string;
    country?: string;
    street?: string;
  };
};

export type WeblinkResponse = {
  _id: ObjectId;
  user: UserResponse;
  time?: string;
  app_name?: string;
  link?: string;
};

// CSV types
export type LocationCsvType = {
  UserId: string;
  Lat: string;
  Lng: string;
  Altitude: string;
  Accuracy: string;
  IsRoaming: string;
  Time: string;
  location?: {
    city?: string;
    country?: string;
    street?: string;
  };
};

export type AppCsvType = {
  participant: string;
  app_package: string;
  app_name: string;
  start_time: string;
  end_time: string;
  duration: string;
};

export type WeblinkCsvType = {
  participant: string;
  time: string;
  app_name: string;
  link: string;
};
