import { Router } from "express";

import { verifyJWTAdmin } from "../../../middlewares/admin.middleware.js";
import { getNocCertifiedCopy } from "../../../controllers/admin/formController/nocCertifiedCopy/nocCertifiedCopy.controller.js";
const router = Router();
router
  .route("/get-noc-Certified-Copy")
  .get(verifyJWTAdmin, getNocCertifiedCopy);

export default router;
