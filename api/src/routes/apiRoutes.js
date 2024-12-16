/**
 * src/routes/apiRoutes.js
 * Ansvar:
 * - Definiera API-logiken och koppla samman endpoints med service layer.
 * 
 * Uppgifter: 
 * - Hanterar inkommande HTTP-förfrågningar (GET, POST, PUT, DELETE).
 * - Returnerar svar med korrekta HTTP-statuskoder och JSON-data.
 */

const express = require('express');
const router = express.Router();

// Import av routes
const bikeRoutes = require('./bikeRoutes');
const cityRoutes = require('./cityRoutes');
const stationRoutes = require('./stationRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');
const zoneRoutes = require('./zoneRoutes');

// Koppla endpoints till routefil
router.use('/bike', bikeRoutes);
router.use('/city', cityRoutes);
router.use('/station', stationRoutes);
router.use('/trip', tripRoutes);
router.use('/user', userRoutes);
router.use('/zone', zoneRoutes);


// Rot-route
router.get('/', (req, res) => {
    const response = {
        message: "Welcome to the Test API!",
        endpoints: {
            bikes: "/api/bike",
            city: "/api/city",
            stations: "/api/station",
            trips: "/api/trip",
            zones: "/api/zone",
            users: "/api/user",
        },
    };

    res.status(200).send(JSON.stringify(response, null, 2));
});

module.exports = router; 