import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URL);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};


