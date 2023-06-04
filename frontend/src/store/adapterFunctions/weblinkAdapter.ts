import { WebLinkResponse, SheetData } from "../services/types";
/**
 * This represents the number of header columns for each CSV
 */
const WEBLINK_KEYS = 4;
/**
 * This is an adapter function that converts incoming data in the form of objects to
 * an array of strings
 * @param weblinkCsv The array of server objects
 * @returns converted sheet data
 */
export function convertWeblinkCSVToSheetData(
  weblinkCsv: WebLinkResponse[]
): SheetData {
  const result: string[] = [];
  // pushing headings
  result.push("User ID", "Time", "App Name", "Link");
  // pushing body
  weblinkCsv.forEach((locData) => {
    result.push(
      locData.user.name,
      locData.time,
      locData.app_name,
      locData.link
    );
  });
  return { csvData: result, keys: WEBLINK_KEYS };
}
