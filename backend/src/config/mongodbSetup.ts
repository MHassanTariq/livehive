import mongoose from "mongoose";

export async function setupMongoDB(mongoConnectionString: string) {
  await mongoose.connect(mongoConnectionString);
  console.log("[server] Mongo DB has been connected");
}
