import { useState } from "react";
import AnalyticsHeader from "../shared/atoms/AnalyticHeader";
import ScreenWithHeader from "../shared/components/ScreenWithHeader";
import { InfoGraphics } from "../store/types";
import SheetsView from "../shared/atoms/SheetsView";
import { locationCSV } from "../store/dummyData/locationJson";
import GraphsView from "../shared/atoms/GraphsView";

const Location = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [sheetData, setSheetData] = useState(locationCSV);

  function onSubmitSearch(search: string) {
    setSheetData(
      locationCSV.filter((location) =>
        location.userId.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  function renderSheets() {
    if (infoGraphic === InfoGraphics.Sheet)
      return <SheetsView sheetData={{ type: "Location", data: sheetData }} />;
  }

  function renderGraphs() {
    if (infoGraphic === InfoGraphics.Graphs) {
      return <GraphsView sheetData={{ type: "Location", data: sheetData }} />;
    }
  }

  return (
    <ScreenWithHeader>
      <AnalyticsHeader
        title="Location"
        currentInfoGraphic={infoGraphic}
        onSubmitSearch={onSubmitSearch}
        onChangeInfoGraphic={setInfoGraphic}
      />
      {renderSheets()}
      {renderGraphs()}
    </ScreenWithHeader>
  );
};

export default Location;
