/**
 * src/data/trips.js
 * Ansvar:
 * - Abstrahera all interaktion med datakällan (MongoDB).
 */

const Trip = require('../models/tripModel');

// Hämta alla resor
const getAllTrips = async () => {
    try {
        const trips = await Trip.find();
        if (!trips || trips.length === 0) {
            throw new Error('No trips found');
        }
        return trips;
    } catch (error) {
        console.error("Fel vid hämtning av resor:", error.message);
        throw error;
    }
};

// Hämta specifik resa baserat på trip_id
const getTripById = async (tripId) => {
    try {
        const trip = await Trip.findOne({ trip_id: tripId });
        if (!trip) throw new Error('Trip not found');
        return trip;
    } catch (error) {
        console.error(`Fel vid hämtning av resa med ID ${tripId}:`, error.message);
        throw error;
    }
};

// Lägg till en ny resa
const addTrip = async (tripData) => {
    const newTrip = new Trip(tripData);
    return await newTrip.save();
};

// Uppdatera en resa
const updateTrip = async (tripId, tripDataToUpdate) => {
    const updatedTrip = await Trip.findOneAndUpdate(
        { trip_id: tripId },
        tripDataToUpdate,
        { new: true, runValidators: true }
    );
    if (!updatedTrip) throw new Error('Trip not found');
    return updatedTrip;
};

module.exports = {
    getAllTrips,
    getTripById,
    addTrip,
    updateTrip
};