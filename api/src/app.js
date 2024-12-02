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
// const { connectToDatabase } = require('./config/database');

const app = express();

// Middleware
app.use(express.json()); // För att hantera JSON i förfrågningar

// Koppla rutter
app.use('/api', apiRoutes); // Bas-URL: /api

// Starta servern
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Starta servern med databas...
// const startServer = async () => {
//     try {
//         // Anslut till databasen
//         const db = await connectToDatabase();
//         app.locals.db = db; // Gör databasen tillgänglig för resten av appen

//         // Koppla rutter
//         app.use('/api', apiRoutes); // Bas-URL: /api

//         // Starta servern
//         const PORT = 5001;
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error('Failed to start the server:', error);
//         process.exit(1); // Avsluta om det misslyckas
//     }
// };

module.exports = app;