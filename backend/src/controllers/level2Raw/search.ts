import Weblink from "../../models/webLink";
import { Search } from "../../utils.ts/types";

export async function searchLevel2RawData(search: Search) {
  const { keyword, result: result_limit } = search;
  const result = await Weblink.find({
    $or: [{ "user.name": { $regex: keyword } }, { link: { $regex: keyword } }],
  }).limit(result_limit);
  return result;
}
