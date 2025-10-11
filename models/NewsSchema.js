import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    subdescription: {
      type: String,
      required: true,
    },
    categories: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const News = mongoose.model("news",NewsSchema);

