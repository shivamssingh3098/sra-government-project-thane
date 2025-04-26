import { Router } from "express";
import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";
import { upload } from "../../../middlewares/multer.middleware.js";
import {
  createCertifiedRentDepositCopies2Remark,
  createNocCertifiedCopyRemark,
} from "../../../controllers/department/departmentForm/accountDepController/remark/remark.controller.js";

const router = Router();
//noc-remark
router
  .route("/create-noc-remark-by-department")
  .post(
    verifyJWTDepartmentManager,
    upload.single("document"),
    createNocCertifiedCopyRemark
  );

// certified rent deposit copies  createCertifiedRentDepositCopies2Remark
router
  .route("/create-certifiedRentDeposit-remark-by-department")
  .post(
    verifyJWTDepartmentManager,
    upload.single("document"),
    createCertifiedRentDepositCopies2Remark
  );
export default router;
