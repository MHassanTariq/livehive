import App from "../../models/appModel";
import { TrendQuery } from "../../utils.ts/types";

export type AppSessionTrendType = "Duration" | "Opened";

export type AppSessionTrend = {
  type: AppSessionTrendType;
} & TrendQuery;

export type TrendResponse = {
  _id: string;
  count: number;
};

export async function calculateAppSessionTrends(
  appSessionTrend: AppSessionTrend
): Promise<TrendResponse[]> {
  const {
    type,
    end_date: endDate,
    start_date: startDate,
    trend_of_results: trendOfApps,
  } = appSessionTrend;

  let sum: number | string = "$duration";
  if (type === "Opened") {
    sum = 1;
  } else if (type === "Duration") {
    sum = "$duration";
  }

  const dbQuery: TrendResponse[] = await App.aggregate([
    {
      $match: {
        start_time: {
          $lte: endDate,
          $gt: startDate,
        },
      },
    },
    {
      $group: {
        _id: "$app_name",
        count: { $sum: sum },
      },
    },
  ])
    .sort({ count: "desc" })
    .limit(trendOfApps);
  return dbQuery;
}
