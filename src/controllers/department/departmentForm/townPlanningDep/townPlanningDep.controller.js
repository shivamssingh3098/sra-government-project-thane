import { SERVICES_STATUS } from "../../../../constants.js";

import { SRA_Circular3_ProposalDocs3 } from "../../../../models/allFormModels/townPlanningDepModel/3sra_Circular3_ProposalDocs.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";

//NOC Certified Copy
export const getAllPendingSRA_Circular3_ProposalDocs3 = asyncHandler(
  async (req, res) => {
    try {
      console.log(req.departmentManager.department);

      const { page, limit, serviceStatus } = req.query;
      const skip = page * limit - limit;
      console.log("page, limit, serviceStatus", page, limit, serviceStatus);

      const getRequest = await SRA_Circular3_ProposalDocs3.find({
        serviceStatus: serviceStatus,
      })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip);
      //   console.log("getRequest", getRequest);

      res
        .status(200)
        .json(new ApiResponse(200, { data: getRequest }, "Pending Requests"));
    } catch (error) {
      console.log(
        "Error while getting all SRA_Circular3_ProposalDocs3 pending request",
        error
      );
      throw new ApiError(
        401,
        error.message ||
          "Error while getting all SRA_Circular3_ProposalDocs3 pending request"
      );
    }
  }
);

export const sra_Circular3_ProposalDocs3Status = asyncHandler(
  async (req, res) => {
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

      const updatedData = await SRA_Circular3_ProposalDocs3.findByIdAndUpdate(
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
      console.log("Error while updating status", error);
      throw new ApiError(
        401,
        error.message ||
          "Error while updating status SRA_Circular3_ProposalDocs3"
      );
    }
  }
);

//Certified Rent Deposit copies document

// export const getAllPendingRequestForCertifiedRentDepositCopies2 = asyncHandler(
//   async (req, res) => {
//     try {
//       console.log(req.departmentManager.department);

//       const { page, limit, serviceStatus } = req.query;
//       const skip = page * limit - limit;
//       console.log("page, limit, serviceStatus", page, limit, serviceStatus);

//       const getRequest = await CertifiedRentDepositCopies2.find({
//         serviceStatus: serviceStatus,
//       })
//         .sort({ _id: -1 })
//         .limit(limit)
//         .skip(skip);
//       //   console.log("getRequest", getRequest);

//       res
//         .status(200)
//         .json(new ApiResponse(200, { data: getRequest }, "Pending Requests"));
//     } catch (error) {
//       console.log(
//         "Error while getting all CertifiedRentDepositCopies2 pending request",
//         error
//       );
//       throw new ApiError(
//         401,
//         error.message ||
//           "Error while getting all CertifiedRentDepositCopies2 pending request"
//       );
//     }
//   }
// );

// export const ForCertifiedRentDepositCopies2Status = asyncHandler(
//   async (req, res) => {
//     try {
//       const { serviceStatus, _id } = req.body;
//       console.log("serviceStatus, id", serviceStatus, _id);

//       if (!serviceStatus || !_id) {
//         throw new ApiError(400, "All fields are required");
//       }

//       if (!SERVICES_STATUS.includes(serviceStatus)) {
//         throw new ApiError(
//           401,

//           `Invalid serviceStatus. Allowed values: ${SERVICES_STATUS.join(", ")}`
//         );
//       }

//       const updatedData = await CertifiedRentDepositCopies2.findByIdAndUpdate(
//         _id,
//         {
//           $set: {
//             serviceStatus: serviceStatus,
//           },
//         },
//         { new: true }
//       );
//       res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { data: updatedData },
//             "Status updated successfully"
//           )
//         );
//     } catch (error) {
//       console.log("Error while updating status", error);
//       throw new ApiError(
//         401,
//         error.message ||
//           "Error while getting all CertifiedRentDepositCopies2 pending request"
//       );
//     }
//   }
// );
