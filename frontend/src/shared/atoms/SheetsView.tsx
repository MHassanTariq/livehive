import { convertTypedDataToSheetData } from "../../store/adapterFunctions";
import { TypedSheets } from "../../store/services/types";
import DataStatsWithPageBtns, { DataStatsProps } from "./DataStatsWithPageBtns";

interface Props {
  sheetData: TypedSheets;
  stats: DataStatsProps;
}

const SheetViews = ({ sheetData, stats }: Props) => {
  const { csvData, keys } = convertTypedDataToSheetData(sheetData);
  function headingTextStyles(index: number) {
    if (index < keys) return `font-bold text-lg`;
    return "";
  }

  return (
    <div className="mt-5">
      <DataStatsWithPageBtns {...stats} />
      <div className={`grid grid-cols-${keys} bg-primary p-1 `}>
        {csvData.map((data, index) => (
          <div
            className="flex justify-center items-center bg-bg_color m-0.5"
            key={index.toString()}
          >
            <p
              className={`text-sm text-text_color p-4 break-words ${headingTextStyles(
                index
              )}`}
            >
              {data}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetViews;
