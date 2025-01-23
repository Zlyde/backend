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

const parkingZoneData = require("../data/zones");

// Hämta alla parkeringszoner
const getAllParkingZones = async () => {
  const zones = await parkingZoneData.getAllParkingZones();
  if (!zones || zones.length === 0) {
    throw new Error("No parking zones found in the database.");
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

// Lägg till en ny parkeringszon
const addParkingZone = async (data) => {
  const newZone = await parkingZoneData.addParkingZone(data);
  console.log("New parking zone:", newZone);
  return newZone;
};

// Uppdatera en parkeringszon
const updateParkingZone = async (id, data) => {
  const updatedZone = await parkingZoneData.updateParkingZone(id, data);
  if (!updatedZone) {
    throw new Error(`Parking zone with ID ${id} not found.`);
  }
  return updatedZone;
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
  addParkingZone,
  updateParkingZone,
  deleteParkingZone,
};
