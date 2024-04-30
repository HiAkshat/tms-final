import mongoose from "mongoose";
const { Schema } = mongoose;
const ticketHistorySchema = new Schema({
    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'OrganisationUser', required: true },
    field: { type: String, required: true },
    old_value: { type: String, required: true },
    new_value: { type: String, required: true },
    updated_date: { type: Date, default: Date.now, required: true }
});
const TicketHistory = mongoose.model('TicketHistory', ticketHistorySchema);
export { TicketHistory };
//# sourceMappingURL=ticketHistoryModel.mjs.map