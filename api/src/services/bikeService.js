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
    try {
        const bikes = await bikeData.getAllBikes();
        if (!bikes || bikes.length === 0) {
            throw new Error('No bikes found');
        }
        return bikes;
    } catch (error) {
        console.error("Fel vid hämtning av cyklar:", error.message);
        throw error;
    }
};

// Hämta en specifik cykel baserat på ID
const getBikeById = async (id) => {
    try {
        const bike = await bikeData.getBikeById(id);
        if (!bike) {
            throw new Error('Bike not found');
        }
        return bike;
    } catch (error) {
        console.error(`Fel vid hämtning av cykel med ID ${id}:`, error.message);
        throw error;
    }
};

// Lägg till en ny cykel
const addBike = async (bike) => {
    try {
        const newBike = await bikeData.addBike(bike);
        return newBike;
    } catch (error) {
        console.error("Fel vid tillägg av cykel:", error.message);
        throw error;
    }
};

// Uppdatera en cykel baserat på ID
const updateBike = async (id, bikeDataToUpdate) => {
    try {
        const updatedBike = await bikeData.updateBike(id, bikeDataToUpdate);
        if (!updatedBike) {
            throw new Error('Bike not found');
        }
        return updatedBike;
    } catch (error) {
        console.error(`Fel vid uppdatering av cykel med ID ${id}:`, error.message);
        throw error;
    }
};

// Ta bort en cykel baserat på ID
const deleteBike = async (id) => {
    try {
        const deletedBike = await bikeData.deleteBike(id);
        if (!deletedBike) {
            throw new Error('Bike not found');
        }
        return deletedBike;
    } catch (error) {
        console.error(`Fel vid borttagning av cykel med ID ${id}:`, error.message);
        throw error;
    }
};

// Exportera alla funktioner
module.exports = {
    getAllBikes,
    getBikeById,
    addBike,
    updateBike,
    deleteBike
};