import { useState } from "react";
import AnalyticsHeader from "../shared/atoms/AnalyticHeader";
import ScreenWithHeader from "../shared/components/ScreenWithHeader";
import { InfoGraphics } from "../store/services/types";
import SheetsView from "../shared/atoms/SheetsView";
import {
  useGetAppSessionListingQuery,
  useSearchAppSessionMutation,
} from "../store/services/createApi";
import GraphsView from "../shared/atoms/GraphsView";
import { Loader } from "../shared/atoms/Loader";

const AppSession = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [page, setPage] = useState(0);
  const { data: appSession, isLoading: isAppSessionloading } =
    useGetAppSessionListingQuery({ offset: page });
  const [
    fetchSearchResults,
    { data: searchedResults, isLoading: isSearching },
  ] = useSearchAppSessionMutation();
  const [shouldShowSearch, setShouldShowSearch] = useState(false);

  // logical functions
  function onSubmitSearch(search: string) {
    if (search) setShouldShowSearch(true);
    else setShouldShowSearch(false);
    fetchSearchResults({ keyword: search });
  }

  // render functions
  function renderSheets() {
    const data = shouldShowSearch ? searchedResults : appSession;
    if (!data) return;
    if (isSearching) return <Loader />;
    if (infoGraphic === InfoGraphics.Sheet)
      return <SheetsView sheetData={{ type: "Apps", data }} />;
  }

  function renderGraphs() {
    if (!appSession) return;
    if (infoGraphic === InfoGraphics.Graphs) {
      return <GraphsView typedSheet={{ type: "Apps", data: appSession }} />;
    }
  }

  return (
    <ScreenWithHeader isLoading={isAppSessionloading}>
      <AnalyticsHeader
        title="Apps"
        currentInfoGraphic={infoGraphic}
        onSubmitSearch={onSubmitSearch}
        onChangeInfoGraphic={setInfoGraphic}
      />
      {renderSheets()}
      {renderGraphs()}
    </ScreenWithHeader>
  );
};

export default AppSession;
