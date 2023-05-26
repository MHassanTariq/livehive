import { SheetData, TypedSheets } from "../types";
import { convertAppSessionCSVToSheetData } from "./appSessionAdapter";
import { convertLocationCSVToSheetData } from "./locationAdapter";

export function convertTypedDataToSheetData(
  typedSheet: TypedSheets
): SheetData {
  switch (typedSheet.type) {
    case "Apps":
      return convertAppSessionCSVToSheetData(typedSheet.data);
    case "Location":
      return convertLocationCSVToSheetData(typedSheet.data);
  }
}
