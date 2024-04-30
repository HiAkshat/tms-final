import mongoose from "mongoose";

export default async function connectToMongoDB(connectionString: string) {
  await mongoose.connect(connectionString);
  console.log("Connect to MongoDB Database!");
}