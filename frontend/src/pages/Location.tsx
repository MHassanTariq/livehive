import { useState } from "react";
import AnalyticsHeader from "../shared/atoms/AnalyticHeader";
import ScreenWithHeader from "../shared/components/ScreenWithHeader";
import { InfoGraphics } from "../store/services/types";
import SheetsView from "../shared/atoms/SheetsView";
import GraphsView from "../shared/atoms/GraphsView";
import {
  useGetLocationListingQuery,
  useSearchLocationMutation,
} from "../store/services/createApi";
import { Loader } from "../shared/atoms/Loader";
import { DEFAULT_PAGINATION_LIMIT } from "../store/services/helper";
import { calculateStats } from "../utils/helper";

const Location = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [page, setPage] = useState(0);
  const { data: response, isLoading: isLocationLoading } =
    useGetLocationListingQuery({ offset: page });
  const [
    fetchSearchResults,
    { data: searchedResults, isLoading: isSearching },
  ] = useSearchLocationMutation();
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
    return <SheetsView sheetData={{ type: "Location", data }} stats={stats} />;
  }

  function renderGraphs() {
    if (!response?.data) return;
    if (infoGraphic === InfoGraphics.Graphs) {
      return (
        <GraphsView typedSheet={{ type: "Location", data: response.data }} />
      );
    }
  }

  return (
    <ScreenWithHeader isLoading={isLocationLoading}>
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
