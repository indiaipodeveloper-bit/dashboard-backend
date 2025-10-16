import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    adminRole: {
      type: String,
      enum: ["SuperAdmin", "Admin"],
      default: "admin",
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Admins = mongoose.model("admins", AdminSchema);
