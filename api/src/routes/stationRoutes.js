/**
 * src/routes/stationRoutes.js
 */

const express = require('express');
const router = express.Router();
const chargingStationService = require('../services/stationService');
const geoData = require('../data/geoData');

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

// POST: Lägg till en ny laddstation
router.post('/', async (req, res) => {
    try {
        const newStation = await chargingStationService.addChargingStation(req.body);
        res.status(201).json(newStation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Uppdatera en laddstation
router.put('/:id', async (req, res) => {
    try {
        const updatedStation = await chargingStationService.updateChargingStation(req.params.id, req.body);
        res.status(200).json(updatedStation);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

// GET: Hämta alla cyklar inom en viss laddstation
router.get('/:id/bikes', async (req, res) => {
    const stationId = req.params.id;

    try {
        // Validera att stationId är tillgängligt och giltigt
        if (!stationId || isNaN(stationId)) {
            return res.status(400).json({ error: 'Invalid station ID' });
        }

        // Använd getBikesInChargingStation från geoData för att hämta cyklar
        const bikes = await geoData.getBikesInChargingStation(stationId);

        // Kontrollera om några cyklar hittades
        if (!bikes || bikes.length === 0) {
            return res.status(404).json({ error: `No bikes found in charging station with ID ${stationId}` });
        }

        // Returnera cyklarna
        res.status(200).json({ bikes });
    } catch (error) {
        // Hantera olika typer av fel från geoData
        console.error(`Error fetching bikes for charging station with ID ${stationId}:`, error.message);

        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('does not have a defined boundary or location')) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;