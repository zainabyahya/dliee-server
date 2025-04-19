const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const competencySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        // Connect to the Area model – each competency belongs to an Area
        area: { type: Schema.Types.ObjectId, ref: "Area", required: true }
    },
    { timestamps: true }
);

module.exports = model("Competency", competencySchema);
