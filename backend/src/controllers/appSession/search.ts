import App from "../../models/appModel";
import { Search } from "../../utils.ts/types";

export async function searchAppResults(search: Search) {
  const { keyword, result: result_limit } = search;
  const result = await App.find({
    $or: [
      { "user.name": { $regex: keyword } },
      { app_name: { $regex: keyword } },
    ],
  }).limit(result_limit);
  return result;
}
