import { SERVICES_STATUS } from "../../../../constants.js";

import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
// import { SRA_Circular3_ProposalDocs3Remark } from "../../../../models/allFormModels/commonModels/commonRemark.model.js";
import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";
import { CommonRemark } from "../../../../models/allFormModels/commonModels/commonRemark.model.js";
// import { SRA_Circular3_ProposalDocs3 } from "../../../../models/allFormModels/townPlanningDepModel/3sra_Circular3_ProposalDocs.model.js";

// NocCertifiedCopy
export const createCommonRemark = asyncHandler(async (req, res) => {
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

    const createRemark = await CommonRemark.create({
      remark,
      document: documentUpload.url,
      addedBy: addedByPersonId,
      form: formId,
      addedByModel: addedByPerson,
    });
    const formUpdate = await CommonServices.findByIdAndUpdate(
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

export const createAdminRemarkForManagers = asyncHandler(async (req, res) => {
  try {
    const { remarkByAdminForManager } = req.body;
    const { formId } = req.query;

    console.log("formId", formId);
    console.log("req.body", req.body);
    console.log("remarkByAdminForManager", remarkByAdminForManager);
    if (!formId) {
      throw new ApiError(401, "Form id is required");
    }

    if (!remarkByAdminForManager) {
      throw new ApiError(401, "Text field is required");
    }

    const updateService = await CommonServices.findByIdAndUpdate(
      { _id: formId },
      { $set: { remarkByAdminForManager: remarkByAdminForManager } },
      { new: true }
    );
    // console.log("updateService", updateService?.remarkByAdminForManager);

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updateService,
          "Remark created by admin successfully"
        )
      );
  } catch (error) {
    console.log("Error while creating admin remark for managers", error);
    throw new ApiError(
      400,
      error || "Error while creating admin remark for managers"
    );
  }
});
