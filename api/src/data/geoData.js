/**
 * GeoData - Hanterar geografisk data och operationer
 * -------------------------------------------------
 * Denna modul innehåller funktioner för att:
 * - Kontrollera om en punkt är inom ett geografiskt område.
 * - Hämta cyklar inom definierade geografiska områden (stad, laddstation, parkeringszon).
 * - Utföra generella geografiska operationer.
 */

const turf = require("@turf/turf");
const Bike = require("../models/bikeModel");
const ChargingStation = require("../models/stationModel");
const ParkingZone = require("../models/zoneModel");
const City = require("../models/cityModel");

/**
 * Kontrollera om en punkt (koordinater) är inom ett område (GeoJSON)
 * @param {Object} geometry - GeoJSON-område
 * @param {Array} pointCoords - Array [longitude, latitude]
 * @returns {Boolean} - True om punkten är inom området, annars false
 */
const isPointWithinGeometry = (geometry, pointCoords) => {
  try {
    // Create GeoJSON objects for the point and the polygon
    const turfPoint = turf.point(pointCoords);
    const turfPolygon = turf.polygon(geometry.coordinates);

    // Check if the point is within the polygon
    return turf.booleanPointInPolygon(turfPoint, turfPolygon);
  } catch (error) {
    console.error("Error in isPointWithinGeometry:", error.message);
    throw error;
  }
};

/**
 * Hämta cyklar inom ett geografiskt område
 * @param {Object} geometry - GeoJSON-område
 * @returns {Array} - Lista med cyklar
 */
const getBikesWithinArea = async (geometry) => {
  try {
    const bikes = await Bike.find({
      location: {
        $geoWithin: {
          $geometry: geometry,
        },
      },
    });

    return bikes;
  } catch (error) {
    console.error("Error fetching bikes within area:", error.message);
    throw error;
  }
};

/**
 * Hämta cyklar inom ett definierat område baserat på en modell
 * @param {String} id - ID för objektet (stad, laddstation eller parkeringszon)
 * @param {Object} model - MongoDB-modell att söka i
 * @param {String} type - Typ av objekt (City, Charging Station, Parking Zone)
 * @returns {Array} - Lista med cyklar
 */
const getBikesInDefinedArea = async (id, model, type) => {
  try {
    const area = await model.findOne({ [`${type.toLowerCase()}_id`]: id });
    console.log("Area:", area);

    if (!area) {
      throw new Error(`${type} with ID ${id} not found`);
    }

    if (!area.boundary && !area.location) {
      throw new Error(
        `${type} with ID ${id} does not have a defined boundary or location`,
      );
    }

    const geometry = area.boundary || area.location; // Prioritera boundary för städer, location för andra
    console.log("Geometry:", geometry);

    return await getBikesWithinArea(geometry);
  } catch (error) {
    console.error(
      `Error fetching bikes in ${type.toLowerCase()} with ID ${id}:`,
      error.message,
    );
    throw error;
  }
};

/**
 * Hämta cyklar inom en stads geografiska område
 * @param {String} cityId - ID för staden
 * @returns {Array} - Lista med cyklar
 */
const getBikesInCity = async (cityId) => {
  return getBikesInDefinedArea(cityId, City, "City");
};

/**
 * Hämta cyklar inom en laddstations geografiska område
 * @param {String} stationId - ID för laddstationen
 * @returns {Array} - Lista med cyklar
 */
const getBikesInChargingStation = async (stationId) => {
  return getBikesInDefinedArea(stationId, ChargingStation, "charging_station");
};

/**
 * Hämta cyklar inom en parkeringszons geografiska område
 * @param {String} zoneId - ID för parkeringszonen
 * @returns {Array} - Lista med cyklar
 */
const getBikesInParkingZone = async (zoneId) => {
  return getBikesInDefinedArea(zoneId, ParkingZone, "parking_zone");
};

module.exports = {
  isPointWithinGeometry,
  getBikesWithinArea,
  getBikesInCity,
  getBikesInChargingStation,
  getBikesInParkingZone,
  getBikesInDefinedArea,
};
