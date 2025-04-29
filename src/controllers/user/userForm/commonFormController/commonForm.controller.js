import { DEPARTMENT } from "../../../../constants.js";
import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";
import { DepartmentManager } from "../../../../models/departmentManager/departmentManager.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { convertDocumentListToCamelCase } from "../../../../utils/convertArrayToObject.js";
import { generateApplicationId } from "../../../../utils/generateApplicationId.js";
import { getDate } from "../../../../utils/handleDate.js";
import { form1Validation } from "../../../../utils/validateRequiredFields.js";

// going to combine all for in if else

export const createCommonFormsTest = asyncHandler(async (req, res) => {
  try {
    const serviceNumber = Number(req.body.serviceNumber);
    console.log("serviceNumber", serviceNumber);

    if (serviceNumber >= 1 && serviceNumber <= 22) {
      const {
        name,
        applyDate,
        phone,
        city,

        address,
        taluka,
        village,
        schemeDeveloper,
        department,
        governmentServiceBranch,
        //optional
        sectorNo,
        wardNo,
        //end optional

        //optional
        landNumber,
        surveyNo,
        finalPlot,
        //optional
        municipalCorporation,
        cityCouncil,
        villageCouncil,

        // all other  fields

        redevelopmentServicesNo,
        hutNo,
        redevelopmentLeavingDate,
        apartmentNoShopProvidingDate,
        governmentServiceBranchAddress,
        transferredThroughSaleName,
        transferredThroughAddressName,
        srNo,
        leavingDate,
        spouseDeathDate,
        competentAuthorityNo,
        annexure2SrNoInRehabilitationScheme,

        areaCode,
      } = req.body;

      //  i have removed validation
      // form1Validation([
      //   name,
      //   applyDate,
      //   phone,

      //   address,

      //   department,
      //   governmentServiceBranch,
      // ]);
      console.log("Service 1 selected, schemeDeveloper", schemeDeveloper);

      if (serviceNumber >= 1 && serviceNumber <= 2)
        if (!schemeDeveloper) {
          throw new ApiError(400, "Scheme Developer is required");
        }
      // not mandatory for service 10 and 13

      if (serviceNumber !== 10 && serviceNumber !== 13) {
        if (
          (!municipalCorporation || municipalCorporation === "NONE") &&
          (!cityCouncil || cityCouncil === "NONE") &&
          (!villageCouncil || villageCouncil === "NONE")
        ) {
          throw new ApiError(
            400,
            "municipalCorporation or cityCouncil or villageCouncil fields are required"
          );
        }

        if (!landNumber && !surveyNo && !finalPlot) {
          console.log(
            "  landNumber,      surveyNo,finalPlot,",
            landNumber,
            surveyNo,
            finalPlot
          );
          throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
        }
      }
      // not required in service 13
      if (serviceNumber !== 13) {
        if (!sectorNo && !wardNo) {
          console.log(" sectorNo wardNo,", sectorNo, wardNo);
          throw new ApiError(400, "sectorNo or wardNo fields are required");
        }
      }

      if (
        serviceNumber === 15 ||
        serviceNumber === 16 ||
        serviceNumber === 17
      ) {
        if (!sectorNo && !wardNo) {
          console.log(" sectorNo wardNo,", sectorNo, wardNo);
          throw new ApiError(400, "sectorNo or wardNo fields are required");
        }
      }

      if (!DEPARTMENT.includes(department)) {
        throw new ApiError(
          401,

          `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
        );
      }
      const departmentManager = await DepartmentManager.findOne(
        { department },
        { fullName: 1, _id: 0 }
      );

      // console.log("departmentManager", departmentManager);

      const applicationId = generateApplicationId();
      const expectingDate = getDate(15);
      // console.log("applicationId", applicationId);

      //   creating form here

      const createdCommonService = await CommonServices.create({
        name,
        serviceNumber,
        applyDate,
        phone,
        city,
        schemeDeveloper,
        address,
        taluka,
        village,
        cityCouncil,
        villageCouncil,
        municipalCorporation,
        department,
        governmentServiceBranch,
        landNumber,
        surveyNo,
        finalPlot,
        sectorNo,
        wardNo,
        // other fields
        redevelopmentServicesNo,
        hutNo,
        redevelopmentLeavingDate,
        apartmentNoShopProvidingDate,
        governmentServiceBranchAddress,
        transferredThroughSaleName,
        transferredThroughAddressName,
        srNo,
        leavingDate,
        spouseDeathDate,
        competentAuthorityNo,
        annexure2SrNoInRehabilitationScheme,

        areaCode,

        IsSubmit: true,
        userId: req.user._id,
        applicationId: applicationId,
        maximumDays: 15,
        expectingServiceDeliveryDate: expectingDate,
        departmentManager: departmentManager?.fullName, //need to check this field
      });

      if (!createdCommonService) {
        throw new ApiError(
          500,
          "Something went wrong while creating the CertifiedRentDepositCopies2"
        );
      }
      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            createdCommonService,
            "Service created successfully"
          )
        );
    } else {
      throw new ApiError(401, "Invalid Service Number");
    }
  } catch (error) {
    console.log("error while creating common form", error);
    throw new ApiError(401, error || "Error while creating form");
  }
});

export const getSpecificFormData = asyncHandler(async (req, res) => {
  try {
    const response = await CommonServices.findById(req.query.formId)
      .populate("documents")
      .lean(); // Use lean to get plain JS object

    if (!response) {
      throw new ApiError(404, "Service not found");
    }
    console.log("response serviceData", response);

    // If documents exist and have documentList, convert to camelCase object
    if (response.documents?.documentList) {
      const obj = convertDocumentListToCamelCase(
        response?.documents?.documentList
      );

      // Replace documentList array with formatted object
      response.documents.documentList = obj;
    }

    return res
      .status(200)
      .json(new ApiResponse(200, response, "form fetched "));
  } catch (error) {
    console.log("Error while getting form fetched  ", error);
    throw new ApiError(400, error || "Error while getting form fetched ");
  }
});

export const getServiceRequest = asyncHandler(async (req, res) => {
  try {
    // console.log("req.user", req.user);
    const { page, limit, serviceStatus } = req.query;
    const skip = page * limit - limit;
    console.log("page, limit, serviceStatus", page, limit, serviceStatus);

    const response = await CommonServices.find({
      userId: req.user._id,
      serviceStatus: serviceStatus,
    })
      .populate("remark")
      .populate("documents")
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);

    return res
      .status(200)
      .json(new ApiResponse(200, response, "form fetched "));
  } catch (error) {
    console.log("Error while getting all services", error);
    throw new ApiError(400, error || "Error while getting all services ");
  }
});
