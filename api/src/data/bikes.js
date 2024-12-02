/**
 * src/data/bikes.js
 * Ansvar:
 * - Abstrahera all interaktion med datakällan (mockdata eller databas) för alla tabeller.
 * 
 * Uppgifter: 
 * - Hanterar datalogik för alla tabeller, inklusive:
 *   - Hämta data.
 *   - Lägga till ny data.
 *   - Uppdatera eller ta bort data (om det behövs senare).
 * - Skapar enhetliga funktioner som används av rutterna.
 * 
 * Syfte:
 * - Tillhandahåller ett enda lager för datalagring, vilket förenklar hantering och utveckling.
 * - Separera datalagring från API-logiken för att hålla koden modulär och lätt att ändra.
 */

const mockDatabase = require('../models/mockDatabase');

// Hämta alla cyklar
const getAllBikes = async () => {
    return mockDatabase.bikes; // Mockad data
};

// Hämta en specifik cykel
const getBikeById = async (id) => {
    const bike = mockDatabase.bikes.find((b) => b.bike_id === parseInt(id));
    if (!bike) throw new Error('Bike not found');
    return bike;
};

// Lägg till en ny cykel
const addBike = (bike) => {
    const newBike = {
        ...bike, // Kopiera all inkommande data
        bike_id: mockDatabase.bikes.length + 1, // Generera ett nytt ID
    };
    mockDatabase.bikes.push(newBike); // Lägg till cykeln i databasen
    return newBike;
};

// Uppdatera en cykel
const updateBike = async (id, bikeData) => {
    const index = mockDatabase.bikes.findIndex((bike) => bike.bike_id === parseInt(id));
    if (index === -1) return null;
    mockDatabase.bikes[index] = { ...mockDatabase.bikes[index], ...bikeData };
    return mockDatabase.bikes[index];
};

// Ta bort en cykel
const deleteBike = async (id) => {
    const index = mockDatabase.bikes.findIndex((bike) => bike.bike_id === parseInt(id));
    if (index === -1) return null;
    return mockDatabase.bikes.splice(index, 1)[0];
};

module.exports = {
    getAllBikes,
    getBikeById,
    addBike,
    updateBike,
    deleteBike
};
