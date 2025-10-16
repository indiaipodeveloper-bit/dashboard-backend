import mongoose from "mongoose";

const FinancialDetails = new mongoose.Schema({
  gstNumber: {
    type: String,
    required: true,
    unique: true,
  },

  turnOverYear: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },

  turnOver: {
    type: String,
    required: true,
  },

  patYear: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },

  PAT: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
},{timestamps:true});

export const Financials = mongoose.model("financials",FinancialDetails);
