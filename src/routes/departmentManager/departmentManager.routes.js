import { Router } from "express";
import {
  currentDepartmentManager,
  deleteFileFromCloudinary,
  loginDepartmentManager,
  logoutDepartmentManager,
  refreshAccessToken,
  registerDepartmentManager,
} from "../../controllers/department/departmentManager.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWTDepartmentManager } from "../../middlewares/departmentManager.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.single("profileImage"), registerDepartmentManager);

router.route("/login").post(loginDepartmentManager);
router
  .route("/logout")
  .post(verifyJWTDepartmentManager, logoutDepartmentManager);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/current-manager")
  .get(verifyJWTDepartmentManager, currentDepartmentManager);
router
  .route("/delete-file")
  .post(verifyJWTDepartmentManager, deleteFileFromCloudinary);
export default router;
