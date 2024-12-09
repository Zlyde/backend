/**
 * App.js
 * Ansvar: 
 * - Starta och konfigurera Express-applikationen.
 * - Ansluta mellanliggande lager (middleware) som hanterar JSON-data.
 * - Koppla API-logiken via rutter.
 * - Upprätta en anslutning till databasen.
 * - Lyssna på en specifik port.
 */

const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const { getDb } = require('./config/database');

const app = express();

// Middleware
app.use(express.json()); // För att hantera JSON i förfrågningar

// Koppla rutter
app.use('/api', apiRoutes); // Bas-URL: /api

// Starta servern
// const PORT = 5001;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// Starta servern med databas...
const startServer = async () => {
    try {
        // Anslut till databasen
        await getDb(); // Hämtar databasen
        console.log('Successfully connected to the database.');

        // Koppla rutter
        app.use('/api', apiRoutes); // Bas-URL: /api

        // Starta servern
        const PORT = 5001;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1); // Avsluta om det misslyckas
    }
};

// Anropa funktionen för att starta servern
startServer();

module.exports = app;