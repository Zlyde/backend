/**
 * src/data/geoData.js
 */

const mongoose = require('mongoose');
const Bike = require('../models/bikeModel');
const ChargingStation = require('../models/stationModel');
const ParkingZone = require('../models/zoneModel');
const City = require('../models/cityModel');

/**
 * Kontrollera om en punkt (koordinater) är inom ett område (GeoJSON)
 * @param {Object} geometry - GeoJSON-område
 * @param {Array} point - Array [longitude, latitude]
 * @returns {Boolean} - True om punkten är inom området, annars false
 */
const isPointWithinGeometry = (geometry, point) => {
    const geoJSON = mongoose.mongo;
    const polygon = new geoJSON.Geometry({
        type: geometry.type,
        coordinates: geometry.coordinates,
    });

    return polygon.contains({
        type: 'Point',
        coordinates: point,
    });
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
        console.error('Error fetching bikes within area:', error.message);
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

        if (!area) {
            throw new Error(`${type} with ID ${id} not found`);
        }

        if (!area.boundary && !area.location) {
            throw new Error(`${type} with ID ${id} does not have a defined boundary or location`);
        }

        const geometry = area.boundary || area.location; // Prioritera boundary för städer, location för andra
        return await getBikesWithinArea(geometry);
    } catch (error) {
        console.error(`Error fetching bikes in ${type.toLowerCase()} with ID ${id}:`, error.message);
        throw error;
    }
};

/**
 * Hämta cyklar inom en stads geografiska område
 * @param {String} cityId - ID för staden
 * @returns {Array} - Lista med cyklar
 */
const getBikesInCity = async (cityId) => {
    return getBikesInDefinedArea(cityId, City, 'City');
};

/**
 * Hämta cyklar inom en laddstations geografiska område
 * @param {String} stationId - ID för laddstationen
 * @returns {Array} - Lista med cyklar
 */
const getBikesInChargingStation = async (stationId) => {
    return getBikesInDefinedArea(stationId, ChargingStation, 'Charging Station');
};

/**
 * Hämta cyklar inom en parkeringszons geografiska område
 * @param {String} zoneId - ID för parkeringszonen
 * @returns {Array} - Lista med cyklar
 */
const getBikesInParkingZone = async (zoneId) => {
    return getBikesInDefinedArea(zoneId, ParkingZone, 'Parking Zone');
};

module.exports = {
    isPointWithinGeometry,
    getBikesWithinArea,
    getBikesInCity,
    getBikesInChargingStation,
    getBikesInParkingZone,
};
