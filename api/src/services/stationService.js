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
    try {
        const stations = await chargingStationData.getAllChargingStations();
        if (!stations || stations.length === 0) {
            throw new Error('No charging stations found');
        }
        return stations;
    } catch (error) {
        console.error("Fel vid hämtning av laddstationer:", error.message);
        throw error;
    }
};

// Hämta en specifik laddstation
const getChargingStationById = async (id) => {
    const station = await chargingStationData.getChargingStationById(id);
    if (!station) {
        throw new Error('Charging station not found');
    }
    return station;
};

// Lägg till en ny laddstation
const addChargingStation = async (station) => {
    return await chargingStationData.addChargingStation(station);
};

// Uppdatera en laddstation
const updateChargingStation = async (id, stationDataToUpdate) => {
    const updatedStation = await chargingStationData.updateChargingStation(id, stationDataToUpdate);
    if (!updatedStation) {
        throw new Error('Charging station not found');
    }
    return updatedStation;
};

// Ta bort en laddstation
const deleteChargingStation = async (id) => {
    const deletedStation = await chargingStationData.deleteChargingStation(id);
    if (!deletedStation) {
        throw new Error('Charging station not found');
    }
    return deletedStation;
};

// Hämta alla cyklar på en specifik parkeringszon
const getBikesAtChargingStation = async (zoneId) => {
    try {
        const bikes = await chargingStationData.getBikesAtChargingStation(zoneId);
        if (!bikes.length) throw new Error('No bikes found at this charging station');
        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes at charging station ${zoneId}:`, error.message);
        throw error;
    }
};

// Exportera alla funktioner
module.exports = {
    getAllChargingStations,
    getChargingStationById,
    addChargingStation,
    updateChargingStation,
    deleteChargingStation,
    getBikesAtChargingStation
};