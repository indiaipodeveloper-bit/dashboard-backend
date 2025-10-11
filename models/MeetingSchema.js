import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    fees: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export const Meetings = mongoose.model("meetings",meetingSchema);

