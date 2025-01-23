/**
 * src/data/tripHelpers.js
 */

const Bike = require("../models/bikeModel");

// Validera om en cykel kan hyras
const validateBikeAvailability = async (bikeId) => {
  const bike = await Bike.findOne({ bike_id: bikeId });
  console.log("Bike fetched:", bike);
  if (!bike) {
    throw new Error("Bike not found.");
  }
  if (bike.status !== "available") {
    throw new Error("Bike is not available for rental.");
  }
  if (bike.battery_level < 50) {
    throw new Error("Bike battery level must be at least 50%.");
  }
  return bike;
};

// Skapa startinformation för en resa
const createTripStartData = (bike, userId) => {
  return {
    user_id: userId,
    bike_id: bike.bike_id,
    start_time: new Date(),
    start_location: {
      coordinates: bike.location.coordinates,
    },
  };
};

// Beräkna varaktighet av en resa
const calculateTripDuration = (startTime, endTime) => {
  if (!startTime || !endTime) {
    throw new Error(
      "Start time and end time are required to calculate duration.",
    );
  }

  // Skillnad i millisekunder
  const durationMs = endTime - startTime;

  // Konvertera till minuter och runda upp till närmsta minut
  const durationMinutes = Math.ceil(durationMs / (1000 * 60));

  return durationMinutes; // Antal minuter, avrundat
};

// Uppdatera cykelstatus
const updateBikeStatus = async (bikeId, status) => {
  const Bike = require("../models/bikeModel");
  const bike = await Bike.findOneAndUpdate(
    { bike_id: bikeId },
    { status: status },
    { new: true },
  );
  if (!bike) {
    throw new Error(`Bike with ID ${bikeId} not found.`);
  }
  return bike;
};

module.exports = {
  validateBikeAvailability,
  createTripStartData,
  calculateTripDuration,
  updateBikeStatus,
};
