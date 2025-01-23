/**
 * src/routes/apiRoutes.js
 * Ansvar:
 * - Definiera API-logiken och koppla samman endpoints med service layer.
 *
 * Uppgifter:
 * - Hanterar inkommande HTTP-förfrågningar (GET, POST, PUT, DELETE).
 * - Returnerar svar med korrekta HTTP-statuskoder och JSON-data.
 */

const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");

// Import av routes
const authRoutes = require("./authRoutes");
const bikeRoutes = require("./bikeRoutes");
const cityRoutes = require("./cityRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const stationRoutes = require("./stationRoutes");
const tripRoutes = require("./tripRoutes");
const userRoutes = require("./userRoutes");
const zoneRoutes = require("./zoneRoutes");
const settingRoutes = require("./settingRoutes");

// Koppla endpoints till routefil
router.use("/auth", authRoutes);
router.use("/bike", bikeRoutes);
router.use("/city", cityRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/station", stationRoutes);
router.use("/trip", tripRoutes);
router.use("/user", userRoutes);
router.use("/zone", zoneRoutes);
router.use("/setting", settingRoutes);

// Rot-route
router.get("/", (req, res) => {
  const response = {
    message: "Welcome to the Test API!",
    endpoints: {
      auth: "/auth",
      bikes: "/bike",
      city: "/city",
      invoices: "/invoice",
      stations: "/station",
      trips: "/trip",
      zones: "/zone",
      users: "/user",
      settings: "/setting",
    },
  };

  res.status(200).send(JSON.stringify(response, null, 2));
});

module.exports = router;
