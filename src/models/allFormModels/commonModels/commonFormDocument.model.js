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
  // {
  //   documentCount: {
  //     type: Number,
  //     default: 0,
  //   },
  //   attachedDocument: {
  //     type: String,
  //   },
  //   aadharCard: {
  //     type: String,
  //     //   required: true,
  //   },
  //   panCard: {
  //     type: String,
  //     //   required: true,
  //   },
  //   signature: {
  //     type: String,
  //     //   required: true,
  //   },
  //   otherDocument1: {
  //     type: String,
  //   },
  //   otherDocument2: {
  //     type: String,
  //   },
  //   IsSubmit: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   serviceNumber: {
  //     type: Number,
  //   },

  //   identityCard: { type: String },
  //   signature: { type: String },

  //   bankPassbookFirstCopy: { type: String },
  //   prescribedApplication: { type: String },

  //   originalEligibleMemberApplication: { type: String },
  //   originalEligibleMemberPanCard: { type: String },
  //   originalEligibleMemberAadhaarCard: { type: String },
  //   possessionReceiptOriginalEligibleMember: { type: String },
  //   shareholderCertificateOriginalEligibleMember: { type: String },
  //   eligibilityListOriginalEligibleMembers: { type: String },
  //   oathAffidavitOriginalEligibleMember: { type: String },
  //   institutionNOCOriginalEligibleMember: { type: String },
  //   buyerAadhaarPanCard: { type: String },
  //   incomeCertificateForm16: { type: String },
  //   buyerResidenceCertificate: { type: String },
  //   buyerRegisteredDocument: { type: String },
  //   buyerAffidavit: { type: String },
  //   bankStatement: { type: String },
  //   documentsForSigningBankApplication: { type: String },
  //   annexureA_C: { type: String },
  //   scheme: { type: String },
  //   preRegistrationMeetingDraftInstitution: { type: String },
  //   annexure3_4: { type: String },
  //   formASelfDeclaration: { type: String },
  //   voterIDCardElectorList: { type: String },
  //   electricityBill: { type: String },
  //   slumEnumerationForm: { type: String },
  //   propertyTaxReceipt: { type: String },
  //   nonAgriculturalTaxPenaltyReceipt: { type: String },
  //   duplicateGumastaLicense: { type: String },
  //   specifiedApplicationFormat: { type: String },
  //   deathCertificateHusbandWifeSonDaughter: { type: String },
  //   ownVoterIDCard: { type: String },
  //   voterIDFamilyMembers: { type: String },
  //   rationCardNo: { type: String },
  //   certifiedTrueCopyAnnexure2: { type: String },
  //   affidavit: { type: String },
  //   certifiedNOCFromCooperativeHousingSociety: { type: String },
  // },
  // {
  //   timestamps: true,
  // }
);
export const CommonFormDocument = mongoose.model(
  "CommonFormDocument",
  commonFormDocumentSchema
);
