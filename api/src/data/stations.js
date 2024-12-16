/**
 * src/data/chargingStations.js
 */

const ChargingStation = require('../models/stationModel');

// Hämta alla laddstationer
const getAllChargingStations = async () => {
    try {
        const chargingStations = await ChargingStation.find();
        if (!chargingStations || chargingStations.length === 0) {
            throw new Error('No charging stations found');
        }
        return chargingStations;
    } catch (error) {
        console.error("Fel vid hämtning av laddstationer:", error.message);
        throw error;
    }
};

// Hämta en specifik laddstation
const getChargingStationById = async (id) => {
    return await ChargingStation.findOne({ charging_station_id: id });
};

// Lägg till en ny laddstation
const addChargingStation = async (stationData) => {
    const newStation = new ChargingStation(stationData);
    return await newStation.save();
};

// Uppdatera en laddstation
const updateChargingStation = async (id, stationDataToUpdate) => {
    const updatedStation = await ChargingStation.findOneAndUpdate(
        { charging_station_id: id }, 
        stationDataToUpdate, 
        { new: true, runValidators: true }
    );
    return updatedStation;
};

// Ta bort en laddstation
const deleteChargingStation = async (id) => {
    return await ChargingStation.findOneAndDelete({ charging_station_id: id });
};

// Hämta cyklar på specifik laddstation
const getBikesAtChargingStation = async (stationId) => {
    return await Bike.find({ charging_station_id: stationId });
};

module.exports = {
    getAllChargingStations,
    getChargingStationById,
    addChargingStation,
    updateChargingStation,
    deleteChargingStation,
    getBikesAtChargingStation
};
