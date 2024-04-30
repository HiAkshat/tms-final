import mongoose from "mongoose";
const { Schema } = mongoose;
const organisationSchema = new Schema({
    organisation_name: { type: String, unique: true, required: true },
    display_name: { type: String, required: true },
    total_tickets: { type: Number, default: 0 }
});
const Organisation = mongoose.model('Organisation', organisationSchema);
export { Organisation };
//# sourceMappingURL=organisationModel.mjs.map