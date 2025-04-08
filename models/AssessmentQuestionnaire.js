const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const optionSchema = new Schema({
    text: { type: String, required: true },
    score: { type: Number, required: true } // typically 0 to 4
});

const questionSchema = new Schema({
    text: { type: String, required: true },
    // For example, "Digital Resources", "Professional Engagement", etc.
    competency: { type: String, required: true },
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
