/**
 * src/routes/stationRoutes.js
 * Lager: "Routing Layer"
 * 
 * Rutter:
 * - GET /: Hämta alla laddstationer
 * - GET /:id: Hämta en specifik laddstation
 * - POST /: Lägg till en ny laddstation
 * - PUT /:id: Uppdatera en laddstation 
 * - DELETE /:id: Ta bort en laddstation
 * - GET /:id/bikes: Hämta alla cyklar inom en viss laddstation
 */

const express = require("express");
const router = express.Router();
const chargingStationService = require("../services/stationService");
const geoService = require("../services/geoService");

// GET: Hämta alla laddstationer
router.get("/", async (req, res) => {
  try {
    const stations = await chargingStationService.getAllChargingStations();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Hämta en specifik laddstation
router.get("/:id", async (req, res) => {
  try {
    const station = await chargingStationService.getChargingStationById(
      req.params.id,
    );
    res.status(200).json(station);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// POST: Lägg till en ny laddstation
router.post("/", async (req, res) => {
  try {
    const newStation = await chargingStationService.addChargingStation(
      req.body,
    );
    res.status(201).json(newStation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Uppdatera en laddstation
router.put("/:id", async (req, res) => {
  try {
    const updatedStation = await chargingStationService.updateChargingStation(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedStation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Ta bort en laddstation
router.delete("/:id", async (req, res) => {
  try {
    const deletedStation = await chargingStationService.deleteChargingStation(
      req.params.id,
    );
    res.status(200).json(deletedStation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Hämta alla cyklar inom en viss laddstation
router.get("/:id/bikes", async (req, res) => {
  const stationId = req.params.id;

  try {
    // Anropa geoService för att hantera logiken
    const bikes = await geoService.getBikesInChargingStation(stationId);

    // Returnera cyklarna
    res.status(200).json({ bikes });
  } catch (error) {
    console.error(
      `Error fetching bikes for charging station with ID ${stationId}:`,
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
