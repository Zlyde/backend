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
const bikeData = require('../data/bikes');
const {
    validateBikeAvailability,
    createTripStartData,
    calculateTripDuration,
    updateBikeStatus,
} = require('../data/tripHelpers');

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

// Starta en ny resa
const startTrip = async (tripDataInput) => {
    const { bike_id, user_id } = tripDataInput;

    // Hämta cykel och validera dess status
    const bike = await bikeData.getBikeById(bike_id);
    await validateBikeAvailability(bike);

    // Skapa resans startdata
    const tripStartData = createTripStartData(bike, user_id);

    // Uppdatera cykelns status till "in-use"
    await updateBikeStatus(bike_id, 'in-use');

    // Spara resan i databasen
    const newTrip = await tripData.addTrip(tripStartData);
    return newTrip;
};

// Avsluta en resa
const endTrip = async (tripId) => {
    const trip = await tripData.getTripById(tripId);
    if (!trip || trip.end_time) {
        throw new Error('Trip not found or already ended.');
    }

    const bike = await bikeData.getBikeById(trip.bike_id);
    if (!bike) {
        throw new Error(`Bike with ID ${trip.bike_id} not found.`);
    }

    // Uppdatera resans avslutsdata
    const endTime = new Date();
    const updatedTripData = {
        end_time: endTime,
        end_location: { coordinates: bike.location.coordinates },
        duration: calculateTripDuration(trip.start_time, endTime),
    };

    // Uppdatera resan i databasen
    const updatedTrip = await tripData.updateTrip(tripId, updatedTripData);

    // Uppdatera cykelns status till "available"
    await updateBikeStatus(bike.bike_id, 'available');

    return updatedTrip;
};

module.exports = {
    getAllTrips,
    getTripById,
    startTrip,
    endTrip
};
