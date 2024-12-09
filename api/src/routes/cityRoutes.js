/**
 * src/routes/cityRoutes.js
 * Ansvar:
 * - Definiera API-logiken för städer och koppla samman med service layer.
 */

const express = require('express');
const router = express.Router();
const cityService = require('../services/cityService');

// GET: Hämta alla användare
router.get('/', async (req, res) => {
    try {
        const city = await cityService.getAllCities();
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta en specifik användare
router.get('/:id', async (req, res) => {
    try {
        const city = await cityService.getCityById(req.params.id);
        res.status(200).json(city);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// POST: Lägg till en ny användare
router.post('/', async (req, res) => {
    try {
        const newCity = await cityService.addCity(req.body);
        res.status(201).json(newCity);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Uppdatera en användare
router.put('/:id', async (req, res) => {
    try {
        const updatedCity = await cityService.updateCity(req.params.id, req.body);
        if (!updatedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(updatedCity);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Ta bort en användare
router.delete('/:id', async (req, res) => {
    try {
        const deletedCity = await cityService.deleteCity(req.params.id);
        if (!deletedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(deletedCity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;