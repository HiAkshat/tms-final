import mongoose from "mongoose";
const { Schema } = mongoose;
const ticketSchema = new Schema({
    type: { type: String, enum: ['Story', 'Task', 'Bug'], required: true },
    key: { type: String, unique: true, required: true },
    summary: { type: String, required: true },
    description: { type: String },
    assignee: { type: Schema.Types.ObjectId, ref: 'OrganisationUser', required: true },
    reporter: { type: Schema.Types.ObjectId, ref: 'OrganisationUser', required: true },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    status: { type: String, enum: ['TOBEPICKED', 'INPROGRESS', 'INTESTING', 'COMPLETED'], default: 'TOBEPICKED', required: true },
    created_date: { type: Date, default: Date.now, required: true },
    updated_date: { type: Date, default: Date.now, required: true },
    due_date: { type: Date },
    files: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
const Ticket = mongoose.model('Ticket', ticketSchema);
export { Ticket };
//# sourceMappingURL=ticketModel.mjs.map