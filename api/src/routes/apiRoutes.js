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
const middleware = require('../middleware/auth')

// Import av routes
const authRoutes = require('./authRoutes');
const bikeRoutes = require('./bikeRoutes');
const cityRoutes = require('./cityRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const stationRoutes = require('./stationRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');
const zoneRoutes = require('./zoneRoutes');
const settingRoutes = require('./settingRoutes');

// API-version
const API_VERSION = '/api/v1';

// Skapa en versionerad router
const apiRouter = express.Router();

// Koppla endpoints till routefil
router.use('/auth', authRoutes);
router.use('/bike', bikeRoutes);
router.use('/city', cityRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/station', stationRoutes);
router.use('/trip', tripRoutes);
router.use('/user', userRoutes);
router.use('/zone', zoneRoutes);
router.use('/setting', settingRoutes);

// // Rot-route
// router.get('/', (req, res) => {
//     const response = {
//         message: "Welcome to the Test API!",
//         endpoints: {
//             auth: "/api/auth",
//             bikes: "/api/bike",
//             city: "/api/city",
//             invoices: "/api/invoice",
//             stations: "/api/station",
//             trips: "/api/trip",
//             zones: "/api/zone",
//             users: "/api/user",
//             settings: "/api/setting",
//         },
//     };

//     res.status(200).send(JSON.stringify(response, null, 2));
// });

// Lägg till rot-route för versionerad API
apiRouter.get('/', (req, res) => {
    const response = {
        message: "Welcome to the Test API!",
        endpoints: {
            auth: `${API_VERSION}/auth`,
            bikes: `${API_VERSION}/bike`,
            city: `${API_VERSION}/city`,
            invoices: `${API_VERSION}/invoice`,
            stations: `${API_VERSION}/station`,
            trips: `${API_VERSION}/trip`,
            zones: `${API_VERSION}/zone`,
            users: `${API_VERSION}/user`,
            settings: `${API_VERSION}/setting`,
        },
    };

    res.status(200).send(JSON.stringify(response, null, 2));
});

// Lägg till versioned router i huvud-router
router.use(API_VERSION, apiRouter);

module.exports = router; 