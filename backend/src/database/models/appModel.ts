import mongoose from "mongoose";

export type AppSessionCSV = {
  participant: string;
  app_package: string;
  app_name: string;
  start_time: string;
  end_time: string;
  duration: string;
};

const AppSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  app_package: String,
  app_name: String,
  start_time: String,
  end_time: String,
  duration: String,
});

const App = mongoose.model("App", AppSchema);
export default App;
