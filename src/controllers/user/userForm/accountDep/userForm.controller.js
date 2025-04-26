import { DEPARTMENT, MUNICIPAL_CORPORATIONS } from "../../../../constants.js";
import { NocCertifiedCopy } from "../../../../models/allFormModels/accountDep/NocCertifiedCopy.model.js";
import { NocCertifiedCopyDocuments } from "../../../../models/allFormModels/accountDep/nocCertifiedCopyDocumentes.model.js";
import { DepartmentManager } from "../../../../models/departmentManager/departmentManager.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
import { generateApplicationId } from "../../../../utils/generateApplicationId.js";
import { getDate } from "../../../../utils/handleDate.js";
const createNocCertifiedCopy = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      applyDate,
      phone,
      city,

      address,
      taluka,
      village,

      department,
      governmentServiceBranch,
      //optional
      sectorNo,
      wardNo,
      //end optional

      //optional
      landNumber,
      surveyNo,
      finalPlot,
      //optional
      municipalCorporation,
      cityCouncil,
      villageCouncil,
    } = req.body;

    console.log("req.files", req.file);
    if (
      [
        name,
        applyDate,
        phone,
        city,

        address,
        taluka,
        village,

        department,
        governmentServiceBranch,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    if (!sectorNo && !wardNo) {
      throw new ApiError(400, "sectorNo or wardNo fields are required");
    }

    if (!landNumber && !surveyNo && !finalPlot) {
      throw new ApiError(
        400,
        "landNumber or surveyNo or finalPlot fields are required"
      );
    }

    if (
      (!municipalCorporation || municipalCorporation === "NONE") &&
      (!cityCouncil || cityCouncil === "NONE") &&
      (!villageCouncil || villageCouncil === "NONE")
    ) {
      throw new ApiError(
        400,
        "municipalCorporation or cityCouncil or villageCouncil fields are required"
      );
    }

    if (!DEPARTMENT.includes(department)) {
      throw new ApiError(
        401,

        `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
      );
    }
    // if (!MUNICIPAL_CORPORATIONS.includes(municipalCorporation)) {
    //   throw new ApiError(
    //     401,

    //     `Invalid serviceStatus. Allowed values: ${MUNICIPAL_CORPORATIONS.join(", ")}`
    //   );
    // }

    const departmentManager = await DepartmentManager.findOne(
      { department },
      { fullName: 1, _id: 0 }
    );
    // console.log("departmentManager", departmentManager);

    const applicationId = generateApplicationId();
    const expectingDate = getDate(15);
    // console.log("applicationId", applicationId);

    const nocCertifiedCopyCreated = await NocCertifiedCopy.create({
      name,
      applyDate,
      phone,
      city,

      address,
      taluka,
      village,
      cityCouncil,
      villageCouncil,
      municipalCorporation,
      department,
      governmentServiceBranch,
      landNumber,
      surveyNo,
      finalPlot,
      sectorNo,
      wardNo,
      submit: true,
      userId: req.user._id,
      applicationId: applicationId,
      maximumDays: 15,
      expectingServiceDeliveryDate: expectingDate,
      departmentManager: departmentManager?.fullName, //need to check this field
    });

    if (!nocCertifiedCopyCreated) {
      throw new ApiError(
        500,
        "Something went wrong while creating the nocCertifiedCopy"
      );
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          nocCertifiedCopyCreated,
          "NOC Certified Copy created successfully"
        )
      );
  } catch (error) {
    console.log("Error while registering NOC Certified Copy", error);
    throw new ApiError(
      401,
      error || "Error while registering NOC Certified Copy"
    );
  }
});

const createNocCertifiedCopyDocuments = asyncHandler(async (req, res) => {
  try {
    console.log("req.files", req.files);
    const _id = req.query.id;

    if (!_id) {
      throw new ApiError(500, "NocCertifiedCopy id is mandatory");
    }

    const REQUIRED_FILE_FIELDS = [
      "aadharCard",
      "panCard",
      "signature",
      "otherDocument",
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

    const aadharCard = await uploadOnCloudinary(req.files?.aadharCard[0]?.path);
    const panCard = await uploadOnCloudinary(req.files?.panCard[0]?.path);
    const signature = await uploadOnCloudinary(req.files?.signature[0]?.path);
    const otherDocument = await uploadOnCloudinary(
      req.files?.otherDocument[0]?.path
    );
    console.log("aadharCard.url", aadharCard.url);

    const nocCertifiedCopyDocumentCreated =
      await NocCertifiedCopyDocuments.create({
        aadharCard: aadharCard.url,
        panCard: panCard.url,
        signature: signature.url,
        otherDocument: otherDocument.url,
        submit: true,
      });

    if (!nocCertifiedCopyDocumentCreated) {
      throw new ApiError(
        500,
        "Something went wrong while creating the nocCertifiedCopyDocumentCreated"
      );
    }
    const updateNoc = await NocCertifiedCopy.findByIdAndUpdate(_id, {
      documents: nocCertifiedCopyDocumentCreated._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          nocCertifiedCopyDocumentCreated,
          "NOC Certified Copy document created successfully"
        )
      );
  } catch (error) {
    console.log("Error while registering NOC Certified Copy document", error);
    throw new ApiError(
      401,
      error || "Error while registering NOC Certified Copy document"
    );
  }
});

const getNocCertifiedCopy = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log("userId", userId);
    const response = await NocCertifiedCopy.find({ userId: userId });
    // console.log("res ", res);
    return res
      .status(201)
      .json(
        new ApiResponse(200, response, "Fetched all NOC certified request")
      );
  } catch (error) {
    console.log("Error while getting NOC certified copy ", error);
    throw new ApiError(401, error || "Error while getting NOC certified copy");
  }
});

export {
  createNocCertifiedCopy,
  createNocCertifiedCopyDocuments,
  getNocCertifiedCopy,
};
