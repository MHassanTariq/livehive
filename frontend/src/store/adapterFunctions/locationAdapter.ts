import { Location, SheetData } from "../services/types";
/**
 * This represents the number of header columns for each CSV
 */
const LOCATION_KEYS = 9;
/**
 * This is an adapter function that converts incoming data in the form of objects to
 * an array of strings
 * @param locationCsv The array of LocationCSV objects
 * @returns converted sheet data
 */
export function convertLocationCSVToSheetData(
  locationCsv: Location[]
): SheetData {
  const result: string[] = [];
  // pushing headings
  result.push(
    "User ID",
    "Latitude",
    "Longitude",
    "Altitude",
    "Accuracy",
    "Is Roaming",
    "City",
    "Country",
    "Time"
  );
  // pushing body
  locationCsv.forEach((locData) => {
    result.push(
      locData.user.name,
      locData.lat.toString(),
      locData.lng.toString(),
      locData.alt.toString(),
      locData.accuracy.toString(),
      String(locData.isRoaming),
      locData.location.city,
      locData.location.country,
      locData.time
    );
  });
  return { csvData: result, keys: LOCATION_KEYS };
}
