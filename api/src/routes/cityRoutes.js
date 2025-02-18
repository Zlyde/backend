/**
 * src/routes/cityRoutes.js
 * Lager: "Routing Layer"
 * 
 * Rutter:
 * - GET /: Hämta alla städer
 * - GET /:query: Hämta en specifik stad
 * - PUT /:id: Uppdatera en stad
 * - GET /:id/bikes: Hämta alla cyklar inom en viss stad
 * - GET /:id/bikes/:bikeId: Hämta en specifik cykel inom en viss stad
 */

const express = require("express");
const router = express.Router();
const geoService = require("../services/geoService");
const cityService = require("../services/cityService");

// GET: Hämta alla städer
router.get("/", async (req, res) => {
  try {
    const city = await cityService.getAllCities();
    res.status(200).json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Hämta en specifik stad
router.get("/:query", async (req, res) => {
  try {
    const getQuery = req.params.query;
    const isNum = !isNaN(getQuery);
    let query;
    if (isNum) {
      query = { city_id: Number(getQuery) };
    } else {
      query = { name: getQuery };
    }
    const city = await cityService.getCityByQuery(query);
    res.status(200).json(city);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// PUT: Uppdatera en stad
router.put("/:id", async (req, res) => {
  try {
    const updatedCity = await cityService.updateCity(req.params.id, req.body);
    res.status(200).json(updatedCity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Hämta alla cyklar inom en viss stad
router.get("/:id/bikes", async (req, res) => {
  const cityId = req.params.id;

  try {
    // Anropa geoService för att hantera logiken
    const bikes = await geoService.getBikesInCity(cityId);

    // Returnera cyklarna
    res.status(200).json({ bikes });
  } catch (error) {
    console.error(
      `Error fetching bikes for city with ID ${cityId}:`,
      error.message,
    );

    // Hantera fel baserat på typ
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    if (
      error.message.includes("does not have a defined boundary or location")
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
