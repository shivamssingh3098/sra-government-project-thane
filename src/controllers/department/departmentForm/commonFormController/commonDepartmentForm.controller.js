import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";

import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

export const getAllCommonPendingService = asyncHandler(async (req, res) => {
  try {
    console.log(req.departmentManager.department);

    const { page, limit, serviceStatus } = req.query;
    const skip = page * limit - limit;
    console.log("page, limit, serviceStatus", page, limit, serviceStatus);

    const getRequest = await CommonServices.find({
      serviceStatus: serviceStatus,
      department: req.departmentManager.department,
    })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    //   console.log("getRequest", getRequest);

    res
      .status(200)
      .json(new ApiResponse(200, { data: getRequest }, "Pending Requests"));
  } catch (error) {
    console.log("Error while getting all  pending request", error);
    throw new ApiError(
      401,
      error.message || "Error while getting all  pending request"
    );
  }
});

export const getSpecificFormData = asyncHandler(async (req, res) => {
  try {
    const formId = req.query.formId;
    console.log("formId", formId);
    const response = await CommonServices.find({
      _id: formId,
    }).populate("documents");
    // console.log("res ", res);
    return res
      .status(200)
      .json(new ApiResponse(200, response, "form fetched "));
  } catch (error) {
    console.log("Error while getting form fetched  ", error);
    throw new ApiError(400, error || "Error while getting form fetched ");
  }
});
