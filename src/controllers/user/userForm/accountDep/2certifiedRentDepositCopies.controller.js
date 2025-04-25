import { CertifiedRentDepositCopies2 } from "../../../../models/allFormModels/accountDep/2certifiedRentDepositCopies.model.js";
import { CertifiedRentDepositCopiesDocuments } from "../../../../models/allFormModels/accountDep/2certifiedRentDepositCopiesDocuments.model.js";
import { NocCertifiedCopy } from "../../../../models/allFormModels/accountDep/NocCertifiedCopy.model.js";
import { NocCertifiedCopyDocuments } from "../../../../models/allFormModels/accountDep/nocCertifiedCopyDocumentes.model.js";
import { DepartmentManager } from "../../../../models/departmentManager/departmentManager.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
import { generateApplicationId } from "../../../../utils/generateApplicationId.js";
import { getDate } from "../../../../utils/handleDate.js";
const create2CertifiedRentDepositCopies = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      applyDate,
      phone,
      city,
      landNumber,
      address,
      taluka,
      village,
      sectorNo,
      municipalCorporation,
      department,
      governmentServiceBranch,
    } = req.body;

    console.log("req.files", req.file);
    if (
      [
        name,
        applyDate,
        phone,
        city,
        landNumber,
        address,
        taluka,
        village,
        sectorNo,
        municipalCorporation,
        department,
        governmentServiceBranch,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const departmentManager = await DepartmentManager.findOne(
      { department },
      { fullName: 1, _id: 0 }
    );
    // console.log("departmentManager", departmentManager);

    const applicationId = generateApplicationId();
    const expectingDate = getDate(15);
    // console.log("applicationId", applicationId);

    const certifiedRentDepositCopies2Created =
      await CertifiedRentDepositCopies2.create({
        name,
        applyDate,
        phone,
        city,
        landNumber,
        address,
        taluka,
        village,
        sectorNo,
        municipalCorporation,
        department,
        governmentServiceBranch,
        submit: true,
        userId: req.user._id,
        applicationId: applicationId,
        maximumDays: 15,
        expectingServiceDeliveryDate: expectingDate,
        departmentManager: departmentManager?.fullName, //need to check this field
      });

    if (!certifiedRentDepositCopies2Created) {
      throw new ApiError(
        500,
        "Something went wrong while creating the CertifiedRentDepositCopies2"
      );
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          certifiedRentDepositCopies2Created,
          "Certified Rent Deposit Copies2 created successfully"
        )
      );
  } catch (error) {
    console.log("Error while registering CertifiedRentDepositCopies2", error);
    throw new ApiError(
      401,
      error || "Error while registering Certified Rent Deposit Copies2"
    );
  }
});

const create2CertifiedRentDepositCopiesDocuments = asyncHandler(
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

      const certifiedRentDepositCopiesDocumentCreated =
        await CertifiedRentDepositCopiesDocuments.create({
          aadharCard: aadharCard.url,
          panCard: panCard.url,
          signature: signature.url,
          otherDocument: otherDocument.url,
          submit: true,
        });

      if (!certifiedRentDepositCopiesDocumentCreated) {
        throw new ApiError(
          500,
          "Something went wrong while creating the certifiedRentDepositCopiesDocument"
        );
      }
      const updateNoc = await CertifiedRentDepositCopies2.findByIdAndUpdate(
        _id,
        {
          documents: certifiedRentDepositCopiesDocumentCreated._id,
        }
      );

      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            certifiedRentDepositCopiesDocumentCreated,
            "RentDeposit Copy document created successfully"
          )
        );
    } catch (error) {
      console.log("Error while registering RentDeposit Copy document", error);
      throw new ApiError(
        401,
        error || "Error while registering RentDeposit Copy document"
      );
    }
  }
);

const get2CertifiedRentDepositCopies = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log("userId", userId);
    const response = await CertifiedRentDepositCopies2.find({ userId: userId });
    // console.log("res ", res);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          response,
          "Fetched all certified rent deposit copy request"
        )
      );
  } catch (error) {
    console.log("Error while getting certified rent deposit ", error);
    throw new ApiError(
      401,
      error || "Error while getting certified rent deposit copy"
    );
  }
});

export {
  create2CertifiedRentDepositCopies,
  create2CertifiedRentDepositCopiesDocuments,
  get2CertifiedRentDepositCopies,
};
