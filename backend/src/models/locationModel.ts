import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  user: {
    type: Object,
    name: { type: String, required: true },
    email: String,
    required: true,
  },
  lat: Number,
  lng: Number,
  alt: Number,
  accuracy: Number,
  isRoaming: Boolean,
  time: Date,
  location: {
    city: String,
    country: String,
    street: String,
  },
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
