import { SERVICES_STATUS } from "../../../../../constants.js";
import { CertifiedRentDepositCopies2 } from "../../../../../models/allFormModels/accountDep/2certifiedRentDepositCopies.model.js";
import { RemarkCertifiedRentDepositCopiesDocuments } from "../../../../../models/allFormModels/accountDep/2remarkCertifiedRentDepositCopiesDocuments.model.js";
import { NocCertifiedCopy } from "../../../../../models/allFormModels/accountDep/NocCertifiedCopy.model.js";
import { NocRemark } from "../../../../../models/allFormModels/accountDep/remarkNocCertifiedCopy.model.js";
import { ApiError } from "../../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../../utils/cloudinary.js";

// NocCertifiedCopy
export const createNocCertifiedCopyRemark = asyncHandler(async (req, res) => {
  try {
    const { remark, addedByPerson, addedByPersonId, formId, serviceStatus } =
      req.body;
    // console.log(req.file);

    console.log(
      "remark,addedBy, id formId",
      remark,
      addedByPerson,
      addedByPersonId,
      formId,
      serviceStatus
    );

    if (!req.file) {
      throw new ApiError(401, `Document is required`);
    }

    if (!["ADMIN", "DEPARTMENT_MANAGER"].includes(addedByPerson)) {
      throw new ApiError(
        401,
        `Invalid. Allowed values: ${["ADMIN", "DEPARTMENT_MANAGER"].join(", ")}`
      );
    }

    if (
      [remark, addedByPerson, addedByPersonId, formId, serviceStatus].some(
        (field) => field?.trim() == ""
      )
    ) {
      throw new ApiError(401, "All fields required");
    }
    if (!SERVICES_STATUS.includes(serviceStatus)) {
      throw new ApiError(
        401,

        `Invalid serviceStatus. Allowed values: ${SERVICES_STATUS.join(", ")}`
      );
    }
    const documentUpload = await uploadOnCloudinary(req.file?.path);

    const createRemark = await NocRemark.create({
      remark,
      document: documentUpload.url,
      addedBy: addedByPersonId,
      form: formId,
      addedByModel: addedByPerson,
    });
    const formUpdate = await NocCertifiedCopy.findByIdAndUpdate(
      { _id: formId },
      { $set: { remark: createRemark._id, serviceStatus: serviceStatus } }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, createRemark, "Remark created successfully"));
  } catch (error) {
    console.log("Error while creating Remark", error);
    throw new ApiError(401, error || "Error while creating Remark");
  }
});

//CertifiedRentDepositCopies2
export const createCertifiedRentDepositCopies2Remark = asyncHandler(
  async (req, res) => {
    try {
      const { remark, addedByPerson, addedByPersonId, formId, serviceStatus } =
        req.body;
      // console.log(req.file);

      console.log(
        "remark,addedBy, id formId",
        remark,
        addedByPerson,
        addedByPersonId,
        formId,
        serviceStatus
      );

      if (!req.file) {
        throw new ApiError(401, `Document is required`);
      }

      if (!["ADMIN", "DEPARTMENT_MANAGER"].includes(addedByPerson)) {
        throw new ApiError(
          401,
          `Invalid. Allowed values: ${["ADMIN", "DEPARTMENT_MANAGER"].join(", ")}`
        );
      }

      if (
        [remark, addedByPerson, addedByPersonId, formId, serviceStatus].some(
          (field) => field?.trim() == ""
        )
      ) {
        throw new ApiError(401, "All fields required");
      }
      if (!SERVICES_STATUS.includes(serviceStatus)) {
        throw new ApiError(
          401,

          `Invalid serviceStatus. Allowed values: ${SERVICES_STATUS.join(", ")}`
        );
      }
      const documentUpload = await uploadOnCloudinary(req.file?.path);

      const createRemark =
        await RemarkCertifiedRentDepositCopiesDocuments.create({
          remark,
          document: documentUpload.url,
          addedBy: addedByPersonId,
          form: formId,
          addedByModel: addedByPerson,
        });
      const formUpdate = await CertifiedRentDepositCopies2.findByIdAndUpdate(
        { _id: formId },
        { $set: { remark: createRemark._id, serviceStatus: serviceStatus } }
      );
      return res
        .status(201)
        .json(
          new ApiResponse(200, createRemark, "Remark created successfully")
        );
    } catch (error) {
      console.log("Error while creating Remark", error);
      throw new ApiError(401, error || "Error while creating Remark");
    }
  }
);
