const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const responseSchema = new Schema({
    // Stores the _id of the question from the questionnaire (each subdocument gets an _id automatically)
    questionId: { type: Schema.Types.ObjectId, required: true },
    // Snapshot of the chosen option
    selectedOption: {
        text: { type: String, required: true },
        score: { type: Number, required: true }
    }
});

const assessmentResultSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        questionnaire: { type: Schema.Types.ObjectId, ref: "AssessmentQuestionnaire", required: true },
        responses: [responseSchema],
        totalScore: { type: Number, default: 0 },
        // Based on the total score, you can map to a level: A1, A2, B1, B2, C1, or C2
        level: {
            type: String,
            enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
            default: "A1"
        }
    },
    { timestamps: true }
);

module.exports = model("AssessmentResult", assessmentResultSchema);
