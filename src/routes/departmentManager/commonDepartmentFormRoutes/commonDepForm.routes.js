import { Router } from "express";

import { verifyJWTDepartmentManager } from "../../../middlewares/departmentManager.middleware.js";

import {
  getAllCommonPendingService,
  getServiceStatusCountsByDepartment,
  getSpecificFormData,
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

export default router;
