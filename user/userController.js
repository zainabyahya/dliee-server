const User = require('../models/User');

// Retrieve a single user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

