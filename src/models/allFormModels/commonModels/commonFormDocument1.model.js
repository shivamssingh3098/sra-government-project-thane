import mongoose, { Schema } from "mongoose";

const commonFormDocument1Schema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export const CommonFormDocument1 = mongoose.model(
  "CommonFormDocument1",
  commonFormDocument1Schema
);
