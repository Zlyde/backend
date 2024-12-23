/**
 * src/data/zones.js
 */

const ParkingZone = require('../models/zoneModel');
const Bike = require('../models/bikeModel');

// Hämta alla parkeringszoner
const getAllParkingZones = async () => {
    try {
        const parkingZones = await ParkingZone.find();
        return parkingZones;
    } catch (error) {
        console.error("Error fetching parking zones:", error.message);
        throw new Error(error.message);
    }
};

// Hämta en specifik parkeringszon baserat på ID
const getParkingZoneById = async (id) => {
    try {
        const parkingZone = await ParkingZone.findOne({ parking_zone_id: id });
        if (!parkingZone) {
            throw new Error(`Parking zone with ID ${id} not found`);
        }
        return parkingZone;
    } catch (error) {
        console.error(`Error fetching parking zone by ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Ta bort en parkeringszon
const deleteParkingZone = async (id) => {
    try {
        const deletedZone = await ParkingZone.findOneAndDelete({ parking_zone_id: id });
        if (!deletedZone) {
            throw new Error(`Parking zone with ID ${id} not found`);
        }
        return deletedZone;
    } catch (error) {
        console.error(`Error deleting parking zone with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Hämta cyklar på specifik parkeringszon
const getBikesAtParkingZone = async (zoneId) => {
    try {
        const bikes = await Bike.find({ parking_zone_id: zoneId });
        return bikes;
    } catch (error) {
        console.error(`Error fetching bikes at parking zone with ID ${zoneId}:`, error.message);
        throw new Error(error.message);
    }
};

// Exportera funktioner
module.exports = {
    getAllParkingZones,
    getParkingZoneById,
    deleteParkingZone,
    getBikesAtParkingZone
};
