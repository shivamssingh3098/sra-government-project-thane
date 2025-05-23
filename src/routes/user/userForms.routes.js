import { Router } from "express";

import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  createNocCertifiedCopy,
  createNocCertifiedCopyDocuments,
  getNocCertifiedCopy,
  getSpecificNocCertifiedCopy,
} from "../../controllers/user/userForm/accountDep/userForm.controller.js";
//service 2  certified rent deposit copies
import {
  create2CertifiedRentDepositCopies,
  create2CertifiedRentDepositCopiesDocuments,
  get2CertifiedRentDepositCopies,
  getSpecificFormData2CertifiedRentDepositCopies,
} from "../../controllers/user/userForm/accountDep/2certifiedRentDepositCopies.controller.js";
//service 3
import {
  create3SRA_Circular3_ProposalDocs3,
  create3Sra_Circular3_ProposalDocs3Documents,
  get3Sra_Circular3_ProposalDocs3,
  getSpecificSra_Circular3_ProposalDocs,
} from "../../controllers/user/userForm/townPlannigDep/sra_Circular3_ProposalDocs3.controller.js";

const router = Router();

// router.route("/register").post(upload.single("profileImage"), registerUser);

router.route("/noc-Certified-Copy").post(verifyJWT, createNocCertifiedCopy);

router.route("/noc-Certified-Copy-documents").post(
  verifyJWT,
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  createNocCertifiedCopyDocuments
);
router
  .route("/get-noc-Certified-Copy-get-specific")
  .get(verifyJWT, getSpecificNocCertifiedCopy);
router.route("/get-noc-Certified-Copy").get(verifyJWT, getNocCertifiedCopy);

// router.route("/current-user").get(verifyJWT, currentUser);

//service 2

router
  .route("/create-certified-ren-deposit-copies")
  .post(verifyJWT, create2CertifiedRentDepositCopies);

router.route("/create-certified-ren-deposit-copies-documents").post(
  verifyJWT,
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  create2CertifiedRentDepositCopiesDocuments
);

router
  .route("/certified-ren-deposit-copies-get-specific")
  .get(verifyJWT, getSpecificFormData2CertifiedRentDepositCopies);

router
  .route("/certified-ren-deposit-copies")
  .get(verifyJWT, get2CertifiedRentDepositCopies);

//service 3

router
  .route("/create-sra-circular3-proposal-docs")
  .post(verifyJWT, create3SRA_Circular3_ProposalDocs3);

router.route("/create-sra-circular3-proposal-docs-documents").post(
  verifyJWT,
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "otherDocument", maxCount: 1 },
  ]),
  create3Sra_Circular3_ProposalDocs3Documents
);

router
  .route("/sra-circular3-proposal-docs-get-specific")
  .get(verifyJWT, getSpecificSra_Circular3_ProposalDocs);

router
  .route("/sra-circular3-proposal-docs")
  .get(verifyJWT, get3Sra_Circular3_ProposalDocs3);

export default router;
