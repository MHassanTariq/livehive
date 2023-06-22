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

// export type UserResponse = {
//   name: string;
//   email?: string;
// };

// Response types

export type AppSessionResponse = {
  _id: ObjectId;
  user: String;
  app_package?: string;
  app_name?: string;
  start_time?: string;
  end_time?: string;
  duration?: number;
};

export type LocationResponse = {
  _id: ObjectId;
  user: String;
  lat?: number;
  lng?: number;
  alt?: number;
  accuracy?: number;
  isRoaming?: boolean;
  time: String;
  location?: {
    city?: string;
    country?: string;
    street?: string;
  };
};

export type WeblinkResponse = {
  _id: ObjectId;
  user: String;
  time?: string;
  app_name?: string;
  link?: string;
};

export type Level2RawResponse = {
  _id: ObjectId;
  user: String;
  timestamp: string;
  raw_string?: string;
  package_name: string;
  app_name: string;
};

export type SMSResponse = {
  _id: ObjectId;
  user: String;
  origin: String;
  content: String;
  timestamp?: string;
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
