const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const helmet = require('helmet');
app.use(helmet());

const cors = require('cors');
app.use(cors());


// Example route
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
