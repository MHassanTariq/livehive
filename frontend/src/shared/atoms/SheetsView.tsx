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

  const gridStyles = `grid grid-cols-${keys} bg-primary p-1`;
  return (
    <div className="mt-5">
      <div className={gridStyles}>
        {csvData.map((data, index) => (
          <div
            className="flex justify-center items-center bg-bg_color m-0.5"
            key={index.toString()}
          >
            <p
              className={`text-base text-text_color p-4 ${headingTextStyles(
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
