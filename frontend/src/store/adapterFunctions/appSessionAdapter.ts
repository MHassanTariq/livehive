import { AppSessionCSV, SheetData } from "../types";

const APP_SESSION_KEYS = 5;
export function convertAppSessionCSVToSheetData(
  appSession: AppSessionCSV[]
): SheetData {
  const result: string[] = [];
  // pushing headings
  result.push(
    "Participant",
    // "App Package",
    "App Name",
    "Start Time",
    "End Time",
    "Duration"
  );
  // pushing body
  appSession.forEach((app) => {
    result.push(
      app.participant,
      // app.app_package,
      app.app_name,
      app.start_time,
      app.end_time,
      app.duration
    );
  });
  return { csvData: result, keys: APP_SESSION_KEYS };
}
