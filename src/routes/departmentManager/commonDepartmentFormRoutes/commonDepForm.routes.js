import { Router } from "express";

import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";

import {
  getAllCommonPendingService,
  getServiceStatusCountsByDepartment,
  getSpecificFormData,
  updateCommonFormStatus,
} from "../../../controllers/department/departmentForm/commonFormController/commonDepartmentForm.controller.js";
const router = Router();

// router.route("/register").post(upload.single("profileImage"), registerUser);

router
  .route("/form-request")
  .get(verifyJWTDepartmentManager, getAllCommonPendingService);

router
  .route("/get-specific-form-data")
  .get(verifyJWTDepartmentManager, getSpecificFormData);

router
  .route("/request-count")
  .get(verifyJWTDepartmentManager, getServiceStatusCountsByDepartment);

router
  .route("/accept-form-request")
  .patch(verifyJWTDepartmentManager, updateCommonFormStatus);
export default router;
