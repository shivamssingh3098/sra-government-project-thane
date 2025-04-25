import mongoose, { Schema } from "mongoose";

const nocCertifiedCopyDocumentsSchema = new Schema(
  {
    attachedDocument: {
      type: String,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    otherDocument: {
      type: String,
    },
    submit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const NocCertifiedCopyDocuments = mongoose.model(
  "NocCertifiedCopyDocuments",
  nocCertifiedCopyDocumentsSchema
);
