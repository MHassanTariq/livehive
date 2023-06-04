import fs from "fs";
import csv from "csv-parser";
import { WeblinkCsvType } from "../../utils.ts/types";
import App from "../../models/appModel";
import Weblink from "../../models/webLink";

export async function ingestWeblinkData(csvFilePath: string) {
  const weblinkData: WeblinkCsvType[] = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data: WeblinkCsvType) => {
      // caching the data
      if (data.link) {
        weblinkData.push(data);
      }
    })
    .on("end", async () => {
      // uploading the data
      await Weblink.insertMany(
        weblinkData.map((wl) => {
          return {
            user: { name: wl.participant },
            time: wl.time,
            link: wl.link,
            app_name: wl.app_name,
          };
        })
      );
      // deleting the file
      fs.unlinkSync(csvFilePath);
    });
}
