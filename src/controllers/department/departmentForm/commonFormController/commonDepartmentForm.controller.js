import { SERVICES_STATUS } from "../../../../constants.js";
import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";

import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

export const getAllCommonPendingService = asyncHandler(async (req, res) => {
  try {
    console.log(req.departmentManager.department);

    const { page, limit, serviceStatus, serviceNumber } = req.query;
    const skip = page * limit - limit;
    console.log(
      "page, limit, serviceStatus, serviceNumber",
      page,
      limit,
      serviceStatus,
      serviceNumber
    );

    const isAdmin = req.departmentManager.department === "ADMIN";

    const query = {
      serviceStatus: serviceStatus,
    };

    // Only add `department` filter if not admin
    if (!isAdmin) {
      query.department = req.departmentManager.department;
    }

    const getRequest = await CommonServices.find(query)
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

export const updateCommonFormStatus = asyncHandler(async (req, res) => {
  try {
    const { serviceStatus, _id } = req.body;
    console.log("serviceStatus, id", serviceStatus, _id);

    if (!serviceStatus || !_id) {
      throw new ApiError(400, "All fields are required");
    }

    if (!SERVICES_STATUS.includes(serviceStatus)) {
      throw new ApiError(
        401,

        `Invalid serviceStatus. Allowed values: ${SERVICES_STATUS.join(", ")}`
      );
    }

    const updatedData = await CommonServices.findByIdAndUpdate(
      _id,
      {
        $set: {
          serviceStatus: serviceStatus,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: updatedData },
          "Status updated successfully"
        )
      );
  } catch (error) {
    console.log("Error while accept requests", error);
    throw new ApiError(401, error.message || "Error while accept request");
  }
});

export const getServiceStatusCountsByDepartment = async (req, res) => {
  try {
    const userDepartment = req.departmentManager?.department;
    console.log("userDepartment", userDepartment);

    if (!userDepartment) {
      throw new ApiError(400, "Department information is missing in request");
    }

    const pipeline = [];
    // if userDepartment is admin then no need to match department and get all the data,
    if (userDepartment !== "ADMIN") {
      pipeline.push({
        $match: {
          department: userDepartment,
        },
      });
    }

    pipeline.push({
      $group: {
        _id: "$serviceStatus",
        count: { $sum: 1 },
      },
    });

    // Filter documents by department and group by serviceStatus

    const statusCounts = await CommonServices.aggregate(pipeline);

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
