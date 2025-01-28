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
const { io } = require("socket.io-client");

const socket = io("http://localhost:5001", {
  transports: ["websocket"],
});


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
    const bike = await bikeData.updateBike(id, updateData)
    if(!bike) return null
    if (bike.status == 'in-use') {
      bike.speed += (Math.random() - 0.5) * 1;
      if (bike.speed < 0) bike.speed = 0;
      if (bike.speed > 20) bike.speed = 20;
      const dischargeRate = Math.min(0.25 + bike.speed * 0.02, 1);
      bike.battery_level -= dischargeRate

      if (bike.battery_level <= 20) {
        bike.message = 'Cykeln måste laddas';
      } else {
        bike.message = ''
      }

      await bikeData.updateBike(id, { battery_level: bike.battery_level, speed: bike.speed, message: bike.message });
    }

    if (bike.battery_level <= 0) {
      bike.battery_level = 0
      bike.status = 'maintenance'
      bike.speed = 0;
      bike.message = 'Cykeln måste laddas'

      await bikeData.updateBike(id, { battery_level: bike.battery_level, speed: bike.speed, message: bike.message, status: bike.status });
    } 

    socket.emit("bike-update", (bike));
    return bike
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
};
