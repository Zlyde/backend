/**
 * src/data/trips.js
 */

const Trip = require("../models/tripModel");

// Hämta alla resor
const getAllTrips = async () => {
  try {
    const trips = await Trip.find();
    return trips;
  } catch (error) {
    console.error("Error fetching trips:", error.message);
    throw new Error(error.message);
  }
};

// Hämta specifik resa baserat på trip_id
const getTripById = async (tripId) => {
  try {
    console.log(tripId);

    const trip = await Trip.findOne({ trip_id: tripId });
    if (!trip) throw new Error(`Trip with ID ${tripId} not found`);
    return trip;
  } catch (error) {
    console.error(`Error fetching trip by ID ${tripId}:`, error.message);
    throw new Error(error.message);
  }
};

// Hämta resor baserat på user_id
const getTripsByUserId = async (userId) => {
  try {
    const trips = await Trip.find({ user_id: userId });
    return trips;
  } catch (error) {
    console.error(`Error fetching trips for user ${userId}:`, error.message);
    throw error;
  }
};

// Hämta resor baserat på bike_id
const getTripsByBikeId = async (bikeId) => {
  try {
    const trips = await Trip.find({ bike_id: bikeId });
    return trips;
  } catch (error) {
    console.error(`Error fetching trips for bike ${bikeId}:`, error.message);
    throw error;
  }
};

// Skapa en ny resa
const addTrip = async (tripData) => {
  try {
    const newTrip = new Trip(tripData);
    console.log("Added trip", newTrip);

    return await newTrip.save();
  } catch (error) {
    console.error("Error adding trip:", error.message);
    throw new Error(error.message);
  }
};

// Uppdatera en resa
const updateTrip = async (tripId, tripDataToUpdate) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { trip_id: tripId },
      { $set: tripDataToUpdate },
      { new: true, runValidators: true },
    );
    if (!updatedTrip) throw new Error(`Trip with ID ${tripId} not found`);
    return updatedTrip;
  } catch (error) {
    console.error(`Error updating trip with ID ${tripId}:`, error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  getTripsByUserId,
  getTripsByBikeId,
  addTrip,
  updateTrip,
};
