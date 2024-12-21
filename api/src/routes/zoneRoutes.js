/**
 * src/routes/zoneRoutes.js
 */

const express = require('express');
const router = express.Router();
const parkingZoneService = require('../services/zoneService');
const geoService = require('../services/geoService');


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

// // POST: Lägg till en ny parkeringszon
// router.post('/', async (req, res) => {
//     try {
//         const newZone = await parkingZoneService.addParkingZone(req.body);
//         res.status(201).json(newZone);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // PUT: Uppdatera en parkeringszon
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedZone = await parkingZoneService.updateParkingZone(req.params.id, req.body);
//         if (!updatedZone) return res.status(404).json({ error: 'Parking zone not found' });
//         res.status(200).json(updatedZone);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

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

// GET: Hämta cyklar i en viss parkerings-zon
router.get('/:id/bikes', async (req, res) => {
    try {
        const bikes = await geoService.getBikesInParkingZone(req.params.id);
        res.status(200).json(bikes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;