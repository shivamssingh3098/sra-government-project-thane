import mongoose, { Schema } from "mongoose";

const remarkNocSchema = new Schema(
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

export const NocRemark = mongoose.model("NocRemark", remarkNocSchema);
