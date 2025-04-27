import { DEPARTMENT, MUNICIPAL_CORPORATIONS } from "../../../../constants.js";

import { SRA_Circular3_ProposalDocs3 } from "../../../../models/allFormModels/townPlanningDepModel/3sra_Circular3_ProposalDocs.model.js";
import { Sra_Circular3_ProposalDocsDocument } from "../../../../models/allFormModels/townPlanningDepModel/3sra_Circular3_ProposalDocsDocuments.model.js";
import { DepartmentManager } from "../../../../models/departmentManager/departmentManager.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
import { generateApplicationId } from "../../../../utils/generateApplicationId.js";
import { getDate } from "../../../../utils/handleDate.js";
const create3SRA_Circular3_ProposalDocs3 = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      applyDate,
      phone,
      city,

      address,
      taluka,
      village,
      schemeDeveloper,
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
    console.log(
      "name, applyDate,phone,city,address, taluka,village,department,governmentServiceBranch schemeDeveloper",
      name,
      applyDate,
      phone,
      city,
      address,
      taluka,
      village,
      department,
      governmentServiceBranch,
      schemeDeveloper
    );
    console.log("req.body", req.body);

    if (
      [
        name,
        applyDate,
        phone,
        city,

        address,
        taluka,
        village,
        schemeDeveloper,
        department,
        governmentServiceBranch,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    if (!sectorNo && !wardNo) {
      console.log(" sectorNo wardNo,", sectorNo, wardNo);
      throw new ApiError(400, "sectorNo or wardNo fields are required");
    }

    if (!landNumber && !surveyNo && !finalPlot) {
      console.log(
        "  landNumber,      surveyNo,finalPlot,",
        landNumber,
        surveyNo,
        finalPlot
      );
      throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
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

    const sra_Circular3_ProposalDocs3Created =
      await SRA_Circular3_ProposalDocs3.create({
        name,
        applyDate,
        phone,
        city,
        schemeDeveloper,
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
        IsSubmit: true,
        userId: req.user._id,
        applicationId: applicationId,
        maximumDays: 15,
        expectingServiceDeliveryDate: expectingDate,
        departmentManager: departmentManager?.fullName, //need to check this field
      });

    if (!sra_Circular3_ProposalDocs3Created) {
      throw new ApiError(
        500,
        "Something went wrong while creating the sra_Circular3_ProposalDocs3"
      );
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          sra_Circular3_ProposalDocs3Created,
          "sra_Circular3_ProposalDocs3 created successfully"
        )
      );
  } catch (error) {
    console.log("Error while registering sra_Circular3_ProposalDocs3", error);
    throw new ApiError(
      401,
      error || "Error while registering sra_Circular3_ProposalDocs3"
    );
  }
});

const create3Sra_Circular3_ProposalDocs3Documents = asyncHandler(
  async (req, res) => {
    try {
      console.log("req.files", req.files);
      const _id = req.query.id;

      if (!_id) {
        throw new ApiError(
          500,
          "Certified Rent Deposit Copies Documents id is mandatory"
        );
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

      const aadharCard = await uploadOnCloudinary(
        req.files?.aadharCard[0]?.path
      );
      const panCard = await uploadOnCloudinary(req.files?.panCard[0]?.path);
      const signature = await uploadOnCloudinary(req.files?.signature[0]?.path);
      const otherDocument = await uploadOnCloudinary(
        req.files?.otherDocument[0]?.path
      );
      console.log("aadharCard.url", aadharCard.url);

      const sra_Circular3_ProposalDocsDocumentCreated =
        await Sra_Circular3_ProposalDocsDocument.create({
          aadharCard: aadharCard.url,
          panCard: panCard.url,
          signature: signature.url,
          otherDocument: otherDocument.url,
          IsSubmit: true,
        });

      if (!sra_Circular3_ProposalDocsDocumentCreated) {
        throw new ApiError(
          500,
          "Something went wrong while creating the certifiedRentDepositCopiesDocument"
        );
      }
      const updateNoc = await SRA_Circular3_ProposalDocs3.findByIdAndUpdate(
        _id,
        {
          documents: sra_Circular3_ProposalDocsDocumentCreated._id,
        }
      );

      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            sra_Circular3_ProposalDocsDocumentCreated,
            "sra_Circular3_ProposalDocsDocumentCreated Copy document created successfully"
          )
        );
    } catch (error) {
      console.log(
        "Error while registering sra_Circular3_ProposalDocsDocument Copy document",
        error
      );
      throw new ApiError(
        401,
        error ||
          "Error while registering sra_Circular3_ProposalDocsDocumentCreated Copy document"
      );
    }
  }
);

const get3Sra_Circular3_ProposalDocs3 = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log("userId", userId);
    const response = await SRA_Circular3_ProposalDocs3.find({ userId: userId });
    // console.log("res ", res);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          response,
          "Fetched all SRA_Circular3_Proposal copy request"
        )
      );
  } catch (error) {
    console.log("Error while getting SRA_Circular3_Proposal ", error);
    throw new ApiError(
      401,
      error || "Error while getting SRA_Circular3_Proposal copy"
    );
  }
});

export {
  create3SRA_Circular3_ProposalDocs3,
  create3Sra_Circular3_ProposalDocs3Documents,
  get3Sra_Circular3_ProposalDocs3,
};
