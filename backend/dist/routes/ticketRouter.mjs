import express from "express";
const router = express.Router();
import { getTickets, getOrgTickets, addTicket, editTicket, deleteTicket, getTicket } from "../controllers/ticketController.mjs";
router
    .route("/")
    .get(getTickets)
    .post(addTicket);
router
    .route("/:id")
    .get(getTicket)
    .put(editTicket)
    .delete(deleteTicket);
router
    .route("/organisation/:id")
    .get(getOrgTickets);
export default router;
//# sourceMappingURL=ticketRouter.mjs.map