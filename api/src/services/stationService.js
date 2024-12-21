/**
 * src/services/stationService.js
 * Lager: "Service Layer"
 * 
 * Funktioner:
 * - Hämta alla laddstationer
 * - Hämta detaljer om en specifik laddstation
 * - Lägg till en laddstation
 * - Uppdatera en laddstation
 * - Radera en laddstation
 */

const chargingStationData = require('../data/stations');

// Hämta alla laddstationer
const getAllChargingStations = async () => {
    const stations = await chargingStationData.getAllChargingStations();
    if (!stations || stations.length === 0) {
        throw new Error('No charging stations found');
    }
    return stations;
};

// Hämta en specifik laddstation
const getChargingStationById = async (id) => {
    const zstationone = await chargingStationData.getChargingStationById(id);
    if (!station) {
        throw new Error(`Charging station with ID ${id} not found.`);
    }
    return station;
};

// // Lägg till en ny laddstation
// const addChargingStation = async (stationData) => {
//     try {
//         // Validera att platsdata finns och är korrekt formaterade
//         if (!stationData.location || !stationData.location.coordinates) {
//             throw new Error('Location coordinates are required.');
//         }
//         if (!Array.isArray(stationData.location.coordinates) || stationData.location.coordinates.length === 0) {
//             throw new Error('Location coordinates must be a non-empty array of arrays.');
//         }

//         // Kontrollera att geometritypen är giltig
//         const validTypes = ['Polygon', 'MultiPolygon'];
//         if (!validTypes.includes(stationData.location.type)) {
//             throw new Error(`Invalid geometry type: ${stationData.location.type}. Valid types are: ${validTypes.join(', ')}.`);
//         }

//         // Kontrollera att varje punkt i polygonen är en korrekt array av [longitude, latitude]
//         stationData.location.coordinates.forEach((polygon) => {
//             polygon.forEach((point) => {
//                 if (!Array.isArray(point) || point.length !== 2 || 
//                     typeof point[0] !== 'number' || typeof point[1] !== 'number') {
//                     throw new Error('Each point in the coordinates must be an array of two numbers [longitude, latitude].');
//                 }
//             });
//         });

//         // Lägg till laddstationen i databasen
//         const newStation = await chargingStationData.addChargingStation(stationData);
//         console.log(`Charging station with ID ${newStation.charging_station_id} successfully added.`);
//         return newStation;
//     } catch (error) {
//         console.error("Error adding charging station:", error.message);
//         throw error;
//     }
// };

// // Uppdatera en laddstation
// const updateChargingStation = async (id, stationDataToUpdate) => {
//     const updatedStation = await chargingStationData.updateChargingStation(id, stationDataToUpdate);
//     if (!updatedStation) {
//         throw new Error('Charging station not found');
//     }
//     return updatedStation;
// };

// Ta bort en laddstation
const deleteChargingStation = async (id) => {
    const deletedStation = await chargingStationData.deleteChargingStation(id);
    if (!deletedStation) {
        throw new Error(`Charging station with ID ${id} not found.`);
    }
    console.log(`Charging station with ID ${id} successfully deleted.`);
    return deletedStation;
};


// Exportera alla funktioner
module.exports = {
    getAllChargingStations,
    getChargingStationById,
    // addChargingStation,
    // updateChargingStation,
    deleteChargingStation,
};