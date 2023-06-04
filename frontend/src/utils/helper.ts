import { DataStatsProps } from "../shared/atoms/DataStatsWithPageBtns";
import { totalPagesPossible } from "../store/services/helper";

export function calculateStats(
  count: number,
  page: number,
  totalCountPerPage: number,
  setPage: (page: number) => void
) {
  const totalPages = totalPagesPossible(count, totalCountPerPage);
  const stats: DataStatsProps = {
    page,
    count: count,
    ...(page > 0 ? { onPrevPage: setPage } : undefined),
    ...(page < totalPages ? { onNextPage: setPage } : undefined),
  };
  return stats;
}
