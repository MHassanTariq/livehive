import mongoose from "mongoose";

const WeblinkSchema = new mongoose.Schema({
  user_id: String,
  package_name: String,
  app_name: String,
  timestamp: Number,
  link: String,
});

const Weblink = mongoose.model("Weblink", WeblinkSchema);
export default Weblink;
