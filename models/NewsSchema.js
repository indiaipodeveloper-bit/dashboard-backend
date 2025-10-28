import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    subDescription: {
      type: String,
      required: true,
    },
    categories: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const News = mongoose.model("news", NewsSchema);
