const User = require("../models/User");
const Profile = require("../models/Profile");
const signToken = require("../utils/jwt");

// ── REGISTER ──────────────────────────────────────────────────────────────
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, password } = req.body;

        if (await User.findOne({ phoneNumber })) {
            return res.status(400).json({ message: "رقم الهاتف مسجل بالفعل." });
        }

        const user = new User({ firstName, lastName, phoneNumber, password });
        await user.save();

        await Profile.create({
            user: user._id,
            currentLevel: "A1",
        });

        const token = signToken(user);
        res.status(201).json({
            message: "تم التسجيل بنجاح",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        console.error("Signup failed:", err);
        res.status(500).json({ message: err.message });
    }
};


// ── LOGIN ─────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "رقم الهاتف وكلمة المرور مطلوبان" });
        }

        const user = await User.findOne({ phoneNumber });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "بيانات اعتماد غير صحيحة" });
        }

        const token = signToken(user);
        res.json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
            },
            token,
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: err.message });
    }
};


exports.deleteMyAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        await Profile.findOneAndDelete({ user: userId });
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'Account and profile deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};