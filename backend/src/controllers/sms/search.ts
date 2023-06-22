import SmsModel from "../../models/smsModel";
import { Search } from "../../utils.ts/types";

export async function searchSmsResults(search: Search) {
  const { keyword, result: result_limit } = search;
  const result = await SmsModel.find({
    $or: [{ "user.name": { $regex: keyword } }, { link: { $regex: keyword } }],
  }).limit(result_limit);
  return result;
}
