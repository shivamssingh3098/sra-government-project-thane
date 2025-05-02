import mongoose, { Schema } from "mongoose";

const commonFormDocumentSchema = new Schema(
  {
    documentList: [
      {
        type: Map, // Map allows key-value pairs dynamically
        of: String, // value will always be a String (URL)
      },
    ],
    IsSubmit: {
      type: Boolean,
      default: false,
    },
    serviceNumber: {
      type: Number,
    },
    documentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export const CommonFormDocument = mongoose.model(
  "CommonFormDocument",
  commonFormDocumentSchema
);
