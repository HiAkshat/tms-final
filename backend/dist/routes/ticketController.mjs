import express from "express";
const router = express.Router();
import { getOrgTickets } from "../controllers/ticketController.mjs";
router
    .route("/:id")
    .get(getOrgTickets);
export default router;
//# sourceMappingURL=ticketController.mjs.map