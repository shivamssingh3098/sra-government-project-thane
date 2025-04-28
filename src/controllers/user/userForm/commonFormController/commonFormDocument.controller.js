import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";
import { CommonFormDocument } from "../../../../models/allFormModels/commonModels/commonFormDocument.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";

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
      console.log("Service  selected", serviceNumber);
      // -------------------------------working on this --------------------
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
