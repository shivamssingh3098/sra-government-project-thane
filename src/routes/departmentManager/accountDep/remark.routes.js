import { Router } from "express";
import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";
import { upload } from "../../../middlewares/multer.middleware.js";
import { createNocCertifiedCopyRemark } from "../../../controllers/department/departmentForm/accountDepController/remark/remark.controller.js";

const router = Router();

router
  .route("/create-noc-remark-by-department")
  .post(
    verifyJWTDepartmentManager,
    upload.single("document"),
    createNocCertifiedCopyRemark
  );
//   router.route("/register").post(upload.single("profileImage"), registerUser);
export default router;
