import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lat: Number,
  lng: Number,
  accuracy: Number,
  isRoaming: Boolean,
  time: String,
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
