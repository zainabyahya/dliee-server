const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup (Register) function
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, password } = req.body;

        // Check if a user with this phone number already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "User with this phone number already exists." });
        }

        // Hash the password using bcrypt (10 salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            firstName,
            lastName,
            phoneNumber,
            password: hashedPassword,
        });
        await user.save();

        // Optionally, generate a JWT token to send right after signup
        const token = jwt.sign(
            { userId: user._id, phoneNumber: user.phoneNumber },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login function
exports.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Find the user by phone number
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Compare the entered password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, phoneNumber: user.phoneNumber },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
