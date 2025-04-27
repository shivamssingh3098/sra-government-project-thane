import { Router } from "express";

import { upload } from "../../../middlewares/multer.middleware.js";
import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";
import {
  getAllPendingSRA_Circular3_ProposalDocs3,
  sra_Circular3_ProposalDocs3Status,
  // getAllPendingRequestForCertifiedRentDepositCopies2,
  // ForCertifiedRentDepositCopies2Status,
} from "../../../controllers/department/departmentForm/townPlanningDep/townPlanningDep.controller.js";

const router = Router();

// router.route("/register").post(upload.single("profileImage"), registerUser);

router
  .route("/all-pending-request-for-sra_circular3_proposal-docs3")
  .get(verifyJWTDepartmentManager, getAllPendingSRA_Circular3_ProposalDocs3);

router.route("/accept-serviceStatus-for-sra_circular3_proposal-docs3").patch(
  verifyJWTDepartmentManager,

  sra_Circular3_ProposalDocs3Status
);

// certified rent deposit copies

// router
//   .route("/all-pending-request-for-certified-rent-deposit-copies2")
//   .get(
//     verifyJWTDepartmentManager,
//     getAllPendingRequestForCertifiedRentDepositCopies2
//   );

// router.route("/accept-serviceStatus-for-rent-deposit-copies").patch(
//   verifyJWTDepartmentManager,

//   ForCertifiedRentDepositCopies2Status
// );

// router.route("/current-user").get(verifyJWT, currentUser);

export default router;
