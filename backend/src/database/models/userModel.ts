import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: String,
});

const User = mongoose.model("User", UserSchema);
export default User;
