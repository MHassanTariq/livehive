import fs from "fs";
import csv from "csv-parser";
import { AppCsvType } from "../../utils.ts/types";
import App from "../../models/appModel";

export async function ingestAppData(csvFilePath: string) {
  const appData: AppCsvType[] = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data: AppCsvType) => {
      if (data.app_name) {
        appData.push(data);
      }
    })
    .on("end", async () => {
      // uploading the data
      await App.insertMany(
        appData.map((app) => {
          return {
            user: { name: app.participant },
            app_package: app.app_package,
            app_name: app.app_name,
            duration: app.duration,
            start_time: app.start_time,
            end_time: app.end_time,
          };
        })
      );
      // deleting the file
      fs.unlinkSync(csvFilePath);
    });
}
