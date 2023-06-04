import mongoose from "mongoose";

const WeblinkSchema = new mongoose.Schema({
  user: {
    type: Object,
    name: { type: String, required: true },
    email: String,
    required: true,
  },
  app_name: String,
  time: Date,
  link: String,
});

const Weblink = mongoose.model("Weblink", WeblinkSchema);
export default Weblink;
