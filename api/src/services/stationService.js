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

const addStation = async (data) => {
  const newStation = await chargingStationData.addStation(data);
  console.log("New Trip", newStation);
  return newStation;
};

// Hämta en specifik laddstation
const getChargingStationById = async (id) => {
    const station = await chargingStationData.getChargingStationById(id);
    if (!station) {
        throw new Error(`Charging station with ID ${id} not found.`);
    }
    return station;
};

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
    deleteChargingStation,
    addStation
};