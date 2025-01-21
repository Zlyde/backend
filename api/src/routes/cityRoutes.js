/**
 * src/routes/cityRoutes.js
 */

const express = require('express');
const router = express.Router();
const geoService = require('../services/geoService');
const cityService = require('../services/cityService');

// GET: Hämta alla städer
router.get('/', async (req, res) => {
    try {
        const city = await cityService.getAllCities();
        res.status(200).json(city);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
  try {
      const city = await cityService.updateCity(req.params.id, req.body);
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

// GET: Hämta alla cyklar inom en viss stad
router.get('/:id/bikes', async (req, res) => {
    const cityId = req.params.id;

    try {
        // Hämta staden baserat på ID
        const city = await City.findOne({ city_id: cityId });
        if (!city) {
            return res.status(404).json({ error: `City with ID ${cityId} not found` });
        }

        if (!city.boundary) {
            return res.status(400).json({ error: 'City boundary is not defined' });
        }

        // Hämta cyklar inom stadens boundary
        const bikes = await geoService.getBikesWithinArea(city.boundary);
        if (!bikes || bikes.length === 0) {
            return res.status(404).json({ error: `No bikes found in city with ID ${cityId}` });
        }

        res.status(200).json({ bikes });
    } catch (error) {
        console.error(`Error fetching bikes for city with ID ${cityId}:`, error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;