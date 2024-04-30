import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema({
    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'OrganisationUser', required: true },
    content: { type: String, required: true },
    created_date: { type: Date, default: Date.now, required: true },
    updated_date: { type: Date, default: Date.now, required: true }
});
const Comment = mongoose.model('Comment', commentSchema);
export { Comment };
//# sourceMappingURL=commentModel.mjs.map