/**
 * src/data/zones.js
 * Lager: "Data Layer"
 * 
 * Funktioner:
 * - Hämta alla parkeringszoner
 * - Hämta en specifik parkeringszon baserat på ID
 * - Lägg till en ny parkeringszon
 * - Uppdatera en parkeringszon
 * - Ta bort en parkeringszon
 * - Hämta cyklar på specifik parkeringszon
 */

const ParkingZone = require("../models/zoneModel");
const Bike = require("../models/bikeModel");

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

// Lägg till en ny parkeringszon
const addParkingZone = async (zoneData) => {
  try {
    const newZone = new ParkingZone(zoneData);
    console.log("Added zone", newZone);

    return await newZone.save();
  } catch (error) {
    console.error("Error adding zone:", error.message);
    throw new Error(error.message);
  }
};

// Uppdatera en parkeringszon
const updateParkingZone = async (id, zoneData) => {
  try {
    const updatedZone = await ParkingZone.findOneAndUpdate(
      { parking_zone_id: id }, // Anger vilket dokument som ska uppdateras
      { $set: zoneData }, // Anger vad som ska uppdateras
      { new: true, runValidators: true }, // Returnera det uppdaterade dokumentet och kör validering
    );
    if (!updatedZone) throw new Error("City not found");
    return updatedZone;
  } catch (error) {
    console.error(`Error updating city with ID ${id}:`, error.message);
    throw new Error(error.message);
  }
};

// Ta bort en parkeringszon
const deleteParkingZone = async (id) => {
  try {
    const deletedZone = await ParkingZone.findOneAndDelete({
      parking_zone_id: id,
    });
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
    console.error(
      `Error fetching bikes at parking zone with ID ${zoneId}:`,
      error.message,
    );
    throw new Error(error.message);
  }
};

// Exportera funktioner
module.exports = {
  getAllParkingZones,
  getParkingZoneById,
  addParkingZone,
  updateParkingZone,
  deleteParkingZone,
  getBikesAtParkingZone,
};
