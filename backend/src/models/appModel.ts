import mongoose from "mongoose";

const AppSchema = new mongoose.Schema({
  user: {
    type: Object,
    name: { type: String, required: true },
    email: String,
    required: true,
  },
  app_package: String,
  app_name: String,
  start_time: Date,
  end_time: Date,
  duration: Number,
});

const App = mongoose.model("App", AppSchema);
export default App;
