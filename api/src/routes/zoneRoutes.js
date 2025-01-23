/**
 * src/routes/zoneRoutes.js
 */

const express = require('express');
const router = express.Router();
const parkingZoneService = require('../services/zoneService');
const geoData = require('../data/geoData');

// GET: Hämta alla parkeringszoner
router.get('/', async (req, res) => {
    try {
        const zones = await parkingZoneService.getAllParkingZones();
        res.status(200).json(zones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta en specifik parkeringszon
router.get('/:id', async (req, res) => {
    try {
        const zone = await parkingZoneService.getParkingZoneById(req.params.id);
        res.status(200).json(zone);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// PUT: Uppdatera en parkeringszon
router.put('/:id', async (req, res) => {
  try {
      const zone = await parkingZoneService.updateZone(req.params.id, req.body);
      res.status(200).json(zone);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Lägg till en ny parkeringszon
router.post('/', async (req, res) => {
    try {
        const newZone = await parkingZoneService.addZone(req.body);
        res.status(201).json(newZone);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Ta bort en parkeringszon
router.delete('/:id', async (req, res) => {
    try {
        const deletedZone = await parkingZoneService.deleteParkingZone(req.params.id);
        if (!deletedZone) return res.status(404).json({ error: 'Parking zone not found' });
        res.status(200).json(deletedZone);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta alla cyklar inom en viss parkeringszon
router.get('/:id/bikes', async (req, res) => {
    const zoneId = req.params.id;

    try {
        // Validera att zoneId är tillgängligt och giltigt
        if (!zoneId || isNaN(zoneId)) {
            return res.status(400).json({ error: 'Invalid parking zone ID' });
        }

        // Använd getBikesInParkingZone från geoData för att hämta cyklar
        const bikes = await geoData.getBikesInParkingZone(zoneId);

        // Kontrollera om några cyklar hittades
        if (!bikes || bikes.length === 0) {
            return res.status(404).json({ error: `No bikes found in parking zone with ID ${zoneId}` });
        }

        // Returnera cyklarna
        res.status(200).json({ bikes });
    } catch (error) {
        // Hantera olika typer av fel från geoData
        console.error(`Error fetching bikes for parking zone with ID ${zoneId}:`, error.message);

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