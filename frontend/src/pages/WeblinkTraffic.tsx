import { useState } from "react";
import AnalyticsHeader from "../shared/atoms/AnalyticHeader";
import ScreenWithHeader from "../shared/components/ScreenWithHeader";
import { InfoGraphics } from "../store/services/types";
import SheetsView from "../shared/atoms/SheetsView";
import {
  useGetAppSessionListingQuery,
  useGetWebLinkListingQuery,
  useSearchWeblinkMutation,
} from "../store/services/createApi";
import GraphsView from "../shared/atoms/GraphsView";
import { Loader } from "../shared/atoms/Loader";

const WeblinkTraffic = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [page, setPage] = useState(0);
  const { data: weblink, isLoading: isWeblinkLoading } =
    useGetWebLinkListingQuery({ offset: page });
  const [
    fetchSearchResults,
    { data: searchedResults, isLoading: isSearching },
  ] = useSearchWeblinkMutation();
  const [shouldShowSearch, setShouldShowSearch] = useState(false);

  // logical functions
  function onSubmitSearch(search: string) {
    if (search) setShouldShowSearch(true);
    else setShouldShowSearch(false);
    fetchSearchResults({ keyword: search });
  }

  // render functions
  function renderSheets() {
    const data = shouldShowSearch ? searchedResults : weblink;
    if (!data) return;
    if (isSearching) return <Loader />;
    if (infoGraphic === InfoGraphics.Sheet)
      return <SheetsView sheetData={{ type: "Weblink", data }} />;
  }

  function renderGraphs() {
    if (!weblink) return;
    if (infoGraphic === InfoGraphics.Graphs) {
      return <GraphsView typedSheet={{ type: "Weblink", data: weblink }} />;
    }
  }

  return (
    <ScreenWithHeader isLoading={isWeblinkLoading}>
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

export default WeblinkTraffic;
