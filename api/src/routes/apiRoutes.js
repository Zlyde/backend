/**
 * src/routes/apiRoutes.js
 * Ansvar:
 * - Definiera API-logiken och koppla samman endpoints med service layer.
 * 
 * Uppgifter: 
 * - Hanterar inkommande HTTP-förfrågningar (GET, POST, PUT, DELETE).
 * - Returnerar svar med korrekta HTTP-statuskoder och JSON-data.
 * 
 * Struktur:
 * - Gruppindelning baserat på resurser (bikes, users, trips).
 */

const express = require('express');
const router = express.Router();

// Import av routes
const bikeRoutes = require('./bikeRoutes');
const userRoutes = require('./userRoutes');


// Koppla endpoints till routefil
router.use('/bike', bikeRoutes);
router.use('/user', userRoutes);


// Rot-route
router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the Test API!",
        endpoints: {
            bikes: "/api/bike",
            users: "/api/user",
            trips: "/api/trip"
        }
    });
});

module.exports = router; 