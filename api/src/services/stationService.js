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
    const station = await chargingStationData.getChargingStationById(id);
    if (!station) {
        throw new Error(`Charging station with ID ${id} not found.`);
    }
    return station;
};

// Lägg till en ny laddstation
const addChargingStation = async (data) => {
  const newStation = await chargingStationData.addChargingStation(data);
  console.log("New Station", newStation);
  return newStation;
};

// Uppdatera en laddstation
const updateChargingStation = async (id, data) => {
    const updatedStation = await chargingStationData.updateChargingStation(id, data);
    if (!updatedStation) {
        throw new Error(`Charging station with ID ${id} not found.`);
    }
    return updatedStation;
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
    addChargingStation,
    updateChargingStation,
    deleteChargingStation
};
