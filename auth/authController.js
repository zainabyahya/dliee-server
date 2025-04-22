const User = require("../models/User");
const bcrypt = require("bcrypt");
const signToken = require("../utils/jwt");

// ── REGISTER ──────────────────────────────────────────────────────────────
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, password } = req.body;
        // 1) check exists
        if (await User.findOne({ phoneNumber })) {
            return res.status(400).json({ message: "رقم الهاتف مسجل بالفعل." });
        }
        // 2) create user (pre-save hook will hash)
        const user = new User({ firstName, lastName, phoneNumber, password });
        await user.save();
        // 3) sign token
        const token = signToken(user);
        res.status(201).json({
            message: "تم التسجيل بنجاح",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            },
            token
        });
    } catch (err) {
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
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ message: "بيانات اعتماد غير صحيحة" });
        }
        // only _id and phoneNumber go into the token
        const token = signToken(user);
        res.json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
