const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        assessmentScore: {
            type: Number,
            default: 0,
        },
        favorites: [
            {
                type: String,
            },
        ],
        currentLevel: {
            type: String,
            default: "Beginner",
        },
        profileImage: {
            type: String,
            default: "",
        },
        currentlyDoing: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
