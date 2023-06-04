export enum InfoGraphics {
  Sheet,
  Graphs,
}

export type User = {
  name: string;
  email?: string;
};

export type Pagination = {
  offset?: number;
  limit?: number;
};

export type Location = {
  user: User;
  lat: number;
  lng: number;
  alt: number;
  accuracy: number;
  isRoaming: boolean;
  time: string;
  location: {
    city: string;
    country: string;
    street: string;
  };
};

export type AppSession = {
  user: User;
  app_package: string;
  app_name: string;
  start_time: string;
  end_time: string;
  duration: string;
};

export type WebLinkResponse = {
  user: User;
  time: string;
  app_name: string;
  link: string;
};

export type TypedSheets =
  | { type: "Location"; data: Location[] }
  | { type: "Apps"; data: AppSession[] }
  | { type: "Weblink"; data: WebLinkResponse[] };

export type SheetData = {
  csvData: string[];
  keys: number;
};

export type GraphData = {
  labels: string[];
  data: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
  headers: {
    x: string;
    y: string;
  };
};

export type SearchQuery = {
  keyword: string;
  result?: number;
};
