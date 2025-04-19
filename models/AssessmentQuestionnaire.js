const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const optionSchema = new Schema({
    text: { type: String, required: true },
    score: { type: Number, required: true } // typically 0 to 4 or as your scoring requires
});

// Change the competency field to reference the Competency model
const questionSchema = new Schema({
    text: { type: String, required: true },
    // Replace the string field with a reference to the Competency document
    competency: {
        type: Schema.Types.ObjectId,
        ref: "Competency",
        required: true
    },
    options: [optionSchema]
});

const assessmentQuestionnaireSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        questions: [questionSchema],
    },
    { timestamps: true }
);

module.exports = model("AssessmentQuestionnaire", assessmentQuestionnaireSchema);
