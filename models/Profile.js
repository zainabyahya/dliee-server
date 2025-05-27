const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        assessmentScore: {
            type: Number,
            default: 0,
        },
        currentLevel: {
            type: String,
            enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
            default: "A1",
        },
        currentlyDoing: {
            type: Schema.Types.ObjectId,
            ref: "Module",
            default: null,
        }

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
