import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  user_id: String,
  lat: Number,
  lng: Number,
  alt: Number,
  accuracy: Number,
  isRoaming: Boolean,
  time: Number,
  location: {
    city: String,
    country: String,
    street: String,
  },
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
