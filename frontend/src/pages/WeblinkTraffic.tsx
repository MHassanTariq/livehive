import { useState } from "react";
import AnalyticsHeader from "../shared/atoms/AnalyticHeader";
import ScreenWithHeader from "../shared/components/ScreenWithHeader";
import { InfoGraphics } from "../store/services/types";
import SheetsView from "../shared/atoms/SheetsView";
import {
  useGetWebLinkListingQuery,
  useSearchWeblinkMutation,
} from "../store/services/createApi";
import GraphsView from "../shared/atoms/GraphsView";
import { Loader } from "../shared/atoms/Loader";
import { calculateStats } from "../utils/helper";
import { DEFAULT_PAGINATION_LIMIT } from "../store/services/helper";

const WeblinkTraffic = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [page, setPage] = useState(0);
  const { data: response, isLoading: isWeblinkLoading } =
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
    const data = shouldShowSearch ? searchedResults : response?.data;
    const count =
      (shouldShowSearch ? searchedResults?.length : response?.count) ?? 0;
    if (!data) return;
    if (isSearching) return <Loader />;
    if (infoGraphic !== InfoGraphics.Sheet) return;

    // calculate stats
    const stats = calculateStats(
      count,
      page,
      DEFAULT_PAGINATION_LIMIT,
      setPage
    );
    return <SheetsView sheetData={{ type: "Weblink", data }} stats={stats} />;
  }

  function renderGraphs() {
    if (!response) return;
    if (infoGraphic === InfoGraphics.Graphs) {
      return (
        <GraphsView typedSheet={{ type: "Weblink", data: response.data }} />
      );
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
