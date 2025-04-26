import mongoose, { Schema } from "mongoose";
import {
  MUNICIPAL_CORPORATIONS,
  DEPARTMENT,
  SERVICES_STATUS,
  CITY_COUNCIL,
  VILLAGE_COUNCIL,
} from "../../../constants.js";
const nocCertifiedCopySchema = new Schema(
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
    IsSubmit: {
      type: Boolean,
      default: false,
    },
    schemeDeveloper: {
      type: String,
      required: true,
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
      ref: "NocCertifiedCopyDocuments",
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
    // area code
    landNumber: {
      type: String,
      //   required: true,
    },
    surveyNo: {
      type: String,
    },
    finalPlot: {
      type: String,
    },

    //

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
    //
    sectorNo: {
      type: String,
      //   required: true,
    },
    wardNo: {
      type: String,
    },
    governmentServiceBranch: {
      // need to add in controller
      type: String,
      required: true,
    },
    municipalCorporation: {
      type: String,
      // required: true,
      enum: MUNICIPAL_CORPORATIONS,
    },
    cityCouncil: {
      type: String,
      // required: true,
      enum: CITY_COUNCIL,
    },
    villageCouncil: {
      type: String,
      // required: true,
      enum: VILLAGE_COUNCIL,
    },
    // need to do in all form
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
export const NocCertifiedCopy = mongoose.model(
  "NocCertifiedCopy",
  nocCertifiedCopySchema
);
