/**
 * src/data/parkingZones.js
 */

const ParkingZone = require('../models/zoneModel');

// Hämta alla parkeringszoner
const getAllParkingZones = async () => {
    try {
        const parkingZones = await ParkingZone.find();
        if (!parkingZones || parkingZones.length === 0) {
            throw new Error('No parking zones found');
        }
        return parkingZones;
    } catch (error) {
        console.error("Fel vid hämtning av parkeringszoner:", error.message);
        throw error;
    }
};

// Hämta en specifik parkeringszon
const getParkingZoneById = async (id) => {
    try {
        const parkingZone = await ParkingZone.findOne({ parking_zone_id: id });
        if (!parkingZone) {
            throw new Error('Parking zone not found');
        }
        return parkingZone;
    } catch (error) {
        console.error(`Fel vid hämtning av parkeringszon med ID ${id}:`, error.message);
        throw error;
    }
};

// Lägg till en ny parkeringszon
const addParkingZone = async (zoneData) => {
    try {
        const newZone = new ParkingZone(zoneData);
        const savedZone = await newZone.save();
        return savedZone;
    } catch (error) {
        console.error("Fel vid tillägg av parkeringszon:", error.message);
        throw error;
    }
};

// Uppdatera en parkeringszon
const updateParkingZone = async (id, zoneDataToUpdate) => {
    try {
        const updatedZone = await ParkingZone.findOneAndUpdate(
            { parking_zone_id: id },
            zoneDataToUpdate,
            { new: true, runValidators: true }
        );
        if (!updatedZone) {
            throw new Error('Parking zone not found');
        }
        return updatedZone;
    } catch (error) {
        console.error(`Fel vid uppdatering av parkeringszon med ID ${id}:`, error.message);
        throw error;
    }
};

// Ta bort en parkeringszon
const deleteParkingZone = async (id) => {
    try {
        const deletedZone = await ParkingZone.findOneAndDelete({ parking_zone_id: id });
        if (!deletedZone) {
            throw new Error('Parking zone not found');
        }
        return deletedZone;
    } catch (error) {
        console.error(`Fel vid radering av parkeringszon med ID ${id}:`, error.message);
        throw error;
    }
};

// Exportera funktioner
module.exports = {
    getAllParkingZones,
    getParkingZoneById,
    addParkingZone,
    updateParkingZone,
    deleteParkingZone
};