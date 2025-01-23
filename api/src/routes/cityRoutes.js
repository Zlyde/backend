/**
 * src/routes/cityRoutes.js
 */

const express = require('express');
const router = express.Router();
const geoService = require('../services/geoService');
const cityService = require('../services/cityService');
const geoData = require('../data/geoData');

// GET: Hämta alla städer
router.get('/', async (req, res) => {
    try {
        const city = await cityService.getAllCities();
        res.status(200).json(city);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta en specifik stad
router.get('/:query', async (req, res) => {
  try {
    const getQuery = req.params.query
    const isNum = !isNaN(getQuery)
    let query
    if (isNum) {
      query = {city_id: Number(getQuery)}
    } else {
      query = { name: getQuery }
    }
    const city = await cityService.getCityByQuery(query);
    res.status(200).json(city);
  } catch (err) {
      res.status(404).json({ error: err.message });
  }
});

// PUT: Uppdatera en stad
router.put('/:id', async (req, res) => {
    try {
        const updatedCity = await cityService.updateCity(req.params.id, req.body);
        res.status(200).json(updatedCity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Hämta alla cyklar inom en viss stad
router.get('/:id/bikes', async (req, res) => {
    const cityId = req.params.id;

    try {
        // Validera att cityId är tillgängligt och giltigt
        if (!cityId || isNaN(cityId)) {
            return res.status(400).json({ error: 'Invalid city ID' });
        }

        // Använd getBikesInCity från geoData för att hämta cyklar
        const bikes = await geoData.getBikesInCity(cityId);

        // Kontrollera om några cyklar hittades
        if (!bikes || bikes.length === 0) {
            return res.status(404).json({ error: `No bikes found in city with ID ${cityId}` });
        }

        // Returnera cyklarna
        res.status(200).json({ bikes });
    } catch (error) {
        // Hantera olika typer av fel från geoData
        console.error(`Error fetching bikes for city with ID ${cityId}:`, error.message);

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