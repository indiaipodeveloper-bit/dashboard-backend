import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    isActive: {
      type: Boolean,
      default:true
    },
    image: {
      type: String,
      default:null
    },

  },
  { timestamps: true }
);

export const User = mongoose.model("users",UserSchema);

