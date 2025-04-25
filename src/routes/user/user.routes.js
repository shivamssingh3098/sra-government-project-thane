import { Router } from "express";
import {
  currentUser,
  deleteFileFromCloudinary,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../../controllers/user/user.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

// router.route("/register").post(
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
//   ]),
//   registerUser
// );

router.route("/register").post(upload.single("profileImage"), registerUser);

// profileImage
// router
//   .route("/what-we-offer")
//   .post(upload.single("image"), verifyJWT, createWhatWeOffer);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, currentUser);
router.route("/delete-file").post(verifyJWT, deleteFileFromCloudinary);
export default router;
