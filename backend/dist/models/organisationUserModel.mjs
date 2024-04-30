import mongoose from "mongoose";
const { Schema } = mongoose;
const organisationUserSchema = new Schema({
    email_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: Date, required: true },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    joining_date: { type: Date, required: true },
    otp: { type: Number }, // Store OTP
    otpExpiration: { type: Date }, // Store OTP expiration time
});
const OrganisationUser = mongoose.model('OrganisationUser', organisationUserSchema);
export { OrganisationUser };
//# sourceMappingURL=organisationUserModel.mjs.map