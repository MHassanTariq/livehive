import { convertTypedDataToSheetData } from "../../store/adapterFunctions";
import { TypedSheets } from "../../store/types";

interface Props {
  sheetData: TypedSheets;
}

const SheetViews = ({ sheetData }: Props) => {
  const { csvData, keys } = convertTypedDataToSheetData(sheetData);

  function headingTextStyles(index: number) {
    if (index < keys) return `font-bold text-lg`;
    return "";
  }

  return (
    <div className="mt-5">
      <div className={`grid grid-cols-${keys} gap-1 bg-primary p-1`}>
        {csvData.map((data, index) => (
          <div
            className="flex justify-center items-center bg-bg_color"
            key={index.toString()}
          >
            <p
              className={`text-base text-text_color ${headingTextStyles(
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
