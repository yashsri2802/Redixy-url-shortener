import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  id: { type: Number },
  url: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
});

export const urls = mongoose.model("url", urlSchema);
