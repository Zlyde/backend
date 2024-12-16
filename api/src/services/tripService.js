/**
 * src/services/tripService.js
 * Lager: "Service Layer"
 * 
 * Funktioner:
 * - Hämta alla resor
 * - Hämta detaljer om en specifik resa
 * - Påbörja ny resa
 * - Uppdatera en resa
 */

const tripData = require('../data/trips');

// Hämta alla resor
const getAllTrips = async () => {
    try {
        const trips = await tripData.getAllTrips();
        if (!trips || trips.length === 0) {
            throw new Error('No trips found');
        }
        return trips;
    } catch (error) {
        console.error("Fel vid hämtning av resor:", error.message);
        throw error;
    }
};

// Hämta en specifik resa
const getTripById = async (tripId) => {
    const trip = await tripData.getTripById(tripId);
    if (!trip) {
        throw new Error('Trip not found');
    }
    return trip;
};

// Påbörja ny resa
const addTrip = async (trip) => {
    return await tripData.addTrip(trip);
};

// Uppdatera en resa
const updateTrip = async (tripId, tripDataToUpdate) => {
    const updatedTrip = await tripData.updateTrip(tripId, tripDataToUpdate);
    if (!updatedTrip) {
        throw new Error('Trip not found');
    }
    return updatedTrip;
};

module.exports = {
    getAllTrips,
    getTripById,
    addTrip,
    updateTrip
};