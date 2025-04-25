import mongoose, { Schema } from "mongoose";
import {
  MUNICIPAL_CORPORATIONS,
  DEPARTMENT,
  SERVICES_STATUS,
} from "../../../constants.js";
const certifiedRentDepositCopiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    applicationId: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    maximumDays: {
      type: Number,
      required: true,
    },
    expectingServiceDeliveryDate: {
      type: Date,
      required: true,
    },
    departmentManager: {
      type: String,
      required: true,
    },
    submit: {
      type: Boolean,
      default: false,
    },
    remark: {
      type: Schema.Types.ObjectId,
      ref: "NocRemark",
      // here add remark model and update letter when admin or manager will give remark with document
    },

    attachedDocument: {
      type: String,
    },

    documents: {
      type: Schema.Types.ObjectId,
      ref: "CertifiedRentDepositCopiesDocuments",
      // required: true,
    },

    applyDate: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },
    landNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    taluka: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    sectorNo: {
      type: String,
      required: true,
    },
    governmentServiceBranch: {
      // need to add in controller
      type: String,
      required: true,
    },
    municipalCorporation: {
      type: String,
      required: true,
      enum: MUNICIPAL_CORPORATIONS,
    },
    department: {
      type: String,
      required: true,
      enum: DEPARTMENT,
    },
    serviceStatus: {
      type: String,
      required: true,
      default: "PENDING",
      enum: SERVICES_STATUS,
    },
  },
  {
    timestamps: true,
  }
);
export const CertifiedRentDepositCopies2 = mongoose.model(
  "CertifiedRentDepositCopies2",
  certifiedRentDepositCopiesSchema
);
