import { Router } from "express";
import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";
import { upload } from "../../../middlewares/multer.middleware.js";
import {
  createSRA_Circular3_ProposalDocs3Remark,
  // createNocCertifiedCopyRemark,
} from "../../../controllers/department/departmentForm/townPlanningDep/remark2.controller.js";

const router = Router();
//noc-remark
router
  .route("/create-sra-circular3-proposal-docs3-remark")
  .post(
    verifyJWTDepartmentManager,
    upload.single("document"),
    createSRA_Circular3_ProposalDocs3Remark
  );

// certified rent deposit copies  createCertifiedRentDepositCopies2Remark
// router
//   .route("/create-certifiedRentDeposit-remark-by-department")
//   .post(
//     verifyJWTDepartmentManager,
//     upload.single("document"),
//     createCertifiedRentDepositCopies2Remark
//   );
export default router;
