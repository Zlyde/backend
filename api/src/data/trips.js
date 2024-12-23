/**
 * src/data/trips.js
 */

const Trip = require('../models/tripModel');

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
        const trip = await Trip.findOne({ trip_id: tripId });
        if (!trip) throw new Error(`Trip with ID ${tripId} not found`);
        return trip;
    } catch (error) {
        console.error(`Error fetching trip by ID ${tripId}:`, error.message);
        throw new Error(error.message);
    }
};

// Skapa en ny resa
const addTrip = async (tripData) => {
    try {
        const newTrip = new Trip(tripData);
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
            { new: true, runValidators: true }
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
    addTrip,
    updateTrip
};