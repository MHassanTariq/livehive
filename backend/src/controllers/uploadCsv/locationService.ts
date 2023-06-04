import Location from "../../models/locationModel";
import { LocationCsvType } from "../../utils.ts/types";
import csv from "csv-parser";
import fs from "fs";
import NodeGeocoder from "node-geocoder";

export async function ingestLocationData(csvFilePath: string) {
  const location: LocationCsvType[] = [];
  let result: LocationCsvType | undefined = undefined;
  const geocoder = NodeGeocoder({
    provider: "google",
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data: LocationCsvType) => {
      if (data.Lat && data.Lng) {
        result = data;

        // push the result obj in array of data
        location.push(result);
      }
    })
    .on("end", async () => {
      for (let i = 0; i < location.length; i++) {
        const data = location[i];
        // convert lat lng to address
        const reverseLocation = await geocoder.reverse({
          lat: Number(data.Lat),
          lon: Number(data.Lng),
        });
        if (reverseLocation.length !== 0) {
          location[i].location = {
            city: reverseLocation[0].city,
            street: reverseLocation[0].streetName,
            country: reverseLocation[0].country,
          };
        }
      }

      // uploading the data
      await Location.insertMany(
        location.map((loc) => {
          return {
            user: { name: loc.UserId },
            lat: loc.Lat,
            lng: loc.Lng,
            alt: loc.Altitude,
            accuracy: loc.Accuracy,
            isRoaming: loc.IsRoaming,
            time: loc.Time,
            location: loc.location,
          };
        })
      );
      // deleting the file
      fs.unlinkSync(csvFilePath);
    });
}
