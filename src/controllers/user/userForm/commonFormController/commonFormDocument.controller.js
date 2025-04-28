import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";
import { CommonFormDocument } from "../../../../models/allFormModels/commonModels/commonFormDocument.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
import { uploadFiles } from "../../../../utils/fileValidation.js";
import { CommonFormDocument1 } from "../../../../models/allFormModels/commonModels/commonFormDocument1.model.js"; // adjust path

export const createCommonDocuments = asyncHandler(async (req, res) => {
  try {
    const _id = req.query.formId;
    const serviceNumber = Number(req.body.serviceNumber);
    console.log("req. req.query", req.query);

    if (serviceNumber >= 1 && serviceNumber <= 7) {
      console.log("Service 1 selected", serviceNumber);

      console.log("req.files", req.files);
      // const _id = req.query.formId;

      if (!_id) {
        throw new ApiError(500, "form id is mandatory");
      }

      const REQUIRED_FILE_FIELDS = ["identityCard", "signature"];
      // if (!req.body.remark) {
      //   throw new ApiError(500, "Remark is mandatory");
      // }
      const missingFields = REQUIRED_FILE_FIELDS.filter(
        (field) => !req.files?.[field]
      );

      if (missingFields.length > 0) {
        throw new ApiError(
          400,
          `Missing required file(s): ${missingFields.join(", ")}`
        );
      }
      let otherDocument1 = "";
      if (req.files?.otherDocument1) {
        otherDocument1 = await uploadOnCloudinary(
          req.files?.otherDocument1[0]?.path
        );
      }

      let otherDocument2 = "";
      if (req.files?.otherDocument2) {
        otherDocument2 = await uploadOnCloudinary(
          req.files?.otherDocument2[0]?.path
        );
      }

      const identityCard = await uploadOnCloudinary(
        req.files?.identityCard[0]?.path
      );

      const signature = await uploadOnCloudinary(req.files?.signature[0]?.path);

      const createdCommonFormDocument = await CommonFormDocument.create({
        identityCard: identityCard?.url,
        serviceNumber: serviceNumber,
        signature: signature?.url,
        otherDocument1: otherDocument1?.url,
        otherDocument2: otherDocument2?.url,
        IsSubmit: true,
      });

      if (!createdCommonFormDocument) {
        throw new ApiError(
          500,
          "Something went wrong while creating the document"
        );
      }
      const updateNoc = await CommonServices.findByIdAndUpdate(_id, {
        documents: createdCommonFormDocument._id,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            createdCommonFormDocument,
            " Document created successfully"
          )
        );
    } else if (serviceNumber === 8) {
      console.log("Service  selected", serviceNumber);

      console.log("req.files", req.files);
      // const _id = req.query.formId;

      if (!_id) {
        throw new ApiError(500, "form id is mandatory");
      }

      const REQUIRED_FILE_FIELDS = [
        "identityCard",
        "signature",
        "bankPassbookFirstCopy",
        "prescribedApplication",
      ];
      // if (!req.body.remark) {
      //   throw new ApiError(500, "Remark is mandatory");
      // }
      const missingFields = REQUIRED_FILE_FIELDS.filter(
        (field) => !req.files?.[field]
      );

      if (missingFields.length > 0) {
        throw new ApiError(
          400,
          `Missing required file(s): ${missingFields.join(", ")}`
        );
      }
      let otherDocument1 = "";
      if (req.files?.otherDocument1) {
        otherDocument1 = await uploadOnCloudinary(
          req.files?.otherDocument1[0]?.path
        );
      }

      let otherDocument2 = "";
      if (req.files?.otherDocument2) {
        otherDocument2 = await uploadOnCloudinary(
          req.files?.otherDocument2[0]?.path
        );
      }

      const identityCard = await uploadOnCloudinary(
        req.files?.identityCard[0]?.path
      );

      const signature = await uploadOnCloudinary(req.files?.signature[0]?.path);
      const bankPassbookFirstCopy = await uploadOnCloudinary(
        req.files?.bankPassbookFirstCopy[0]?.path
      );
      const prescribedApplication = await uploadOnCloudinary(
        req.files?.prescribedApplication[0]?.path
      );

      const createdCommonFormDocument = await CommonFormDocument.create({
        identityCard: identityCard?.url,
        serviceNumber: serviceNumber,
        signature: signature?.url,
        otherDocument1: otherDocument1?.url,
        otherDocument2: otherDocument2?.url,
        bankPassbookFirstCopy: bankPassbookFirstCopy?.url,
        prescribedApplication: prescribedApplication?.url,

        IsSubmit: true,
      });

      if (!createdCommonFormDocument) {
        throw new ApiError(
          500,
          "Something went wrong while creating the document"
        );
      }
      const updateNoc = await CommonServices.findByIdAndUpdate(_id, {
        documents: createdCommonFormDocument._id,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            createdCommonFormDocument,
            " Document created successfully"
          )
        );
    } else if (serviceNumber >= 9 && serviceNumber <= 22) {
      console.log(
        "Service  selected serviceNumber >= 9 && serviceNumber <= 22",
        serviceNumber
      );
      // -------------------------------working on this --------------------
      console.log("req.files", req.files);
      // const _id = req.query.formId;

      if (!_id) {
        throw new ApiError(500, "form id is mandatory");
      }
      // /// bad me krunga jab sara kam ho jayega tab required document pe validation lagaunga
      // const REQUIRED_FILE_FIELDS = [
      //   "identityCard",
      //   "signature",
      //   "bankPassbookFirstCopy",
      //   "prescribedApplication",
      // ];
      // // if (!req.body.remark) {
      // //   throw new ApiError(500, "Remark is mandatory");
      // // }
      // const missingFields = REQUIRED_FILE_FIELDS.filter(
      //   (field) => !req.files?.[field]
      // );

      // if (missingFields.length > 0) {
      //   throw new ApiError(
      //     400,
      //     `Missing required file(s): ${missingFields.join(", ")}`
      //   );
      // }
      // ///end =>  bad me krunga jab sara kam ho jayega tab required document pe validation lagaunga

      // let otherDocument1 = "";
      // if (req.files?.otherDocument1) {
      //   otherDocument1 = await uploadOnCloudinary(
      //     req.files?.otherDocument1[0]?.path
      //   );
      // }

      // let otherDocument2 = "";
      // if (req.files?.otherDocument2) {
      //   otherDocument2 = await uploadOnCloudinary(
      //     req.files?.otherDocument2[0]?.path
      //   );
      // }

      // const identityCard = await uploadOnCloudinary(
      //   req.files?.identityCard[0]?.path
      // );

      // const signature = await uploadOnCloudinary(req.files?.signature[0]?.path);
      // const bankPassbookFirstCopy = await uploadOnCloudinary(
      //   req.files?.bankPassbookFirstCopy[0]?.path
      // );
      // const prescribedApplication = await uploadOnCloudinary(
      //   req.files?.prescribedApplication[0]?.path
      // );
      const { uploadedFiles, documentCount } = await uploadFiles(req.files);
      console.log("uploadedFiles", uploadedFiles);

      const createdCommonFormDocument = await CommonFormDocument.create({
        documentCount: documentCount,
        serviceNumber: serviceNumber,
        attachedDocument: uploadedFiles?.attachedDocument?.url,
        aadharCard: uploadedFiles?.aadharCard?.url,
        panCard: uploadedFiles?.panCard?.url,
        signature: uploadedFiles?.signature?.url,
        otherDocument1: uploadedFiles?.otherDocument1?.url,
        otherDocument2: uploadedFiles?.otherDocument2?.url,
        identityCard: uploadedFiles?.identityCard?.url,
        bankPassbookFirstCopy: uploadedFiles?.bankPassbookFirstCopy?.url,
        prescribedApplication: uploadedFiles?.prescribedApplication?.url,
        originalEligibleMemberApplication:
          uploadedFiles?.originalEligibleMemberApplication?.url,
        originalEligibleMemberPanCard:
          uploadedFiles?.originalEligibleMemberPanCard?.url,
        originalEligibleMemberAadhaarCard:
          uploadedFiles?.originalEligibleMemberAadhaarCard?.url,
        possessionReceiptOriginalEligibleMember:
          uploadedFiles?.possessionReceiptOriginalEligibleMember?.url,
        shareholderCertificateOriginalEligibleMember:
          uploadedFiles?.shareholderCertificateOriginalEligibleMember?.url,
        eligibilityListOriginalEligibleMembers:
          uploadedFiles?.eligibilityListOriginalEligibleMembers?.url,
        oathAffidavitOriginalEligibleMember:
          uploadedFiles?.oathAffidavitOriginalEligibleMember?.url,
        institutionNOCOriginalEligibleMember:
          uploadedFiles?.institutionNOCOriginalEligibleMember?.url,
        buyerAadhaarPanCard: uploadedFiles?.buyerAadhaarPanCard?.url,
        incomeCertificateForm16: uploadedFiles?.incomeCertificateForm16?.url,
        buyerResidenceCertificate:
          uploadedFiles?.buyerResidenceCertificate?.url,
        buyerRegisteredDocument: uploadedFiles?.buyerRegisteredDocument?.url,
        buyerAffidavit: uploadedFiles?.buyerAffidavit?.url,
        bankStatement: uploadedFiles?.bankStatement?.url,
        documentsForSigningBankApplication:
          uploadedFiles?.documentsForSigningBankApplication?.url,
        annexureA_C: uploadedFiles?.annexureA_C?.url,
        scheme: uploadedFiles?.scheme?.url,
        preRegistrationMeetingDraftInstitution:
          uploadedFiles?.preRegistrationMeetingDraftInstitution?.url,
        annexure3_4: uploadedFiles?.annexure3_4?.url,
        formASelfDeclaration: uploadedFiles?.formASelfDeclaration?.url,
        voterIDCardElectorList: uploadedFiles?.voterIDCardElectorList?.url,
        electricityBill: uploadedFiles?.electricityBill?.url,
        slumEnumerationForm: uploadedFiles?.slumEnumerationForm?.url,
        propertyTaxReceipt: uploadedFiles?.propertyTaxReceipt?.url,
        nonAgriculturalTaxPenaltyReceipt:
          uploadedFiles?.nonAgriculturalTaxPenaltyReceipt?.url,
        duplicateGumastaLicense: uploadedFiles?.duplicateGumastaLicense?.url,
        specifiedApplicationFormat:
          uploadedFiles?.specifiedApplicationFormat?.url,
        deathCertificateHusbandWifeSonDaughter:
          uploadedFiles?.deathCertificateHusbandWifeSonDaughter?.url,
        ownVoterIDCard: uploadedFiles?.ownVoterIDCard?.url,
        voterIDFamilyMembers: uploadedFiles?.voterIDFamilyMembers?.url,
        rationCardNo: uploadedFiles?.rationCardNo?.url,
        certifiedTrueCopyAnnexure2:
          uploadedFiles?.certifiedTrueCopyAnnexure2?.url,
        affidavit: uploadedFiles?.affidavit?.url,
        certifiedNOCFromCooperativeHousingSociety:
          uploadedFiles?.certifiedNOCFromCooperativeHousingSociety?.url,

        IsSubmit: true,
      });

      if (!createdCommonFormDocument) {
        throw new ApiError(
          500,
          "Something went wrong while creating the document"
        );
      }
      const updateNoc = await CommonServices.findByIdAndUpdate(_id, {
        documents: createdCommonFormDocument._id,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            createdCommonFormDocument,
            " Document created successfully"
          )
        );
    } else {
      console.log("invalid service number ", serviceNumber);

      throw new ApiError(400, `Invalid service number`);
    }

    // switch (serviceNumber) {
    //   case 1:
    //     break;

    //   default:
    //     console.log("Invalid service number");
    //     throw new ApiError(400, `Invalid service number`);
    // }
  } catch (error) {
    console.log("Error while creating document", error);
    throw new ApiError(401, error || "Error while creating document");
  }
});

export const createCommonFormDocument = async (req, res) => {
  try {
    console.log("req.files", req.files);

    const { uploadedFiles, documentCount } = await uploadFiles(req.files);
    const { serviceNumber } = req.body;
    const _id = req.query.formId;

    console.log("uploadedFiles", uploadedFiles);

    // Dynamically generate docs array
    const docsArray = [];

    // Only push if file is uploaded
    for (const key in uploadedFiles) {
      if (uploadedFiles[key]?.url) {
        docsArray.push({ [formatFieldName(key)]: uploadedFiles[key].url });
      }
    }
    console.log("docsArray", docsArray);

    const createdCommonFormDocument = await CommonFormDocument.create({
      documentCount: documentCount,
      serviceNumber: serviceNumber,
      documentList: docsArray,
      IsSubmit: true,
    });

    if (!createdCommonFormDocument) {
      throw new ApiError(
        500,
        "Something went wrong while creating the document"
      );
    }

    const updateNoc = await CommonServices.findByIdAndUpdate(_id, {
      documents: createdCommonFormDocument._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          createdCommonFormDocument,
          "Document created successfully"
        )
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

// Helper function to format field names
function formatFieldName(fieldName) {
  switch (fieldName) {
    case "aadharCard":
      return "Aadhar Card";
    case "panCard":
      return "Pan Card";
    case "signature":
      return "Signature";
    case "bankPassbookFirstCopy":
      return "Bank Passbook First Copy";
    case "prescribedApplication":
      return "Prescribed Application";
    // add more custom names if needed
    default:
      return fieldName
        .replace(/([A-Z])/g, " $1") // add space before capitals
        .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
  }
}
