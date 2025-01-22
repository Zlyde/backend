/**
 * src/data/stations.js
 */

const ChargingStation = require('../models/stationModel');
const Bike = require('../models/bikeModel');

// Hämta alla laddstationer
const getAllChargingStations = async () => {
    try {
        const chargingStations = await ChargingStation.find();
        return chargingStations;
    } catch (error) {
        console.error("Error fetching charging stations:", error.message);
        throw new Error(error.message);
    }
};

const addStation = async (stationData) => {
    try {
        const newStation = new ChargingStation(stationData);
        console.log("Added station", newStation);
        
        return await newStation.save();
    } catch (error) {
        console.error("Error adding station:", error.message);
        throw new Error(error.message);
    }
};

// Hämta en specifik laddstation
const getChargingStationById = async (id) => {
    try {
        const station = await ChargingStation.findOne({ charging_station_id: id });
        if (!station) {
            throw new Error(`Charging station with ID ${id} not found`);
        }
        return station;
    } catch (error) {
        console.error(`Error fetching charging station by ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Lägg till en ny laddstation
const addChargingStation = async (stationData) => {
    try {
        const newStation = new ChargingStation(stationData);
        return await newStation.save();
    } catch (error) {
        console.error("Error adding charging station:", error.message);
        throw new Error(error.message);
    }
};

// Uppdatera en laddstation
const updateChargingStation = async (id, stationDataToUpdate) => {
    try {
        const updatedStation = await ChargingStation.findOneAndUpdate(
            { charging_station_id: id },
            { $set: stationDataToUpdate },
            { new: true, runValidators: true }
        );
        if (!updatedStation) {
            throw new Error(`Charging station with ID ${id} not found`);
        }
        return updatedStation;
    } catch (error) {
        console.error(`Error updating charging station with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Ta bort en laddstation
const deleteChargingStation = async (id) => {
    try {
        const deletedStation = await ChargingStation.findOneAndDelete({ charging_station_id: id });
        if (!deletedStation) {
            throw new Error(`Charging station with ID ${id} not found`);
        }
        return deletedStation;
    } catch (error) {
        console.error(`Error deleting charging station with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Hämta cyklar på specifik laddstation
const getBikesAtChargingStation = async (stationId) => {
    try {
        const bikes = await Bike.find({ charging_station_id: stationId });
        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes at charging station with ID ${stationId}:`, error.message);
        throw new Error(error.message);
    }
};

// Exportera funktioner
module.exports = {
    getAllChargingStations,
    getChargingStationById,
    deleteChargingStation,
    getBikesAtChargingStation,
    addStation
};
