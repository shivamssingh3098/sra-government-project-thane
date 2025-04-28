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
      .json(new ApiResponse(200, { data: getRequest }, "All Requests"));
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

export const getServiceStatusCountsByDepartment = async (req, res) => {
  try {
    const userDepartment = req.departmentManager?.department;

    if (!userDepartment) {
      throw new ApiError(400, "Department information is missing in request");
    }

    // Filter documents by department and group by serviceStatus
    const statusCounts = await CommonServices.aggregate([
      {
        $match: {
          department: userDepartment,
        },
      },
      {
        $group: {
          _id: "$serviceStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // Prepare response with default 0 values
    const response = {
      PENDING: 0,
      ACCEPTED: 0,
      FULFILLED: 0,
      REJECTED: 0,
    };

    // Update response based on aggregation
    statusCounts.forEach((item) => {
      response[item._id] = item.count;
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response,
          "Service status counts fetched successfully"
        )
      );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to fetch service status counts");
  }
};
