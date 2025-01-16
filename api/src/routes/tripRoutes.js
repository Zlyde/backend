/**
 * src/routes/tripRoutes.js
 */

const express = require('express');
const router = express.Router();
const tripService = require('../services/tripService');

// GET: Hämta alla resor
router.get('/', async (req, res) => {
    try {
        const trips = await tripService.getAllTrips();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta en specifik resa
router.get('/:tripId', async (req, res) => {
    try {
        const trip = await tripService.getTripById(req.params.tripId);
        res.status(200).json(trip);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// POST: Påbörja ny resa
router.post('/start', async (req, res) => {
    console.log(req.body);
    
    try {
        const newTrip = await tripService.startTrip(req.body);
        res.status(201).json(newTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Avsluta en specifik resa
router.put('/end/:trip', async (req, res) => {
    try {
        console.log(req.params.trip);
        
        const endedTrip = await tripService.endTrip(req.params.trip);
        res.status(200).json(endedTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;