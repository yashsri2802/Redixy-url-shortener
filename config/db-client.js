import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    const mongoURL =
      process.env.NODE_ENV === "production"
        ? env.MONGODB_URL_PROD
        : env.MONGODB_URL;
    await mongoose.connect(mongoURL).then(() => console.log("Connected to MongoDB"));
    console.log(
      `Connected to MongoDB (${
        process.env.NODE_ENV === "production"
          ? "Atlas (Production)"
          : "Local (Development)"
      })`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
