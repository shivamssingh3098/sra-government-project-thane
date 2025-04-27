import mongoose, { Schema } from "mongoose";
import {
  MUNICIPAL_CORPORATIONS,
  DEPARTMENT,
  SERVICES_STATUS,
  CITY_COUNCIL,
  VILLAGE_COUNCIL,
} from "../../../constants.js";
const commonFormSchema = new Schema(
  {
    name: {
      type: String,

      trim: true,
    },
    serviceNumber: {
      type: Number,
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
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    //// yaha se krna h
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
    },
    remark: {
      type: Schema.Types.ObjectId,
      ref: "CommonRemark",
      // here add remark model and update letter when admin or manager will give remark with document
    },

    documents: {
      type: Schema.Types.ObjectId,
      ref: "CertifiedRentDepositCopiesDocuments", // need to change form common
      // required: true,
    },

    applyDate: {
      type: Date,
    },
    phone: {
      type: String,

      trim: true,
    },

    city: {
      type: String,
    },

    address: {
      type: String,
    },
    taluka: {
      type: String,
    },
    village: {
      type: String,
    },

    // area code
    landNumber: {
      // area code
      type: String,
    },
    surveyNo: {
      type: String,
    },
    finalPlot: {
      type: String,
    },

    //

    //
    sectorNo: {
      type: String,
    },
    wardNo: {
      type: String,
    },

    governmentServiceBranch: {
      type: String,
    },

    // other fields
    redevelopmentServicesNo: {
      type: String,
    },
    hutNo: {
      type: String,
    },
    redevelopmentLeavingDate: {
      type: Date,
    },
    apartmentNoShopProvidingDate: {
      type: Date,
    },
    governmentServiceBranchAddress: {
      type: String,
    },
    transferredThroughSaleName: {
      type: String,
    },
    transferredThroughAddressName: {
      type: String,
    },
    srNo: {
      type: String,
    },
    leavingDate: {
      type: Date,
    },
    spouseDeathDate: {
      type: Date,
    },
    competentAuthorityNo: {
      type: String,
    },
    annexure2SrNoInRehabilitationScheme: {
      type: String,
    },
    //  end other fields

    //new
    municipalCorporation: {
      type: String,
      default: "NONE",
      enum: MUNICIPAL_CORPORATIONS,
    },
    cityCouncil: {
      type: String,
      default: "NONE",
      enum: CITY_COUNCIL,
    },
    villageCouncil: {
      type: String,
      default: "NONE",
      enum: VILLAGE_COUNCIL,
    },
    // need to do in all form
    // new end
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
export const CommonServices = mongoose.model(
  "CommonServices",
  commonFormSchema
);

// const commonFormSchemavv = new Schema({
//   //common in every form
//   // name,//
//   serviceNumber,//
//   userId,//
//   applicationId,//
//   paymentDate,//
//   paymentStatus,//
//   maximumDays,////
//   expectingServiceDeliveryDate,//
//   departmentManager,//
//   IsSubmit,//
//   remark,//
//   documents,//
//   applyDate,//
//   phone,//
//   address,//
//   department,//
//   serviceStatus,//

//   //end common in every form

//   schemeDeveloper,//
//   taluka,//
//   city,//
//   village,//
//   areaCode,//
//   surveyNo,//
//   finalPlot,//
//   sectorNo,//
//   wardNo,//
//   governmentServiceBranch,//
//   redevelopmentServicesNo,//
//   hutNo,//
//   redevelopmentLeavingDate,//
//   apartmentNoShopProvidingDate,//
//   governmentServiceBranchAddress,//
//   transferredThroughSaleName,//
//   transferredThroughAddressName,//
//   srNo,//
//   leavingDate,//
//   spouseDeathDate,//
//   competentAuthorityNo,//
//   annexure2SrNoInRehabilitationScheme,//

//   municipalCorporation: {///////
//     type: String,
//     default: "NONE",
//     enum: MUNICIPAL_CORPORATIONS,
//   },
//   cityCouncil: {////
//     type: String,
//     default: "NONE",
//     enum: CITY_COUNCIL,
//   },
//   villageCouncil: {/////
//     type: String,
//     default: "NONE",
//     enum: VILLAGE_COUNCIL,
//   },
// });
