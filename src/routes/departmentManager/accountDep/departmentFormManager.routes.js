import { Router } from "express";

import { upload } from "../../../middlewares/multer.middleware.js";
import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";
import {
  getAllPendingRequestForNocCertifiedCopy,
  ForNocCertifiedCopyStatus,
  getAllPendingRequestForCertifiedRentDepositCopies2,
  ForCertifiedRentDepositCopies2Status,
} from "../../../controllers/department/departmentForm/accountDepController/accountDepartmentForm.controller.js";

const router = Router();

// router.route("/register").post(upload.single("profileImage"), registerUser);

router
  .route("/all-pending-request-for-noc-certified-copy")
  .get(verifyJWTDepartmentManager, getAllPendingRequestForNocCertifiedCopy);

router
  .route("/update-serviceStatus-for-noc-certified-copy")
  .patch(
    verifyJWTDepartmentManager,
    upload.single("attachedDocument"),
    ForNocCertifiedCopyStatus
  );

// certified rent deposit copies

// router.route("/register").post(upload.single("profileImage"), registerUser);

router
  .route("/all-pending-request-for-certified-rent-deposit-copies2")
  .get(
    verifyJWTDepartmentManager,
    getAllPendingRequestForCertifiedRentDepositCopies2
  );

router.route("/accept-serviceStatus-for-rent-deposit-copies").patch(
  verifyJWTDepartmentManager,

  ForCertifiedRentDepositCopies2Status
);

// router.route("/current-user").get(verifyJWT, currentUser);

export default router;
