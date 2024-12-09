/**
 * src/services/cityService.js
 * Lager: "Service Layer"
 * 
 * Funktioner:
 * - Hämta alla städer
 * - Hämta detaljer om en specifik stad
 * - Lägga till en stad
 * - Uppdatera en stad
 * - Radera en stad
 */

const cityData = require('../data/cities');

// Hämta alla städer
const getAllCities = async () => {
    const cities = await cityData.getAllCities();
    if (cities.length === 0) {
        throw new Error('No cities found');
    }
    return cities;
};

// Hämta en specifik stad
const getCityById = async (id) => {
    const city = await cityData.getCityById(id);
    if (!city) {
        throw new Error('City not found');
    }
    return city;
};

// Lägg till en ny stad
const addCity = async (city) => {
    return await cityData.addCity(city);
};

// Uppdatera en stad
const updateCity = async (id, cityDataToUpdate) => {
    const updatedCity = await cityData.updateCity(id, cityDataToUpdate);
    if (!updatedCity) {
        throw new Error('City not found');
    }
    return updatedCity;
};

// Ta bort en stad
const deleteCity = async (id) => {
    const deletedCity = await cityData.deleteCity(id);
    if (!deletedCity) {
        throw new Error('City not found');
    }
    return deletedCity;
};

// Exportera alla funktioner
module.exports = {
    getAllCities,
    getCityById,
    addCity,
    updateCity,
    deleteCity
};
