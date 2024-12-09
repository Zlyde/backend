/**
 * src/routes/bikeRoutes.js
 * Ansvar:
 * - Definiera API-logiken för cyklar och koppla samman med service layer.
 */

const express = require('express');
const router = express.Router();
const bikeService = require('../services/bikeService');

// GET: Hämta alla cyklar
router.get('/', async (req, res) => {
    try {
        const bikes = await bikeService.getAllBikes();
        res.status(200).json(bikes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta en specifik cykel
router.get('/:id', async (req, res) => {
    try {
        const bike = await bikeService.getBikeById(req.params.id);
        res.status(200).json(bike);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// POST: Lägg till en ny cykel
router.post('/', async (req, res) => {
    try {
        const newBike = await bikeService.addBike(req.body);
        res.status(201).json(newBike);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Uppdatera en cykel
router.put('/:id', async (req, res) => {
    try {
        const updatedBike = await bikeService.updateBike(req.params.id, req.body);
        if (!updatedBike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.status(200).json(updatedBike);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Ta bort en cykel
router.delete('/:id', async (req, res) => {
    try {
        const deletedBike = await bikeService.deleteBike(req.params.id);
        if (!deletedBike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.status(200).json(deletedBike);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;