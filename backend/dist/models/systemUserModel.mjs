import mongoose from "mongoose";
const { Schema } = mongoose;
const systemUserSchema = new Schema({
    email_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: Date, required: true },
    otp: { type: Number }, // Store OTP
    otpExpiration: { type: Date }, // Store OTP expiration time
});
const SystemUser = mongoose.model('SystemUser', systemUserSchema);
export { SystemUser };
//# sourceMappingURL=systemUserModel.mjs.map