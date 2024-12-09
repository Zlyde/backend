/**
 * src/data/cities.js
 * Ansvar:
 * - Abstrahera all interaktion med datakällan (mockdata eller databas) för Cities-tabellen.
 * 
 * Uppgifter: 
 * - Hanterar datalogik för Cities, inklusive:
 *   - Hämta data.
 *   - Lägga till ny data.
 *   - Uppdatera eller ta bort data.
 * - Skapar enhetliga funktioner som används av rutterna.
 * 
 * Syfte:
 * - Tillhandahåller ett enda lager för datalagring, vilket förenklar hantering och utveckling.
 * - Separera datalagring från API-logiken för att hålla koden modulär och lätt att ändra.
 */

const mockDatabase = require('../models/mockDatabase');

// Hämta alla städer
const getAllCities = async () => {
    return mockDatabase.cities; // Mockad data
};

// Hämta en specifik stad
const getCityById = async (id) => {
    const city = mockDatabase.cities.find((c) => c.city_id === parseInt(id));
    if (!city) throw new Error('City not found');
    return city;
};

// Lägg till en ny stad
const addCity = (city) => {
    const newCity = {
        ...city, // Kopiera all inkommande data
        city_id: mockDatabase.cities.length + 1, // Generera ett nytt ID
    };
    mockDatabase.cities.push(newCity); // Lägg till staden i databasen
    return newCity;
};

// Uppdatera en stad
const updateCity = async (id, cityData) => {
    const index = mockDatabase.cities.findIndex((city) => city.city_id === parseInt(id));
    if (index === -1) return null;
    mockDatabase.cities[index] = { ...mockDatabase.cities[index], ...cityData };
    return mockDatabase.cities[index];
};

// Ta bort en stad
const deleteCity = async (id) => {
    const index = mockDatabase.cities.findIndex((city) => city.city_id === parseInt(id));
    if (index === -1) return null;
    return mockDatabase.cities.splice(index, 1)[0];
};

module.exports = {
    getAllCities,
    getCityById,
    addCity,
    updateCity,
    deleteCity
};
