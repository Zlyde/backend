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
 * - Hämta alla cyklar på en specifik parkeringszon
 */

const parkingZoneData = require('../data/zones');
const bikeData = require('../data/bikes');

// Hämta alla parkeringszoner
const getAllParkingZones = async () => {
    try {
        const zones = await parkingZoneData.getAllParkingZones();
        if (!zones.length) throw new Error('No parking zones found');
        return zones;
    } catch (error) {
        console.error("Error fetching parking zones:", error.message);
        throw error;
    }
};

// Hämta en specifik parkeringszon
const getParkingZoneById = async (id) => {
    const zone = await parkingZoneData.getParkingZoneById(id);
    if (!zone) throw new Error('Parking zone not found');
    return zone;
};

// Lägg till en ny parkeringszon
const addParkingZone = async (zoneData) => {
    try {
        const savedZone = await parkingZoneData.addParkingZone(zoneData);
        return savedZone;
    } catch (error) {
        console.error("Error adding parking zone:", error.message);
        throw error;
    }
};

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
    if (!deletedZone) throw new Error('Parking zone not found');
    return deletedZone;
};

// Hämta alla cyklar på en specifik parkeringszon
const getBikesAtParkingZone = async (zoneId) => {
    try {
        const bikes = await bikeData.getBikesByParkingZoneId(zoneId);
        if (!bikes.length) throw new Error('No bikes found at this parking zone');
        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes at parking zone ${zoneId}:`, error.message);
        throw error;
    }
};

module.exports = {
    getAllParkingZones,
    getParkingZoneById,
    addParkingZone,
    updateParkingZone,
    deleteParkingZone,
    getBikesAtParkingZone
};