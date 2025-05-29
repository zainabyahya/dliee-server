const User = require('../models/User');

// Retrieve a single user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log("🚀 ~ exports.getUserById= ~ user:", user)
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



