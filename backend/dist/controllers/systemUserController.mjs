import { SystemUser } from "../models/systemUserModel.mjs";
import nodemailer from "nodemailer";
const getSystemUsers = async (req, res) => {
    try {
        const data = await SystemUser.find({});
        res.status(200).json(data);
        console.log("System users retrieved!");
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
};
const addSystemUser = async (req, res) => {
    try {
        const data = await SystemUser.create(req.body);
        res.status(200).json(data);
        console.log("New system user has been added to database!");
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
};
const getSystemUser = async (req, res) => {
    try {
        const data = await SystemUser.findById(req.params.id);
        console.log("System user retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
};
const getSystemUserByEmail = async (req, res) => {
    const { email_id } = req.params;
    try {
        const data = await SystemUser.findOne({ email_id });
        console.log("System user retrieved!");
        res.status(200).json(data);
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
};
const sendOTP = async (req, res) => {
    const { email_id } = req.params;
    try {
        const user = await SystemUser.findOne({ email_id });
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
    const user = await SystemUser.findOne({ email_id });
    if (!user) {
        return res.status(404).json({ valid: false, message: 'User not found' });
    }
    if (user.otp == otp && user.otpExpiration && user.otpExpiration.getTime() > Date.now()) {
        return res.status(200).json({ valid: true, message: 'OTP is valid' });
    }
    else
        return res.status(400).json({ valid: false, message: 'Invalid or expired OTP' });
};
export { getSystemUsers, addSystemUser, getSystemUser, getSystemUserByEmail, sendOTP, verifyOTP };
//# sourceMappingURL=systemUserController.mjs.map