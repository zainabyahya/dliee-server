const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const areaSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        // You can add more fields here if needed (e.g., icon, code, etc.)
    },
    { timestamps: true }
);

module.exports = model('Area', areaSchema);
