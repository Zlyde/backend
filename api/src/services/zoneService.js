/**
 * src/services/zoneService.js
 * Lager: "Service Layer"
 * 
 * Funktioner:
 * - Hämta alla parkeringszoner
 * - Hämta detaljer om en specifik parkeringszon
 * - Lägg till en ny parkeringszon
 * - Uppdatera en parkeringszon
 * - Radera en parkeringszon
 */

const parkingZoneData = require('../data/zones');
const bikeData = require('../data/bikes');

// Hämta alla parkeringszoner
const getAllParkingZones = async () => {
    const zones = await parkingZoneData.getAllParkingZones();
    if (!zones || zones.length === 0) {
        throw new Error('No parking zones found in the database.');
    }
    return zones;
};

// Hämta en specifik parkeringszon
const getParkingZoneById = async (id) => {
    const zone = await parkingZoneData.getParkingZoneById(id);
    if (!zone) {
        throw new Error(`Parking zone with ID ${id} not found.`);
    }
    return zone;
};

// // Lägg till en ny parkeringszon
// const addParkingZone = async (zoneData) => {
//     try {
//         // Validera att koordinater finns och är korrekt formaterade
//         if (!zoneData.location || !zoneData.location.coordinates) {
//             throw new Error('Location coordinates are required.');
//         }
//         if (!Array.isArray(zoneData.location.coordinates) || zoneData.location.coordinates.length === 0) {
//             throw new Error('Location coordinates must be a non-empty array of arrays.');
//         }

//         // Kontrollera att varje punkt i polygonen är en korrekt array av [longitude, latitude]
//         zoneData.location.coordinates.forEach((polygon) => {
//             polygon.forEach((point) => {
//                 if (!Array.isArray(point) || point.length !== 2 || 
//                     typeof point[0] !== 'number' || typeof point[1] !== 'number') {
//                     throw new Error('Each point in the coordinates must be an array of two numbers [longitude, latitude].');
//                 }
//             });
//         });

//         // Lägg till zonen i databasen
//         const newZone = await parkingZoneData.addParkingZone(zoneData);
//         console.log(`Parking zone with ID ${newZone.parking_zone_id} successfully added.`);
//         return newZone;
//     } catch (error) {
//         console.error("Error adding parking zone:", error.message);
//         throw error;
//     }
// };

// Uppdatera en parkeringszon
const updateParkingZone = async (id, zoneDataToUpdate) => {
    try {
        const updatedZone = await parkingZoneData.updateParkingZone(id, zoneDataToUpdate);
        if (!updatedZone) throw new Error('Parking zone not found');
        return updatedZone;
    } catch (error) {
        console.error(`Error updating parking zone with ID ${id}:`, error.message);
        throw error;
    }
};

// Ta bort en parkeringszon
const deleteParkingZone = async (id) => {
    const deletedZone = await parkingZoneData.deleteParkingZone(id);
    if (!deletedZone) {
        throw new Error(`Parking zone with ID ${id} not found.`);
    }
    console.log(`Parking zone with ID ${id} successfully deleted.`);
    return deletedZone;
};

module.exports = {
    getAllParkingZones,
    getParkingZoneById,
    // addParkingZone,
    // updateParkingZone,
    deleteParkingZone
};
