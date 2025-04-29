import { Router } from "express";

import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  // createCommonForm,
  createCommonFormsTest,
  getSpecificFormData,
  getServiceRequest,
} from "../../controllers/user/userForm/commonFormController/commonForm.controller.js";
import {
  // createCommonDocuments,
  createCommonFormDocument,
} from "../../controllers/user/userForm/commonFormController/commonFormDocument.controller.js";

const router = Router();

router.route("/create-common-form").post(verifyJWT, createCommonFormsTest);
// router.route("/create-common-form-test").post(verifyJWT, createCommonFormsTest);

router.route("/documents-upload").post(
  verifyJWT,
  upload.fields([
    { name: "attachedDocument", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "otherDocument1", maxCount: 1 },
    { name: "otherDocument2", maxCount: 1 },
    { name: "identityCard", maxCount: 1 },
    { name: "bankPassbookFirstCopy", maxCount: 1 },
    { name: "prescribedApplication", maxCount: 1 },
    { name: "originalEligibleMemberApplication", maxCount: 1 },
    { name: "originalEligibleMemberPanCard", maxCount: 1 },
    { name: "originalEligibleMemberAadhaarCard", maxCount: 1 },
    { name: "possessionReceiptOriginalEligibleMember", maxCount: 1 },
    { name: "shareholderCertificateOriginalEligibleMember", maxCount: 1 },
    { name: "eligibilityListOriginalEligibleMembers", maxCount: 1 },
    { name: "oathAffidavitOriginalEligibleMember", maxCount: 1 },
    { name: "institutionNOCOriginalEligibleMember", maxCount: 1 },
    { name: "buyerAadhaar", maxCount: 1 },
    { name: "buyerPan", maxCount: 1 },
    { name: "incomeCertificateForm16", maxCount: 1 },
    { name: "buyerResidenceCertificate", maxCount: 1 },
    { name: "buyerRegisteredDocument", maxCount: 1 },
    { name: "buyerAffidavit", maxCount: 1 },
    { name: "bankStatement", maxCount: 1 },
    { name: "documentsForSigningBankApplication", maxCount: 1 },
    { name: "annexureA_C", maxCount: 1 },
    { name: "scheme", maxCount: 1 },
    { name: "preRegistrationMeetingDraftInstitution", maxCount: 1 },
    { name: "annexure3_4", maxCount: 1 },
    { name: "formASelfDeclaration", maxCount: 1 },
    { name: "voterIDCardElectorList", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 },
    { name: "slumEnumerationForm", maxCount: 1 },
    { name: "propertyTaxReceipt", maxCount: 1 },
    { name: "nonAgriculturalTaxPenaltyReceipt", maxCount: 1 },
    { name: "duplicateGumastaLicense", maxCount: 1 },
    { name: "specifiedApplicationFormat", maxCount: 1 },
    { name: "deathCertificateHusbandWifeSonDaughter", maxCount: 1 },
    { name: "ownVoterIDCard", maxCount: 1 },
    { name: "voterIDFamilyMembers", maxCount: 1 },
    { name: "rationCardNo", maxCount: 1 },
    { name: "certifiedTrueCopyAnnexure2", maxCount: 1 },
    { name: "affidavit", maxCount: 1 },
    { name: "certifiedNOCFromCooperativeHousingSociety", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  createCommonFormDocument
);

router.route("/get-specific-form-data").get(verifyJWT, getSpecificFormData);

router.route("/get-service-request").get(verifyJWT, getServiceRequest);
// router.route("/get-noc-Certified-Copy").get(verifyJWT, getNocCertifiedCopy);
export default router;
