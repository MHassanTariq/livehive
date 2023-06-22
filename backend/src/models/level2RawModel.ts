import mongoose from "mongoose";

const level2RawModel = new mongoose.Schema({
  user_id: String,
  package_name: String,
  app_name: String,
  raw_string: String,
  timestamp: Number,
});

const Level2RawModel = mongoose.model("SmsData", level2RawModel);
export default Level2RawModel;
