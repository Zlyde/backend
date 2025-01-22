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
const invoiceService = require('./invoiceService');
const userService = require('./userService');
const geoService = require('./geoService'); // För att kontrollera om cykeln är i på laddstation

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

// Hämta en specifik resa baserat på user-id
const getTripsByUserId = async (userId) => {
    try {
        if (!userId) {
            throw new Error('User ID is required to fetch trip history.');
        }

        const trips = await tripData.getTripsByUserId(userId);
        if (!trips || trips.length === 0) {
            throw new Error(`No trips found for user with ID ${userId}`);
        }

        return trips;
    } catch (error) {
        console.error(`Error fetching trips for user ${userId}:`, error.message);
        throw error;
    }
};

// Hämta en specifik resa baserat på bike-id
const getTripsByBikeId = async (bikeId) => {
    try {
        if (!bikeId) {
            throw new Error('Bike ID is required to fetch trips.');
        }

        const trips = await tripData.getTripsByBikeId(bikeId);
        if (!trips || trips.length === 0) {
            throw new Error(`No trips found for bike with ID ${bikeId}`);
        }

        return trips;
    } catch (error) {
        console.error(`Error fetching trips for bike ${bikeId}:`, error.message);
        throw error;
    }
};

// Starta en ny resa
const startTrip = async (tripDataInput) => {
    const { bike_id, user_id } = tripDataInput;
    console.log(typeof bike_id);
    

    // Hämta cykel och validera dess status
    const bike = await bikeData.getBikeById(bike_id);
    console.log(bike_id);
    
    
    await validateBikeAvailability(bike_id);
    console.log("Bike fetched:", bike);
    // Skapa resans startdata
    const tripStartData = createTripStartData(bike, user_id);
    console.log("Trip Data", tripStartData);
    

    // Uppdatera cykelns status till "in-use"
    await updateBikeStatus(bike_id, 'in-use');

    // Spara resan i databasen
    const newTrip = await tripData.addTrip(tripStartData);
    console.log("New Trip", newTrip);
    
    return newTrip;
};

const endTrip = async (tripId) => {
    const trip = await tripData.getTripById(tripId);
    if (!trip || trip.end_time) {
        throw new Error('Trip not found or already ended.');
    }

    const bike = await bikeData.getBikeById(trip.bike_id);
    if (!bike) {
        throw new Error(`Bike with ID ${trip.bike_id} not found.`);
    }
    console.log("Bike Location; ", bike.location.coordinates);
    
    // Uppdatera resans avslutsdata
    const endTime = new Date();
    const updatedTripData = {
        end_time: endTime,
        end_location: { coordinates: bike.location.coordinates },
        duration: calculateTripDuration(trip.start_time, endTime),
    };

    // Uppdatera resan i databasen
    const updatedTrip = await tripData.updateTrip(tripId, updatedTripData);

    console.log("Updated Trip: ", updatedTrip);
    
    console.log("Battery: ", bike.battery_level);

    await updateBikeStatus(bike.bike_id, 'available');
    
    // Kontrollera cykelns batterinivå och slutposition
    if (bike.battery_level < 50) { // Om batteriniviån är under 50%
        // Kontrollera om cykeln är i en laddstation
        console.log("End location: ", updatedTripData.end_location.coordinates);
        
        const isInChargingStation = await geoService.isInChargingStation(updatedTripData.end_location.coordinates);
        // Uppdatera cykelns status till "available" om den är i en laddstation, annars "maintenance"
        const newStatus = isInChargingStation ? 'available' : 'maintenance';
        await updateBikeStatus(bike.bike_id, newStatus);

        // Logga statusändring
        if (newStatus === 'maintenance') {
            console.log(`Bike ${bike.bike_id} set to maintenance due to low battery.`);
        }
    } else {
        // Uppdatera cykelns status till "available" om batterinivån är tillräcklig
        await updateBikeStatus(bike.bike_id, 'available');
    }

    // Skapa faktura om användaren är en kund
    const user = await userService.getUserById(trip.user_id);
    if (user.role === 'customer') {
        await invoiceService.createInvoice(tripId, trip.user_id);
    } else {
        console.log(`For admin user ${user.user_id} this trip is free. No invoice created.`);
    }

    return updatedTrip;
};

module.exports = {
    getAllTrips,
    getTripById,
    getTripsByUserId,
    getTripsByBikeId,
    startTrip,
    endTrip
};
