export enum InfoGraphics {
  Sheet,
  Graphs,
}

export type LocationCSV = {
  userId: string;
  lat: number;
  lng: number;
  alt: number;
  accuracy: number;
  isRoaming: boolean;
  time: string;
  region?: string;
};

export type AppSessionCSV = {
  participant: string;
  app_package: string;
  app_name: string;
  start_time: string;
  end_time: string;
  duration: string;
};

export type TypedSheets =
  | { type: "Location"; data: LocationCSV[] }
  | { type: "Apps"; data: AppSessionCSV[] };

export type SheetData = {
  csvData: string[];
  keys: number;
};
