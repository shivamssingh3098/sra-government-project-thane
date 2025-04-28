import { Router } from "express";

import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";

import { getAllCommonPendingService } from "../../../controllers/department/departmentForm/commonFormController/commonDepartmentForm.controller.js";
const router = Router();

// router.route("/register").post(upload.single("profileImage"), registerUser);

router
  .route("/form-request")
  .get(verifyJWTDepartmentManager, getAllCommonPendingService);

// router.route("/accept-serviceStatus-for-sra_circular3_proposal-docs3").patch(
//   verifyJWTDepartmentManager,

//   sra_Circular3_ProposalDocs3Status
// );
export default router;
