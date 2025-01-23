/**
 * src/services/bikeService.js
 * Lager: "Service Layer"
 *
 * Funktioner:
 * - Hämta alla cyklar
 * - Hämta detaljer om en specifik cykel
 * - Lägga till en cykel
 * - Uppdatera en cykel
 * - Radera en cykel
 */

const bikeData = require("../data/bikes");
let io;

const setSocketInstance = (IoInstance) => {
  io = IoInstance;
};

// Hämta alla cyklar
const getAllBikes = async () => {
  const bikes = await bikeData.getAllBikes();
  if (!bikes || bikes.length === 0) {
    throw new Error("No bikes found in the database.");
  }
  return bikes;
};

// Hämta en specifik cykel baserat på ID
const getBikeById = async (id) => {
  const bike = await bikeData.getBikeById(id);
  if (!bike) {
    throw new Error(`Bike with ID ${id} not found.`);
  }
  return bike;
};

// Lägg till en ny cykel
const addBike = async (bike) => {
  try {
    // Sätt standardvärden för ny cykel
    bike.status = "available";
    bike.battery_level = 100;

    // Validera koordinater om de anges
    if (
      bike.location &&
      (!Array.isArray(bike.location.coordinates) ||
        bike.location.coordinates.length !== 2)
    ) {
      throw new Error(
        "Location coordinates must be an array with two numbers (longitude, latitude).",
      );
    }

    // Skapa ny cykel
    const newBike = await bikeData.addBike(bike);
    console.log(`Bike with ID ${newBike.bike_id} successfully added.`);
    return newBike;
  } catch (error) {
    console.error("Error adding bike:", error.message);
    throw error;
  }
};

// Uppdatera en cykel baserat på ID
const updateBike = async (id, updateData) => {
  try {
    // Validera status, om det anges
    if (updateData.status) {
      const validStatuses = ["available", "in-use", "charging", "maintenance"];
      if (!validStatuses.includes(updateData.status)) {
        throw new Error(
          `Invalid status: ${updateData.status}. Valid statuses are: ${validStatuses.join(", ")}`,
        );
      }
    }

    // Validera batterinivå, om det anges
    if (updateData.battery_level !== undefined) {
      if (updateData.battery_level < 0 || updateData.battery_level > 100) {
        throw new Error("Battery level must be between 0 and 100.");
      }
    }

    // Validera koordinater, om det anges
    if (
      updateData.location &&
      (!Array.isArray(updateData.location.coordinates) ||
        updateData.location.coordinates.length !== 2)
    ) {
      throw new Error(
        "Location coordinates must be an array with two numbers (longitude, latitude).",
      );
    }

    const bike = await getBikeById(id);
    if (!bike) return;
    const updatedData = { ...updateData };
    if (bike.status === "in-use") {
      updatedData.battery_level = (bike.battery_level || 0) - 0.25;
      if (updatedData.battery_level <= 0) {
        updatedData.battery_level = 0;
        updatedData.status = "maintenance";
        updatedData.message = "cyckel dead";
      }

      updatedData.speed = bike.speed + (Math.random() - 0.5) * 1;
      if (updatedData.speed < 0) updatedData.speed = 0;
      if (updatedData.speed > 20) updatedData.speed = 20;
    }

    console.log(`Bike with ID ${id} successfully updated.`);
    if (io) {
      io.emit("bike-update", updatedData);
    }
    return await bikeData.updateBike(id, updatedData);
  } catch (error) {
    console.error(`Error updating bike with ID ${id}:`, error.message);
    throw error;
  }
};

// Ta bort en cykel baserat på ID
const deleteBike = async (id) => {
  const deletedBike = await bikeData.deleteBike(id);
  if (!deletedBike) {
    throw new Error(`Bike with ID ${id} not found.`);
  }
  console.log(`Bike with ID ${id} successfully deleted.`);
  return deletedBike;
};

// Exportera alla funktioner
module.exports = {
  getAllBikes,
  getBikeById,
  addBike,
  updateBike,
  deleteBike,
  setSocketInstance,
};
