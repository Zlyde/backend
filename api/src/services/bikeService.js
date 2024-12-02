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

const bikeData = require('../data/bikes');

// Hämta alla cyklar
const getAllBikes = async () => {
    const bikes = await bikeData.getAllBikes();
    if (bikes.length === 0) {
        throw new Error('No bikes found');
    }
    return bikes;
};

// Hämta en specifik cykel
const getBikeById = async (id) => {
    const bike = await bikeData.getBikeById(id);
    if (!bike) {
        throw new Error('Bike not found');
    }
    return bike;
};

// Lägg till en ny cykel
const addBike = async (bike) => {
    return await bikeData.addBike(bike);
};

// Uppdatera en cykel
const updateBike = async (id, bikeDataToUpdate) => {
    const updatedBike = await bikeData.updateBike(id, bikeDataToUpdate);
    if (!updatedBike) {
        throw new Error('Bike not found');
    }
    return updatedBike;
};

// Ta bort en cykel
const deleteBike = async (id) => {
    const deletedBike = await bikeData.deleteBike(id);
    if (!deletedBike) {
        throw new Error('Bike not found');
    }
    return deletedBike;
};

// Exportera alla funktioner
module.exports = {
    getAllBikes,
    getBikeById,
    addBike,
    updateBike,
    deleteBike
};
