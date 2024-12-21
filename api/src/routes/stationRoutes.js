/**
 * src/routes/stationRoutes.js
 */

const express = require('express');
const router = express.Router();
const chargingStationService = require('../services/stationService');
const geoService = require('../services/geoService');

// GET: Hämta alla laddstationer
router.get('/', async (req, res) => {
    try {
        const stations = await chargingStationService.getAllChargingStations();
        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta en specifik laddstation
router.get('/:id', async (req, res) => {
    try {
        const station = await chargingStationService.getChargingStationById(req.params.id);
        res.status(200).json(station);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// // POST: Lägg till en ny laddstation
// router.post('/', async (req, res) => {
//     try {
//         const newStation = await chargingStationService.addChargingStation(req.body);
//         res.status(201).json(newStation);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// PUT: Uppdatera en laddstation
router.put('/:id', async (req, res) => {
    try {
        const updatedStation = await chargingStationService.updateChargingStation(req.params.id, req.body);
        res.status(200).json(updatedStation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Ta bort en laddstation
router.delete('/:id', async (req, res) => {
    try {
        const deletedStation = await chargingStationService.deleteChargingStation(req.params.id);
        res.status(200).json(deletedStation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta alla cyklar på en specifik laddstation
router.get('/:id/bikes', async (req, res) => {
    try {
        const bikes = await geoService.getBikesInChargingStation(req.params.id);
        res.status(200).json(bikes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;