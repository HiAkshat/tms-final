import { OrganisationUser } from "../models/organisationUserModel.mjs";
import nodemailer from "nodemailer";
const getOrganisationUsers = async (req, res) => {
    try {
        const data = await OrganisationUser.find({}).populate('organisation');
        console.log("Organisation users retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
        console.log("Error occured retrieving organisation users:", e);
    }
};
const getOrganisationUsersByOrgID = async (req, res) => {
    try {
        const data = await OrganisationUser.find({ organisation: req.params.id }).populate('organisation');
        console.log("Organisation users retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
        console.log("Error occured retrieving organisation users:", e);
    }
};
const addOrganisationUser = async (req, res) => {
    try {
        const data = await OrganisationUser.create(req.body);
        res.status(200).json(data);
        console.log("New organisation user has been added to database!");
    }
    catch (e) {
        console.log("Error trying to add organisation user:", e);
    }
};
const getOrganisationUser = async (req, res) => {
    try {
        const data = await OrganisationUser.findById(req.params.id);
        console.log("Organisation user retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        console.log("Error occured retrieving organisation user:", e);
    }
};
const getOrganisationUserByEmail = async (req, res) => {
    const { email_id } = req.params;
    try {
        const data = await OrganisationUser.findOne({ email_id });
        console.log("Organisation user retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        console.log("Error occured retrieving organisation user:", e);
    }
};
const editOrganisationUser = async (req, res) => {
    const { id } = req.params;
    const { email_id, first_name, last_name, dob, organisation, joining_date } = req.body;
    try {
        const updatedUser = await OrganisationUser.findByIdAndUpdate(id, { email_id, first_name, last_name, dob, organisation, joining_date }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        console.log('User updated:', updatedUser);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteOrganisationUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await OrganisationUser.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
        console.log('User deleted:', deletedUser);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const sendOTP = async (req, res) => {
    const { email_id } = req.params;
    try {
        const user = await OrganisationUser.findOne({ email_id });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        user.otp = otp;
        var dt1 = (new Date()).getTime();
        user.otpExpiration = new Date(dt1 + 900000); // OTP expires in 15 minutes
        await user.save();
        // Transporter setup for gmail (password is app password)
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "tmsbackend3@gmail.com",
                pass: "rtnxnaudkzekgpmc",
            },
        });
        const mailOptions = {
            from: 'tmsbackend3@gmail.com',
            to: email_id,
            subject: 'Your OTP for login',
            text: `Your OTP is: ${otp}. It is valid for 15 minutes.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
                return res.status(500).json({ success: false, message: 'Failed to send OTP' });
            }
            console.log('OTP sent:', info.response);
            return res.status(200).json({ success: true, message: 'OTP sent successfully' });
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const verifyOTP = async (req, res) => {
    const { email_id, otp } = req.body;
    const user = await OrganisationUser.findOne({ email_id });
    if (!user) {
        return res.status(404).json({ valid: false, message: 'User not found' });
    }
    if (user.otp == otp && user.otpExpiration && user.otpExpiration.getTime() > Date.now()) {
        return res.status(200).json({ valid: true, message: 'OTP is valid' });
    }
    else
        return res.status(400).json({ valid: false, message: 'Invalid or expired OTP' });
};
export { getOrganisationUser, getOrganisationUsersByOrgID, getOrganisationUsers, addOrganisationUser, editOrganisationUser, deleteOrganisationUser, getOrganisationUserByEmail, sendOTP, verifyOTP };
//# sourceMappingURL=organisationUserController.mjs.map