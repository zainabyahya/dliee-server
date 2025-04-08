const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const resourceSchema = new Schema(
    {
        title: { type: String, required: true },
        type: { type: String }, // e.g. "video", "pdf", "article", etc.
        url: { type: String },  // Link to the resource if it’s hosted somewhere
        description: { type: String },
        skill: {
            type: Schema.Types.ObjectId,
            ref: 'Skill',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = model('Resource', resourceSchema);