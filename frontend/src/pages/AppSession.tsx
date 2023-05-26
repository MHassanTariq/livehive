import { useState } from "react";
import AnalyticsHeader from "../shared/atoms/AnalyticHeader";
import ScreenWithHeader from "../shared/components/ScreenWithHeader";
import { InfoGraphics } from "../store/types";
import SheetsView from "../shared/atoms/SheetsView";
import { appSessionCSV } from "../store/dummyData/appSessionJson";

const AppSession = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [sheetData, setSheetData] = useState(appSessionCSV);

  function onSubmitSearch(search: string) {
    setSheetData(
      appSessionCSV.filter((app) =>
        app.app_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  function renderSheets() {
    if (infoGraphic === InfoGraphics.Sheet)
      return <SheetsView sheetData={{ type: "Apps", data: sheetData }} />;
  }

  return (
    <ScreenWithHeader>
      <AnalyticsHeader
        title="Apps"
        currentInfoGraphic={infoGraphic}
        onSubmitSearch={onSubmitSearch}
        onChangeInfoGraphic={setInfoGraphic}
      />
      {renderSheets()}
    </ScreenWithHeader>
  );
};

export default AppSession;
