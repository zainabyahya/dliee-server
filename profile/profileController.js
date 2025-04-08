const Profile = require('../models/Profile');

// Create a new profile (should be linked to a user)
exports.createProfile = async (req, res) => {
    try {
        const { user, assessmentScore, favorites, currentLevel, profileImage, currentlyDoing } = req.body;
        const profile = new Profile({ user, assessmentScore, favorites, currentLevel, profileImage, currentlyDoing });
        await profile.save();
        res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve profile by user id
exports.getProfileByUser = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile)
            return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ profile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update profile by user id
exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            req.body,
            { new: true }
        );
        if (!updatedProfile)
            return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete profile by user id
exports.deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await Profile.findOneAndDelete({ user: req.params.userId });
        if (!deletedProfile)
            return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
