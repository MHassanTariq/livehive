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

const Location = () => {
  const [infoGraphic, setInfoGraphic] = useState<InfoGraphics>(
    InfoGraphics.Sheet
  );
  const [page, setPage] = useState(0);
  const { data: locationListing, isLoading: isLocationLoading } =
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
    const data = shouldShowSearch ? searchedResults : locationListing;
    if (!data) return;
    if (isSearching) return <Loader />;
    if (infoGraphic === InfoGraphics.Sheet)
      return <SheetsView sheetData={{ type: "Location", data }} />;
  }

  function renderGraphs() {
    if (!locationListing) return;
    if (infoGraphic === InfoGraphics.Graphs) {
      return (
        <GraphsView typedSheet={{ type: "Location", data: locationListing }} />
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
