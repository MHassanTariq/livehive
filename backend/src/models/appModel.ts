import mongoose from "mongoose";

const AppSchema = new mongoose.Schema({
  user_id: String,
  package_name: String,
  app_name: String,
  start_time: Number,
  end_time: Number,
  duration: Number,
});

const App = mongoose.model("AppUsage", AppSchema);
export default App;
