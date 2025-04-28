import { DEPARTMENT } from "../../../../constants.js";
import { CommonServices } from "../../../../models/allFormModels/commonModels/commonForm.model.js";
import { DepartmentManager } from "../../../../models/departmentManager/departmentManager.model.js";
import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
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
      form1Validation([
        name,
        applyDate,
        phone,

        address,

        department,
        governmentServiceBranch,
      ]);
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

// export const createCommonFormsTest = asyncHandler(async (req, res) => {
//   try {
//     const serviceNumber = Number(req.body.serviceNumber);
//     console.log("serviceNumber", serviceNumber);

//     if (
//       (serviceNumber >= 1 && serviceNumber <= 8) ||
//       serviceNumber === 11 ||
//       serviceNumber === 14 ||
//       serviceNumber === 19 ||
//       serviceNumber === 20 ||
//       serviceNumber === 21 ||
//       serviceNumber === 22 ||
//       serviceNumber === 10 ||
//       serviceNumber === 13 ||
//       serviceNumber === 9
//     ) {
//       const {
//         name,
//         applyDate,
//         phone,
//         city,

//         address,
//         taluka,
//         village,
//         schemeDeveloper,
//         department,
//         governmentServiceBranch,
//         //optional
//         sectorNo,
//         wardNo,
//         //end optional

//         //optional
//         landNumber,
//         surveyNo,
//         finalPlot,
//         //optional
//         municipalCorporation,
//         cityCouncil,
//         villageCouncil,

//         // all other  fields

//         redevelopmentServicesNo,
//         hutNo,
//         redevelopmentLeavingDate,
//         apartmentNoShopProvidingDate,
//         governmentServiceBranchAddress,
//         transferredThroughSaleName,
//         transferredThroughAddressName,
//         srNo,
//         leavingDate,
//         spouseDeathDate,
//         competentAuthorityNo,
//         annexure2SrNoInRehabilitationScheme,

//         areaCode,
//       } = req.body;
//       form1Validation([
//         name,
//         applyDate,
//         phone,
//         city,

//         address,
//         taluka,
//         village,

//         department,
//         governmentServiceBranch,

//         municipalCorporation,
//         cityCouncil,
//         villageCouncil,
//       ]);
//       console.log("Service 1 selected");

//       if (serviceNumber >= 1 && serviceNumber <= 2)
//         if (!schemeDeveloper) {
//           throw new ApiError(400, "Scheme Developer is required");
//         }
//       // not mandatory for service 10 and 13

//       if (serviceNumber !== 10 && serviceNumber !== 13) {
//         if (
//           (!municipalCorporation || municipalCorporation === "NONE") &&
//           (!cityCouncil || cityCouncil === "NONE") &&
//           (!villageCouncil || villageCouncil === "NONE")
//         ) {
//           throw new ApiError(
//             400,
//             "municipalCorporation or cityCouncil or villageCouncil fields are required"
//           );
//         }

//         if (!landNumber && !surveyNo && !finalPlot) {
//           console.log(
//             "  landNumber,      surveyNo,finalPlot,",
//             landNumber,
//             surveyNo,
//             finalPlot
//           );
//           throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//         }
//       }
//       // not required in service 13
//       if (serviceNumber !== 13) {
//         if (!sectorNo && !wardNo) {
//           console.log(" sectorNo wardNo,", sectorNo, wardNo);
//           throw new ApiError(400, "sectorNo or wardNo fields are required");
//         }
//       }

//       if (
//         serviceNumber === 15 ||
//         serviceNumber === 16 ||
//         serviceNumber === 17
//       ) {
//         if (!sectorNo && !wardNo) {
//           console.log(" sectorNo wardNo,", sectorNo, wardNo);
//           throw new ApiError(400, "sectorNo or wardNo fields are required");
//         }
//       }

//       if (!DEPARTMENT.includes(department)) {
//         throw new ApiError(
//           401,

//           `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//         );
//       }
//       const departmentManager = await DepartmentManager.findOne(
//         { department },
//         { fullName: 1, _id: 0 }
//       );

//       // console.log("departmentManager", departmentManager);

//       const applicationId = generateApplicationId();
//       const expectingDate = getDate(15);
//       // console.log("applicationId", applicationId);

//       //   creating form here

//       const createdCommonService = await CommonServices.create({
//         name,
//         serviceNumber,
//         applyDate,
//         phone,
//         city,
//         schemeDeveloper,
//         address,
//         taluka,
//         village,
//         cityCouncil,
//         villageCouncil,
//         municipalCorporation,
//         department,
//         governmentServiceBranch,
//         landNumber,
//         surveyNo,
//         finalPlot,
//         sectorNo,
//         wardNo,
//         // other fields
//         redevelopmentServicesNo,
//         hutNo,
//         redevelopmentLeavingDate,
//         apartmentNoShopProvidingDate,
//         governmentServiceBranchAddress,
//         transferredThroughSaleName,
//         transferredThroughAddressName,
//         srNo,
//         leavingDate,
//         spouseDeathDate,
//         competentAuthorityNo,
//         annexure2SrNoInRehabilitationScheme,

//         areaCode,

//         IsSubmit: true,
//         userId: req.user._id,
//         applicationId: applicationId,
//         maximumDays: 15,
//         expectingServiceDeliveryDate: expectingDate,
//         departmentManager: departmentManager?.fullName, //need to check this field
//       });

//       if (!createdCommonService) {
//         throw new ApiError(
//           500,
//           "Something went wrong while creating the CertifiedRentDepositCopies2"
//         );
//       }
//       return res
//         .status(201)
//         .json(
//           new ApiResponse(
//             200,
//             createdCommonService,
//             "Service created successfully"
//           )
//         );
//     } else if (
//       serviceNumber === 15 &&
//       serviceNumber === 16 &&
//       serviceNumber === 17
//     ) {
//       const {
//         name,
//         applyDate,
//         phone,
//         city,

//         address,
//         taluka,
//         village,
//         schemeDeveloper,
//         department,
//         governmentServiceBranch,
//         //optional
//         sectorNo,
//         wardNo,
//         //end optional

//         //optional
//         landNumber,
//         surveyNo,
//         finalPlot,
//         //optional
//         municipalCorporation,
//         cityCouncil,
//         villageCouncil,
//         // different fields form above
//         redevelopmentServicesNo,
//         hutNo,
//         competentAuthorityNo,
//       } = req.body;
//       form1Validation([
//         name,
//         applyDate,
//         phone,
//         city,

//         address,
//         taluka,
//         village,

//         department,
//         governmentServiceBranch,

//         municipalCorporation,
//         cityCouncil,
//         villageCouncil,
//         redevelopmentServicesNo,
//         hutNo,
//         competentAuthorityNo,
//       ]);
//       console.log("Service 1 selected");
//       if (!sectorNo && !wardNo) {
//         console.log(" sectorNo wardNo,", sectorNo, wardNo);
//         throw new ApiError(400, "sectorNo or wardNo fields are required");
//       }

//       if (!landNumber && !surveyNo && !finalPlot) {
//         console.log(
//           "  landNumber,      surveyNo,finalPlot,",
//           landNumber,
//           surveyNo,
//           finalPlot
//         );
//         throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//       }

//       if (serviceNumber >= 1 && serviceNumber <= 2)
//         if (!schemeDeveloper) {
//           throw new ApiError(400, "Scheme Developer is required");
//         }

//       if (
//         (!municipalCorporation || municipalCorporation === "NONE") &&
//         (!cityCouncil || cityCouncil === "NONE") &&
//         (!villageCouncil || villageCouncil === "NONE")
//       ) {
//         throw new ApiError(
//           400,
//           "municipalCorporation or cityCouncil or villageCouncil fields are required"
//         );
//       }

//       if (!DEPARTMENT.includes(department)) {
//         throw new ApiError(
//           401,

//           `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//         );
//       }
//       const departmentManager = await DepartmentManager.findOne(
//         { department },
//         { fullName: 1, _id: 0 }
//       );

//       // console.log("departmentManager", departmentManager);

//       const applicationId = generateApplicationId();
//       const expectingDate = getDate(15);
//       // console.log("applicationId", applicationId);

//       //   creating form here

//       const createdCommonService = await CommonServices.create({
//         name,

//         serviceNumber,
//         applyDate,
//         phone,
//         city,
//         schemeDeveloper,
//         address,
//         taluka,
//         village,
//         cityCouncil,
//         villageCouncil,
//         municipalCorporation,
//         department,
//         governmentServiceBranch,
//         landNumber,
//         surveyNo,
//         finalPlot,
//         sectorNo,
//         wardNo,
//         // otherFields
//         redevelopmentServicesNo,
//         hutNo,
//         competentAuthorityNo,
//         //
//         IsSubmit: true,
//         userId: req.user._id,
//         applicationId: applicationId,
//         maximumDays: 15,
//         expectingServiceDeliveryDate: expectingDate,
//         departmentManager: departmentManager?.fullName, //need to check this field
//       });

//       if (!createdCommonService) {
//         throw new ApiError(
//           500,
//           "Something went wrong while creating the CertifiedRentDepositCopies2"
//         );
//       }
//       return res
//         .status(201)
//         .json(
//           new ApiResponse(
//             200,
//             createdCommonService,
//             "Service created successfully"
//           )
//         );
//     } else {
//       throw new ApiError(401, "Invalid Service Number");
//     }
//   } catch (error) {
//     console.log("error while creating common form", error);
//     throw new ApiError(401, error || "Error while creating form");
//   }
// });

export const getSpecificFormData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const formId = req.query.formId;
    // console.log("userId", userId);
    const response = await CommonServices.find({
      userId: userId,
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

// export const createCommonForm = asyncHandler(async (req, res) => {
//   try {
//     const serviceNumber = Number(req.body.serviceNumber);

//     switch (serviceNumber) {
//       case 1:
//         {
//           const {
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             schemeDeveloper,
//             department,
//             governmentServiceBranch,
//             //optional
//             sectorNo,
//             wardNo,
//             //end optional

//             //optional
//             landNumber,
//             surveyNo,
//             finalPlot,
//             //optional
//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           } = req.body;
//           form1Validation([
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             schemeDeveloper,
//             department,
//             governmentServiceBranch,

//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           ]);
//           console.log("Service 1 selected");
//           if (!sectorNo && !wardNo) {
//             console.log(" sectorNo wardNo,", sectorNo, wardNo);
//             throw new ApiError(400, "sectorNo or wardNo fields are required");
//           }

//           if (!landNumber && !surveyNo && !finalPlot) {
//             console.log(
//               "  landNumber,      surveyNo,finalPlot,",
//               landNumber,
//               surveyNo,
//               finalPlot
//             );
//             throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//           }

//           if (
//             (!municipalCorporation || municipalCorporation === "NONE") &&
//             (!cityCouncil || cityCouncil === "NONE") &&
//             (!villageCouncil || villageCouncil === "NONE")
//           ) {
//             throw new ApiError(
//               400,
//               "municipalCorporation or cityCouncil or villageCouncil fields are required"
//             );
//           }

//           if (!DEPARTMENT.includes(department)) {
//             throw new ApiError(
//               401,

//               `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//             );
//           }
//           const departmentManager = await DepartmentManager.findOne(
//             { department },
//             { fullName: 1, _id: 0 }
//           );

//           // console.log("departmentManager", departmentManager);

//           const applicationId = generateApplicationId();
//           const expectingDate = getDate(15);
//           // console.log("applicationId", applicationId);

//           //   creating form here

//           const createdCommonService = await CommonServices.create({
//             name,
//             serviceNumber,
//             applyDate,
//             phone,
//             city,
//             schemeDeveloper,
//             address,
//             taluka,
//             village,
//             cityCouncil,
//             villageCouncil,
//             municipalCorporation,
//             department,
//             governmentServiceBranch,
//             landNumber,
//             surveyNo,
//             finalPlot,
//             sectorNo,
//             wardNo,
//             IsSubmit: true,
//             userId: req.user._id,
//             applicationId: applicationId,
//             maximumDays: 15,
//             expectingServiceDeliveryDate: expectingDate,
//             departmentManager: departmentManager?.fullName, //need to check this field
//           });

//           if (!createdCommonService) {
//             throw new ApiError(
//               500,
//               "Something went wrong while creating the CertifiedRentDepositCopies2"
//             );
//           }
//           return res
//             .status(201)
//             .json(
//               new ApiResponse(
//                 200,
//                 createdCommonService,
//                 "Service created successfully"
//               )
//             );
//         }
//         break;
//       case 2:
//         {
//           console.log("Service 2 selected");
//           const {
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             schemeDeveloper,
//             department,
//             governmentServiceBranch,
//             //optional
//             sectorNo,
//             wardNo,
//             //end optional

//             //optional
//             landNumber,
//             surveyNo,
//             finalPlot,
//             //optional
//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           } = req.body;
//           form1Validation([
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             schemeDeveloper,
//             department,
//             governmentServiceBranch,

//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           ]);
//           console.log("Service 1 selected");
//           if (!sectorNo && !wardNo) {
//             console.log(" sectorNo wardNo,", sectorNo, wardNo);
//             throw new ApiError(400, "sectorNo or wardNo fields are required");
//           }

//           if (!landNumber && !surveyNo && !finalPlot) {
//             console.log(
//               "  landNumber,      surveyNo,finalPlot,",
//               landNumber,
//               surveyNo,
//               finalPlot
//             );
//             throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//           }

//           if (
//             (!municipalCorporation || municipalCorporation === "NONE") &&
//             (!cityCouncil || cityCouncil === "NONE") &&
//             (!villageCouncil || villageCouncil === "NONE")
//           ) {
//             throw new ApiError(
//               400,
//               "municipalCorporation or cityCouncil or villageCouncil fields are required"
//             );
//           }

//           if (!DEPARTMENT.includes(department)) {
//             throw new ApiError(
//               401,

//               `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//             );
//           }
//           const departmentManager = await DepartmentManager.findOne(
//             { department },
//             { fullName: 1, _id: 0 }
//           );

//           // console.log("departmentManager", departmentManager);

//           const applicationId = generateApplicationId();
//           const expectingDate = getDate(15);
//           // console.log("applicationId", applicationId);

//           //   creating form here

//           const createdCommonService = await CommonServices.create({
//             name,
//             serviceNumber,
//             applyDate,
//             phone,
//             city,
//             schemeDeveloper,
//             address,
//             taluka,
//             village,
//             cityCouncil,
//             villageCouncil,
//             municipalCorporation,
//             department,
//             governmentServiceBranch,
//             landNumber,
//             surveyNo,
//             finalPlot,
//             sectorNo,
//             wardNo,
//             IsSubmit: true,
//             userId: req.user._id,
//             applicationId: applicationId,
//             maximumDays: 15,
//             expectingServiceDeliveryDate: expectingDate,
//             departmentManager: departmentManager?.fullName, //need to check this field
//           });

//           if (!createdCommonService) {
//             throw new ApiError(
//               500,
//               "Something went wrong while creating the CertifiedRentDepositCopies2"
//             );
//           }
//           return res
//             .status(201)
//             .json(
//               new ApiResponse(
//                 200,
//                 createdCommonService,
//                 "Service created successfully"
//               )
//             );
//         }
//         break;
//       case 3:
//         {
//           console.log("Service 3 selected");

//           const {
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             // schemeDeveloper,
//             department,
//             governmentServiceBranch,
//             //optional
//             sectorNo,
//             wardNo,
//             //end optional

//             //optional
//             landNumber,
//             surveyNo,
//             finalPlot,
//             //optional
//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           } = req.body;
//           form1Validation([
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             // schemeDeveloper,
//             department,
//             governmentServiceBranch,

//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           ]);
//           console.log("Service 1 selected");
//           if (!sectorNo && !wardNo) {
//             console.log(" sectorNo wardNo,", sectorNo, wardNo);
//             throw new ApiError(400, "sectorNo or wardNo fields are required");
//           }

//           if (!landNumber && !surveyNo && !finalPlot) {
//             console.log(
//               "  landNumber,      surveyNo,finalPlot,",
//               landNumber,
//               surveyNo,
//               finalPlot
//             );
//             throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//           }

//           if (
//             (!municipalCorporation || municipalCorporation === "NONE") &&
//             (!cityCouncil || cityCouncil === "NONE") &&
//             (!villageCouncil || villageCouncil === "NONE")
//           ) {
//             throw new ApiError(
//               400,
//               "municipalCorporation or cityCouncil or villageCouncil fields are required"
//             );
//           }

//           if (!DEPARTMENT.includes(department)) {
//             throw new ApiError(
//               401,

//               `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//             );
//           }
//           const departmentManager = await DepartmentManager.findOne(
//             { department },
//             { fullName: 1, _id: 0 }
//           );

//           // console.log("departmentManager", departmentManager);

//           const applicationId = generateApplicationId();
//           const expectingDate = getDate(15);
//           // console.log("applicationId", applicationId);

//           //   creating form here

//           const createdCommonService = await CommonServices.create({
//             name,
//             serviceNumber,
//             applyDate,
//             phone,
//             city,
//             schemeDeveloper,
//             address,
//             taluka,
//             village,
//             cityCouncil,
//             villageCouncil,
//             municipalCorporation,
//             department,
//             governmentServiceBranch,
//             landNumber,
//             surveyNo,
//             finalPlot,
//             sectorNo,
//             wardNo,
//             IsSubmit: true,
//             userId: req.user._id,
//             applicationId: applicationId,
//             maximumDays: 15,
//             expectingServiceDeliveryDate: expectingDate,
//             departmentManager: departmentManager?.fullName, //need to check this field
//           });

//           if (!createdCommonService) {
//             throw new ApiError(
//               500,
//               "Something went wrong while creating the CertifiedRentDepositCopies2"
//             );
//           }
//           return res
//             .status(201)
//             .json(
//               new ApiResponse(
//                 200,
//                 createdCommonService,
//                 "Service created successfully"
//               )
//             );
//         }

//         break;
//       case 4:
//         {
//           console.log("Service 4 selected");

//           const {
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             // schemeDeveloper,
//             department,
//             governmentServiceBranch,
//             //optional
//             sectorNo,
//             wardNo,
//             //end optional

//             //optional
//             landNumber,
//             surveyNo,
//             finalPlot,
//             //optional
//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           } = req.body;
//           form1Validation([
//             name,
//             applyDate,
//             phone,
//             city,

//             address,
//             taluka,
//             village,
//             // schemeDeveloper,
//             department,
//             governmentServiceBranch,

//             municipalCorporation,
//             cityCouncil,
//             villageCouncil,
//           ]);
//           console.log("Service 1 selected");
//           if (!sectorNo && !wardNo) {
//             console.log(" sectorNo wardNo,", sectorNo, wardNo);
//             throw new ApiError(400, "sectorNo or wardNo fields are required");
//           }

//           if (!landNumber && !surveyNo && !finalPlot) {
//             console.log(
//               "  landNumber,      surveyNo,finalPlot,",
//               landNumber,
//               surveyNo,
//               finalPlot
//             );
//             throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//           }

//           if (
//             (!municipalCorporation || municipalCorporation === "NONE") &&
//             (!cityCouncil || cityCouncil === "NONE") &&
//             (!villageCouncil || villageCouncil === "NONE")
//           ) {
//             throw new ApiError(
//               400,
//               "municipalCorporation or cityCouncil or villageCouncil fields are required"
//             );
//           }

//           if (!DEPARTMENT.includes(department)) {
//             throw new ApiError(
//               401,

//               `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//             );
//           }
//           const departmentManager = await DepartmentManager.findOne(
//             { department },
//             { fullName: 1, _id: 0 }
//           );

//           // console.log("departmentManager", departmentManager);

//           const applicationId = generateApplicationId();
//           const expectingDate = getDate(15);
//           // console.log("applicationId", applicationId);

//           //   creating form here

//           const createdCommonService = await CommonServices.create({
//             name,
//             serviceNumber,
//             applyDate,
//             phone,
//             city,
//             schemeDeveloper,
//             address,
//             taluka,
//             village,
//             cityCouncil,
//             villageCouncil,
//             municipalCorporation,
//             department,
//             governmentServiceBranch,
//             landNumber,
//             surveyNo,
//             finalPlot,
//             sectorNo,
//             wardNo,
//             IsSubmit: true,
//             userId: req.user._id,
//             applicationId: applicationId,
//             maximumDays: 15,
//             expectingServiceDeliveryDate: expectingDate,
//             departmentManager: departmentManager?.fullName, //need to check this field
//           });

//           if (!createdCommonService) {
//             throw new ApiError(
//               500,
//               "Something went wrong while creating the CertifiedRentDepositCopies2"
//             );
//           }
//           return res
//             .status(201)
//             .json(
//               new ApiResponse(
//                 200,
//                 createdCommonService,
//                 "Service created successfully"
//               )
//             );
//         }
//         break;
//       case 5:
//         {
//           {
//             console.log("Service 5 selected");

//             const {
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,
//               //optional
//               sectorNo,
//               wardNo,
//               //end optional

//               //optional
//               landNumber,
//               surveyNo,
//               finalPlot,
//               //optional
//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             } = req.body;
//             form1Validation([
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,

//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             ]);
//             console.log("Service 1 selected");
//             if (!sectorNo && !wardNo) {
//               console.log(" sectorNo wardNo,", sectorNo, wardNo);
//               throw new ApiError(400, "sectorNo or wardNo fields are required");
//             }

//             if (!landNumber && !surveyNo && !finalPlot) {
//               console.log(
//                 "  landNumber,      surveyNo,finalPlot,",
//                 landNumber,
//                 surveyNo,
//                 finalPlot
//               );
//               throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//             }

//             if (
//               (!municipalCorporation || municipalCorporation === "NONE") &&
//               (!cityCouncil || cityCouncil === "NONE") &&
//               (!villageCouncil || villageCouncil === "NONE")
//             ) {
//               throw new ApiError(
//                 400,
//                 "municipalCorporation or cityCouncil or villageCouncil fields are required"
//               );
//             }

//             if (!DEPARTMENT.includes(department)) {
//               throw new ApiError(
//                 401,

//                 `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//               );
//             }
//             const departmentManager = await DepartmentManager.findOne(
//               { department },
//               { fullName: 1, _id: 0 }
//             );

//             // console.log("departmentManager", departmentManager);

//             const applicationId = generateApplicationId();
//             const expectingDate = getDate(15);
//             // console.log("applicationId", applicationId);

//             //   creating form here

//             const createdCommonService = await CommonServices.create({
//               name,
//               serviceNumber,
//               applyDate,
//               phone,
//               city,
//               schemeDeveloper,
//               address,
//               taluka,
//               village,
//               cityCouncil,
//               villageCouncil,
//               municipalCorporation,
//               department,
//               governmentServiceBranch,
//               landNumber,
//               surveyNo,
//               finalPlot,
//               sectorNo,
//               wardNo,
//               IsSubmit: true,
//               userId: req.user._id,
//               applicationId: applicationId,
//               maximumDays: 15,
//               expectingServiceDeliveryDate: expectingDate,
//               departmentManager: departmentManager?.fullName, //need to check this field
//             });

//             if (!createdCommonService) {
//               throw new ApiError(
//                 500,
//                 "Something went wrong while creating the CertifiedRentDepositCopies2"
//               );
//             }
//             return res
//               .status(201)
//               .json(
//                 new ApiResponse(
//                   200,
//                   createdCommonService,
//                   "Service created successfully"
//                 )
//               );
//           }
//         }
//         break;
//       case 6:
//         {
//           {
//             console.log("Service 6 selected");

//             const {
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,
//               //optional
//               sectorNo,
//               wardNo,
//               //end optional

//               //optional
//               landNumber,
//               surveyNo,
//               finalPlot,
//               //optional
//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             } = req.body;
//             form1Validation([
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,

//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             ]);
//             console.log("Service 1 selected");
//             if (!sectorNo && !wardNo) {
//               console.log(" sectorNo wardNo,", sectorNo, wardNo);
//               throw new ApiError(400, "sectorNo or wardNo fields are required");
//             }

//             if (!landNumber && !surveyNo && !finalPlot) {
//               console.log(
//                 "  landNumber,      surveyNo,finalPlot,",
//                 landNumber,
//                 surveyNo,
//                 finalPlot
//               );
//               throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//             }

//             if (
//               (!municipalCorporation || municipalCorporation === "NONE") &&
//               (!cityCouncil || cityCouncil === "NONE") &&
//               (!villageCouncil || villageCouncil === "NONE")
//             ) {
//               throw new ApiError(
//                 400,
//                 "municipalCorporation or cityCouncil or villageCouncil fields are required"
//               );
//             }

//             if (!DEPARTMENT.includes(department)) {
//               throw new ApiError(
//                 401,

//                 `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//               );
//             }
//             const departmentManager = await DepartmentManager.findOne(
//               { department },
//               { fullName: 1, _id: 0 }
//             );

//             // console.log("departmentManager", departmentManager);

//             const applicationId = generateApplicationId();
//             const expectingDate = getDate(15);
//             // console.log("applicationId", applicationId);

//             //   creating form here

//             const createdCommonService = await CommonServices.create({
//               name,
//               serviceNumber,
//               applyDate,
//               phone,
//               city,
//               schemeDeveloper,
//               address,
//               taluka,
//               village,
//               cityCouncil,
//               villageCouncil,
//               municipalCorporation,
//               department,
//               governmentServiceBranch,
//               landNumber,
//               surveyNo,
//               finalPlot,
//               sectorNo,
//               wardNo,
//               IsSubmit: true,
//               userId: req.user._id,
//               applicationId: applicationId,
//               maximumDays: 15,
//               expectingServiceDeliveryDate: expectingDate,
//               departmentManager: departmentManager?.fullName, //need to check this field
//             });

//             if (!createdCommonService) {
//               throw new ApiError(
//                 500,
//                 "Something went wrong while creating the CertifiedRentDepositCopies2"
//               );
//             }
//             return res
//               .status(201)
//               .json(
//                 new ApiResponse(
//                   200,
//                   createdCommonService,
//                   "Service created successfully"
//                 )
//               );
//           }
//         }
//         break;
//       case 7:
//         {
//           {
//             console.log("Service 7 selected");

//             const {
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,
//               //optional
//               sectorNo,
//               wardNo,
//               //end optional

//               //optional
//               landNumber,
//               surveyNo,
//               finalPlot,
//               //optional
//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             } = req.body;
//             form1Validation([
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,

//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             ]);
//             console.log("Service 1 selected");
//             if (!sectorNo && !wardNo) {
//               console.log(" sectorNo wardNo,", sectorNo, wardNo);
//               throw new ApiError(400, "sectorNo or wardNo fields are required");
//             }

//             if (!landNumber && !surveyNo && !finalPlot) {
//               console.log(
//                 "  landNumber,      surveyNo,finalPlot,",
//                 landNumber,
//                 surveyNo,
//                 finalPlot
//               );
//               throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//             }

//             if (
//               (!municipalCorporation || municipalCorporation === "NONE") &&
//               (!cityCouncil || cityCouncil === "NONE") &&
//               (!villageCouncil || villageCouncil === "NONE")
//             ) {
//               throw new ApiError(
//                 400,
//                 "municipalCorporation or cityCouncil or villageCouncil fields are required"
//               );
//             }

//             if (!DEPARTMENT.includes(department)) {
//               throw new ApiError(
//                 401,

//                 `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//               );
//             }
//             const departmentManager = await DepartmentManager.findOne(
//               { department },
//               { fullName: 1, _id: 0 }
//             );

//             // console.log("departmentManager", departmentManager);

//             const applicationId = generateApplicationId();
//             const expectingDate = getDate(15);
//             // console.log("applicationId", applicationId);

//             //   creating form here

//             const createdCommonService = await CommonServices.create({
//               name,
//               serviceNumber,
//               applyDate,
//               phone,
//               city,
//               schemeDeveloper,
//               address,
//               taluka,
//               village,
//               cityCouncil,
//               villageCouncil,
//               municipalCorporation,
//               department,
//               governmentServiceBranch,
//               landNumber,
//               surveyNo,
//               finalPlot,
//               sectorNo,
//               wardNo,
//               IsSubmit: true,
//               userId: req.user._id,
//               applicationId: applicationId,
//               maximumDays: 15,
//               expectingServiceDeliveryDate: expectingDate,
//               departmentManager: departmentManager?.fullName, //need to check this field
//             });

//             if (!createdCommonService) {
//               throw new ApiError(
//                 500,
//                 "Something went wrong while creating the CertifiedRentDepositCopies2"
//               );
//             }
//             return res
//               .status(201)
//               .json(
//                 new ApiResponse(
//                   200,
//                   createdCommonService,
//                   "Service created successfully"
//                 )
//               );
//           }
//         }
//         break;
//       case 8:
//         {
//           {
//             console.log("Service 8 selected");

//             const {
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,
//               //optional
//               sectorNo,
//               wardNo,
//               //end optional

//               //optional
//               landNumber,
//               surveyNo,
//               finalPlot,
//               //optional
//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             } = req.body;
//             form1Validation([
//               name,
//               applyDate,
//               phone,
//               city,

//               address,
//               taluka,
//               village,
//               // schemeDeveloper,
//               department,
//               governmentServiceBranch,

//               municipalCorporation,
//               cityCouncil,
//               villageCouncil,
//             ]);
//             console.log("Service 1 selected");
//             if (!sectorNo && !wardNo) {
//               console.log(" sectorNo wardNo,", sectorNo, wardNo);
//               throw new ApiError(400, "sectorNo or wardNo fields are required");
//             }

//             if (!landNumber && !surveyNo && !finalPlot) {
//               console.log(
//                 "  landNumber,      surveyNo,finalPlot,",
//                 landNumber,
//                 surveyNo,
//                 finalPlot
//               );
//               throw new ApiError(400, "!landNumber && !surveyNo && !finalPlot");
//             }

//             if (
//               (!municipalCorporation || municipalCorporation === "NONE") &&
//               (!cityCouncil || cityCouncil === "NONE") &&
//               (!villageCouncil || villageCouncil === "NONE")
//             ) {
//               throw new ApiError(
//                 400,
//                 "municipalCorporation or cityCouncil or villageCouncil fields are required"
//               );
//             }

//             if (!DEPARTMENT.includes(department)) {
//               throw new ApiError(
//                 401,

//                 `Invalid serviceStatus. Allowed values: ${DEPARTMENT.join(", ")}`
//               );
//             }
//             const departmentManager = await DepartmentManager.findOne(
//               { department },
//               { fullName: 1, _id: 0 }
//             );

//             // console.log("departmentManager", departmentManager);

//             const applicationId = generateApplicationId();
//             const expectingDate = getDate(15);
//             // console.log("applicationId", applicationId);

//             //   creating form here

//             const createdCommonService = await CommonServices.create({
//               name,
//               serviceNumber,
//               applyDate,
//               phone,
//               city,
//               schemeDeveloper,
//               address,
//               taluka,
//               village,
//               cityCouncil,
//               villageCouncil,
//               municipalCorporation,
//               department,
//               governmentServiceBranch,
//               landNumber,
//               surveyNo,
//               finalPlot,
//               sectorNo,
//               wardNo,
//               IsSubmit: true,
//               userId: req.user._id,
//               applicationId: applicationId,
//               maximumDays: 15,
//               expectingServiceDeliveryDate: expectingDate,
//               departmentManager: departmentManager?.fullName, //need to check this field
//             });

//             if (!createdCommonService) {
//               throw new ApiError(
//                 500,
//                 "Something went wrong while creating the CertifiedRentDepositCopies2"
//               );
//             }
//             return res
//               .status(201)
//               .json(
//                 new ApiResponse(
//                   200,
//                   createdCommonService,
//                   "Service created successfully"
//                 )
//               );
//           }
//         }
//         break;
//       case 9:
//         console.log("Service 9 selected");
//         break;
//       case 10:
//         console.log("Service 10 selected");
//         break;
//       case 11:
//         console.log("Service 11 selected");
//         break;
//       case 12:
//         console.log("Service 12 selected");
//         break;
//       case 13:
//         console.log("Service 13 selected");
//         break;
//       case 14:
//         console.log("Service 14 selected");
//         break;
//       case 15:
//         console.log("Service 15 selected");
//         break;
//       case 16:
//         console.log("Service 16 selected");
//         break;
//       case 17:
//         console.log("Service 17 selected");
//         break;
//       case 18:
//         console.log("Service 18 selected");
//         break;
//       case 19:
//         console.log("Service 19 selected");
//         break;
//       case 20:
//         console.log("Service 20 selected");
//         break;
//       case 21:
//         console.log("Service 21 selected");
//         break;
//       case 22:
//         console.log("Service 22 selected");
//         break;
//       default:
//         console.log("Invalid service number", serviceNumber);
//     }
//   } catch (error) {
//     console.log("Error while creating form", error);
//     throw new ApiError(401, error || "Error while creating form");
//   }
// });
