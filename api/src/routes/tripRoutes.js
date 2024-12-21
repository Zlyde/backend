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
router.post('/', async (req, res) => {
    try {
        const newTrip = await tripService.addTrip(req.body);
        res.status(201).json(newTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Uppdatera en specifik resa
router.put('/:tripId', async (req, res) => {
    try {
        const updatedTrip = await tripService.updateTrip(req.params.tripId, req.body);
        if (!updatedTrip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.status(200).json(updatedTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;