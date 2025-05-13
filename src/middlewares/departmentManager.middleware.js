import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DepartmentManager } from "../models/departmentManager/departmentManager.model.js";

export const verifyJWTDepartmentManager = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("department token check", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    // console.log("token", token);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const departmentManager = await DepartmentManager.findById(
      decodedToken?._id
    ).select("-password -refreshToken");
    if (!departmentManager) {
      throw new ApiError(401, "Invalid access token");
    }

    req.departmentManager = departmentManager;
    next();
  } catch (error) {
    console.log("Error while verifying JWT token", error);
    throw new ApiError(
      401,
      error?.message || "Error while verifying JWT token !"
    );
  }
});
