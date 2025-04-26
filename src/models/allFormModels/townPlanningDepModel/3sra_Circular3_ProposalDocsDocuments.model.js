import mongoose, { Schema } from "mongoose";

const sra_Circular3_ProposalDocsDocumentSchema = new Schema(
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
    IsSubmit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const Sra_Circular3_ProposalDocsDocument = mongoose.model(
  "Sra_Circular3_ProposalDocsDocument",
  sra_Circular3_ProposalDocsDocumentSchema
);
