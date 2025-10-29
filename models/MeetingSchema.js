import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: { type: String },
    email: { type: String },

    startAt: { type: Date, required: true }, // UTC instant
    timezone: { type: String, default: "Asia/Kolkata" },

    durationMin: { type: Number, default: 30 },
    amountINR: { type: Number, default: 2000 },

    status: {
      type: String,
      enum: ["scheduled", "cancelled"],
      default: "scheduled",
    },

    // Optional labels sent by client (debug/analytics)
    dateLabel: String,
    timeLabel: String,
  },
  { timestamps: true }
);

export const Meetings = mongoose.model("meetings", meetingSchema);
