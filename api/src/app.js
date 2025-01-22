/**
 * App.js
 * Ansvar: 
 * - Starta och konfigurera Express-applikationen.
 * - Ansluta mellanliggande lager (middleware) som hanterar JSON-data.
 * - Koppla API-logiken via rutter.
 * - Upprätta en anslutning till databasen.
 * - Lyssna på en specifik port.
 */
require('dotenv').config()
const express = require('express');
const http = require('http')
const apiRoutes = require('./routes/apiRoutes');
const { getDb } = require('./config/database');
const cors = require('cors')
const passport = require('passport')
require('./passport')
const initSocket = require('./socket')
const bikeService = require('./services/bikeService')
const API_VERSION = require('./config/api_version'); // Importera API_VERSION

const app = express();
const server = http.createServer(app)
const io = initSocket(server) 
bikeService.setSocketInstance(io)

// Middleware
app.use(express.json()); // För att hantera JSON i förfrågningar
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(passport.initialize())

// Lägg till API-version som basväg
app.use('/api', apiRoutes); // Bas-URL: /api
// app.use(API_VERSION, apiRoutes); // Nu blir alla routes versionerade

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
        // app.use('/api', apiRoutes); // Bas-URL: /api

        // Starta servern
        const PORT = 5001;
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1); // Avsluta om det misslyckas
    }
};

// Anropa funktionen för att starta servern
startServer();

module.exports = {app, io};