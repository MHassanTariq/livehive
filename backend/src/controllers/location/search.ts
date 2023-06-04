import Location from "../../models/locationModel";
import { Search } from "../../utils.ts/types";

export async function searchLocationResults(search: Search) {
  const { keyword, result: result_limit } = search;
  const result = await Location.find({
    $or: [
      { "location.country": { $regex: keyword } },
      { "location.city": { $regex: keyword } },
      { "user.name": { $regex: keyword } },
    ],
  }).limit(result_limit);
  return result;
}
