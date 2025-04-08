const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const skillSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        area: {
            type: Schema.Types.ObjectId,
            ref: 'Area',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = model('Skill', skillSchema);
