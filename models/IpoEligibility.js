import mongoose from "mongoose";

const computedEligibilitySchema = new mongoose.Schema(
  {
    yearsInBusiness: { type: Number },
    patCr: { type: Number }, // PAT in Cr
    isEligible: { type: Boolean },
  },
  { _id: false, versionKey: false }
);

const ipoEligibilitySchema = new mongoose.Schema(
  {
    // Optional: capture lead even if user isn’t logged in
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Business details
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyType: {
      type: String,
      enum: [
        "Private Limited",
        "Public Limited",
        "LLP",
        "Partnership",
        "Sole Proprietorship",
      ],
      required: true,
    },

    // Contact
    contactNumber: {
      type: String,
      required: true,
      trim: true,
      // match: /^[6-9]\d{9}$/, // enable if you want strict 10-digit Indian mobile
    },

    // GST
    hasGST: { type: Boolean, required: true },
    gstNumber: { type: String, default: null, trim: true },

    // Financials (Cr)
    lastYearTurnover: { type: Number, required: true }, // in Cr
    lastYearPAT: { type: Number, required: true }, // in Cr

    // NEW: Year of Incorporation
    incorporationYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },

    // NEW: optional snapshot of app-side calculation
    computedEligibility: {
      type: computedEligibilitySchema,
      default: undefined,
    },

    // Meta
    source: { type: String, default: "indiaipoapp" },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Helpful indexes
ipoEligibilitySchema.index({ createdAt: -1 });
ipoEligibilitySchema.index({ contactNumber: 1 });

export const IpoEligibility =
  mongoose.models.IpoEligibility ||
  mongoose.model("IpoEligibility", ipoEligibilitySchema);
