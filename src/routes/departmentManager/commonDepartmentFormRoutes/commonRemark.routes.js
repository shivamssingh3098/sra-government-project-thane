import { Router } from "express";
import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";
import { upload } from "../../../middlewares/multer.middleware.js";
// import {
//   createSRA_Circular3_ProposalDocs3Remark,
//   // createNocCertifiedCopyRemark,
// } from "../../../controllers/department/departmentForm/townPlanningDep/remark2.controller.js";
import {
  createAdminRemarkForManagers,
  createCommonRemark,
} from "../../../controllers/department/departmentForm/commonFormController/commonRemark.controller.js";

const router = Router();
//noc-remark
router
  .route("/create-remark")
  .post(
    verifyJWTDepartmentManager,
    upload.single("document"),
    createCommonRemark
  );

router.route("/create-admin-remark-for-manager").post(
  verifyJWTDepartmentManager,

  createAdminRemarkForManagers
);

export default router;
