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

    switch (serviceNumber) {
      case 1:
        {
          console.log("Service 1 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 2:
        {
          console.log("Service 2 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 3:
        {
          console.log("Service 3 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 4:
        {
          console.log("Service 4 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 5:
        {
          console.log("Service 5 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 6:
        {
          console.log("Service 6 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 7:
        {
          console.log("Service 7 selected");

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
          let otherDocument = "";
          if (req.files?.otherDocument) {
            otherDocument = await uploadOnCloudinary(
              req.files?.otherDocument[0]?.path
            );
          }
          const identityCard = await uploadOnCloudinary(
            req.files?.identityCard[0]?.path
          );

          const signature = await uploadOnCloudinary(
            req.files?.signature[0]?.path
          );

          const createdCommonFormDocument = await CommonFormDocument.create({
            identityCard: identityCard?.url,
            serviceNumber: serviceNumber,
            signature: signature?.url,
            otherDocument: otherDocument?.url,
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
        }
        break;
      case 8:
        console.log("Service 8 selected");
        break;
      case 9:
        console.log("Service 9 selected");
        break;
      case 10:
        console.log("Service 10 selected");
        break;
      case 11:
        console.log("Service 11 selected");
        break;
      case 12:
        console.log("Service 12 selected");
        break;
      case 13:
        console.log("Service 13 selected");
        break;
      case 14:
        console.log("Service 14 selected");
        break;
      case 15:
        console.log("Service 15 selected");
        break;
      case 16:
        console.log("Service 16 selected");
        break;
      case 17:
        console.log("Service 17 selected");
        break;
      case 18:
        console.log("Service 18 selected");
        break;
      case 19:
        console.log("Service 19 selected");
        break;
      case 20:
        console.log("Service 20 selected");
        break;
      case 21:
        console.log("Service 21 selected");
        break;
      case 22:
        console.log("Service 22 selected");
        break;
      default:
        console.log("Invalid service number");
        throw new ApiError(400, `Invalid service number`);
    }
  } catch (error) {
    console.log("Error while creating document", error);
    throw new ApiError(401, error || "Error while creating document");
  }
});
