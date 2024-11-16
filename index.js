require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/elsparkdb";

app.use(express.json())

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.get('/', (req, res) => res.send('API is running'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
