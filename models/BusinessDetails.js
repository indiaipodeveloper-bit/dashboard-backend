import mongoose, { mongo } from "mongoose";

const businessDetails = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      unique: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export const Business = mongoose.model("business",businessDetails);
