const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());

const helmet = require('helmet');
app.use(helmet());

const cors = require('cors');
app.use(cors());


const connectDB = require("./database.js");
connectDB();

const areaRoutes = require('./area/areaRoutes');
const skillRoutes = require('./skill/skillRoutes');
const moduleRoutes = require('./module/moduleRoutes.js');
const topicRoutes = require('./topic/topicRoutes');
const userRoutes = require('./user/userRoutes');
const profileRoutes = require('./profile/profileRoutes');
const questionnaireRoutes = require('./assessmentQuestionnaire/questionnaireRoutes');
const assessmentRoutes = require('./assessment/assessmentRoutes');
const competencyRoutes = require('./competency/competencyRoutes');
const authRoutes = require('./auth/authRoutes');
const communityRouter = require('./communityPost/communityPostRoutes')
const libraryRouter = require('./libraryPost/libraryPostsRoutes.js')
const contactRoute = require("./contact/contactRoutes.js");

app.use("/api/contact", contactRoute);
app.use('/areas', areaRoutes);
app.use('/skills', skillRoutes);
app.use('/modules', moduleRoutes);
app.use('/topics', topicRoutes);
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/assessment', assessmentRoutes);
app.use('/competency', competencyRoutes);
app.use('/auth', authRoutes);
app.use('/community', communityRouter);
app.use('/library', libraryRouter);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
