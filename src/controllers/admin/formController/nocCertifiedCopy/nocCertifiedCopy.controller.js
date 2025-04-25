import { NocCertifiedCopy } from "../../../../models/allFormModels/accountDep/NocCertifiedCopy.model.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";

export const getNocCertifiedCopy = asyncHandler(async (req, res) => {
  try {
    const nocCertifiedCopy = await NocCertifiedCopy.find();
    res
      .status(200)
      .json(new ApiResponse(200, nocCertifiedCopy, "Current admin"));
  } catch (error) {
    console.log("Error while getNocCertifiedCopy", error);
    throw new ApiError(
      401,
      "error.message || Error while refreshing access token"
    );
  }
});
