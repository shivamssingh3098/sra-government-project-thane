import mongoose, { Schema } from "mongoose";

const sra_Circular3_ProposalDocs3RemarkSchema = new Schema(
  {
    remark: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "addedByModel",
    },
    addedByModel: {
      type: String,
      required: true,
      enum: ["ADMIN", "DEPARTMENT_MANAGER"],
    },
  },
  {
    timestamps: true,
  }
);

export const SRA_Circular3_ProposalDocs3Remark = mongoose.model(
  "SRA_Circular3_ProposalDocs3Remark",
  sra_Circular3_ProposalDocs3RemarkSchema
);
