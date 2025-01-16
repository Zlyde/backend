const geoData = require('../data/geoData');

/**
 * Validera ID
 * @param {String} id - ID som ska valideras
 * @param {String} type - Typ av ID (ex. "Charging station" eller "Parking zone")
 */
const validateId = (id, type) => {
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error(`${type} ID is invalid`);
    }
};

/**
 * Hämta cyklar inom en stads geografiska område
 * @param {String} cityId - ID för staden
 * @returns {Array} - Lista med cyklar
 */
const getBikesInCity = async (cityId) => {
    try {
        validateId(cityId, 'City');

        const bikes = await geoData.getBikesInCity(cityId);
        if (!bikes || bikes.length === 0) {
            throw new Error(`No bikes found in city with ID ${cityId}`);
        }

        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes for city ${cityId}:`, error.message);
        throw error;
    }
};

/**
 * Hämta cyklar inom en laddstations geografiska område
 * @param {String} stationId - ID för laddstationen
 * @returns {Array} - Lista med cyklar
 */
const getBikesInChargingStation = async (stationId) => {
    try {
        validateId(stationId, 'Charging station');

        const bikes = await geoData.getBikesInChargingStation(stationId);
        if (!bikes || bikes.length === 0) {
            throw new Error(`No bikes found in charging station with ID ${stationId}`);
        }

        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes for charging station ${stationId}:`, error.message);
        throw error;
    }
};

/**
 * Hämta cyklar inom en parkeringszons geografiska område
 * @param {String} zoneId - ID för parkeringszonen
 * @returns {Array} - Lista med cyklar
 */
const getBikesInParkingZone = async (zoneId) => {
    try {
        validateId(zoneId, 'Parking zone');

        const bikes = await geoData.getBikesInParkingZone(zoneId);
        if (!bikes || bikes.length === 0) {
            throw new Error(`No bikes found in parking zone with ID ${zoneId}`);
        }

        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes for parking zone ${zoneId}:`, error.message);
        throw error;
    }
};

/**
 * Kontrollera om en koordinat är inom en parkeringszon
 * @param {Array} coordinates - Array av [longitude, latitude]
 * @returns {Boolean} - True om koordinaterna är i en parkeringszon
 */
const isInParkingZone = async (coordinates) => {
    try {
        const parkingZones = await geoData.getBikesInParkingZone();
        return parkingZones.some(zone => geoData.isPointWithinGeometry(zone.location, coordinates));
    } catch (error) {
        console.error('Error checking parking zone:', error.message);
        throw error;
    }
};

/**
 * Kontrollera om en koordinat är inom en laddstation
 * @param {Array} coordinates - Array av [longitude, latitude]
 * @returns {Boolean} - True om koordinaterna är i en laddstation
 */
const isInChargingStation = async (coordinates) => {
    try {
        const chargingStations = await geoData.getBikesInChargingStation();
        return chargingStations.some(station => geoData.isPointWithinGeometry(station.location, coordinates));
    } catch (error) {
        console.error('Error checking charging station:', error.message);
        throw error;
    }
};

module.exports = {
    getBikesInChargingStation,
    getBikesInParkingZone,
    getBikesInCity,
    isInParkingZone,
    isInChargingStation,
};
