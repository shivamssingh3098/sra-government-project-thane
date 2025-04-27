import { Router } from "express";

import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { createCommonForm } from "../../controllers/user/userForm/commonFormController/commonForm.controller.js";
import { createCommonDocuments } from "../../controllers/user/userForm/commonFormController/commonFormDocument.controller.js";

const router = Router();

router.route("/create-common-form").post(verifyJWT, createCommonForm);
export default router;
router.route("/documents-upload").post(
  verifyJWT,
  upload.fields([
    { name: "identityCard", maxCount: 1 },

    { name: "signature", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  createCommonDocuments
);
// router
//   .route("/get-noc-Certified-Copy-get-specific")
//   .get(verifyJWT, getSpecificNocCertifiedCopy);
// router.route("/get-noc-Certified-Copy").get(verifyJWT, getNocCertifiedCopy);
