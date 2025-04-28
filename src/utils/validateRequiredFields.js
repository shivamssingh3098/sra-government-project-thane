import { DEPARTMENT } from "../constants.js";
import { ApiError } from "./ApiError.js";

export const form1Validation = (requiredFields) => {
  if ([...requiredFields].some((field) => field?.trim() === "")) {
    console.log("name, applyDate, phone, address-----", [...requiredFields]);
    throw new ApiError(400, "All fields are required");
  }
};
