import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  currentAdmin,
  deleteFileFromCloudinary,
} from "../../controllers/admin/admin.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWTAdmin } from "../../middlewares/admin.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerAdmin);

router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWTAdmin, logoutAdmin);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-admin").get(verifyJWTAdmin, currentAdmin);
router.route("/delete-file").post(verifyJWTAdmin, deleteFileFromCloudinary);
export default router;
