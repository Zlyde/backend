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
const userRoutes = require('./userRoutes');
const cityRoutes = require('./cityRoutes');


// Koppla endpoints till routefil
router.use('/bike', bikeRoutes);
router.use('/user', userRoutes);
router.use('/city', cityRoutes);


// Rot-route
router.get('/', (req, res) => {
    const response = {
        message: "Welcome to the Test API!",
        endpoints: {
            bikes: "/api/bike",
            users: "/api/user",
            city: "/api/city",
        },
    };

    res.status(200).send(JSON.stringify(response, null, 2));
});

module.exports = router; 