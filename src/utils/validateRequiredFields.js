import { DEPARTMENT } from "../constants.js";
import { ApiError } from "./ApiError.js";

export const form1Validation = (requiredFields) => {
  console.log("name, applyDate, phone, address", [...requiredFields]);

  if ([...requiredFields].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
};
