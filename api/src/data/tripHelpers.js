/**
 * src/data/tripHelpers.js
 */

// Validera om en cykel kan hyras
const validateBikeAvailability = async (bikeId) => {
    const bike = await Bike.findOne({ bike_id: bikeId });
    if (!bike) {
        throw new Error('Bike not found.');
    }
    if (bike.status !== 'available') {
        throw new Error('Bike is not available for rental.');
    }
    if (bike.battery_level < 50) {
        throw new Error('Bike battery level must be at least 50%.');
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
        throw new Error('Start time and end time are required to calculate duration.');
    }
    return Math.floor((endTime - startTime) / 1000); // Varaktighet i sekunder
};

// Uppdatera cykelstatus
const updateBikeStatus = async (bikeId, status) => {
    const bike = await Bike.findOneAndUpdate(
        { bike_id: bikeId },
        { status: status },
        { new: true }
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
    updateBikeStatus
};
