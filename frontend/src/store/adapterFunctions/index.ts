import { GraphData, SheetData, TypedSheets } from "../services/types";
import {
  convertAppSessionCSVToGraphData,
  convertAppSessionCSVToSheetData,
} from "./appSessionAdapter";
import { convertLocationCSVToSheetData } from "./locationAdapter";
import { convertWeblinkCSVToSheetData } from "./weblinkAdapter";

export function convertTypedDataToSheetData(
  typedSheet: TypedSheets
): SheetData {
  switch (typedSheet.type) {
    case "Apps":
      return convertAppSessionCSVToSheetData(typedSheet.data);
    case "Location":
      return convertLocationCSVToSheetData(typedSheet.data);
    case "Weblink":
      return convertWeblinkCSVToSheetData(typedSheet.data);
  }
}

export function convertTypedDataToGraphData(
  typedSheet: TypedSheets
): GraphData {
  switch (typedSheet.type) {
    case "Apps":
      return convertAppSessionCSVToGraphData(typedSheet.data);
    case "Location":
      // TODO: Change this:
      return { labels: [], data: [], headers: { x: "Loading...", y: "" } };
    case "Weblink":
      // TODO: Change this:
      return { labels: [], data: [], headers: { x: "Loading...", y: "" } };
  }
}
