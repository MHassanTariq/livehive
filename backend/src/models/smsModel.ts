import mongoose from "mongoose";

const SMSSchema = new mongoose.Schema({
  user_id: String,
  origin: String,
  content: String,
  timestamp: Number,
});

const SmsModel = mongoose.model("sms", SMSSchema);
export default SmsModel;
