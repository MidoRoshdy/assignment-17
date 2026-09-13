import mongoose from "mongoose";
import { env } from "./env.service";

export const connectDB = async () => {
  if (!env.mongodbUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(env.mongodbUri);
  console.log("MongoDB connected");
};
