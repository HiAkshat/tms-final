import express from "express";
const router = express.Router();
import { getSystemUser, getSystemUsers, addSystemUser, sendOTP, verifyOTP, getSystemUserByEmail } from "../controllers/systemUserController.mjs";
router
    .route("/")
    .get(getSystemUsers)
    .post(addSystemUser);
router
    .route("/:id")
    .get(getSystemUser);
router
    .route("/email/:email_id")
    .get(getSystemUserByEmail);
router
    .route("/sendOTP/:email_id")
    .post(sendOTP);
router
    .route("/verifyOTP")
    .post(verifyOTP);
export default router;
//# sourceMappingURL=systemUserRoutes.mjs.map