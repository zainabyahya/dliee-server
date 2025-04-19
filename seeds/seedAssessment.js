// seeds/seedAssessment.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

// Import the AssessmentQuestionnaire model
const AssessmentQuestionnaire = require('../models/AssessmentQuestionnaire');

// Define the path to your JSON file
const filePath = path.join(__dirname, 'digcompedu_assessment_questions_ar.json');

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        // Read the JSON file containing the questionnaire
        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                process.exit(1);
            }
            try {
                // Parse the JSON data
                const questionnaireData = JSON.parse(data);

                // Optional: Check if a questionnaire already exists to avoid duplicates
                const count = await AssessmentQuestionnaire.countDocuments();
                if (count > 0) {
                    console.log("Assessment questionnaire already exists. Exiting seeder.");
                    process.exit(0);
                }

                // Create and save the questionnaire document
                const questionnaire = new AssessmentQuestionnaire(questionnaireData);
                const savedQuestionnaire = await questionnaire.save();
                console.log("Assessment questionnaire seeded successfully:", savedQuestionnaire);
                process.exit(0);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                process.exit(1);
            }
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });
