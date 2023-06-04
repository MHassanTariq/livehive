import { AppSession, GraphData, SheetData } from "../services/types";

const APP_SESSION_KEYS = 5;
export function convertAppSessionCSVToSheetData(
  appSession: AppSession[]
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
      app.user.name,
      // app.app_package,
      app.app_name,
      app.start_time,
      app.end_time,
      app.duration
    );
  });
  return { csvData: result, keys: APP_SESSION_KEYS };
}

export function convertAppSessionCSVToGraphData(
  appSession: AppSession[]
): GraphData {
  return {
    labels: ["This", "Is", "A", "Test"],
    data: [
      {
        label: "id 1",
        data: [5, 6, 7],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "rgb(0,0,0)",
        borderWidth: 1,
      },
      {
        label: "id 2",
        data: [3, 2, 1],
      },
      {
        label: "id 3",
        data: [3, 2],
      },
    ],
    headers: {
      x: "Months",
      y: "Numbers",
    },
  };
}
