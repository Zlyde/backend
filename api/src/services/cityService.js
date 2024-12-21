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

// // Hjälpfunktion för validering av boundary
// const validateBoundary = (boundary) => {
//     if (!boundary) return; // Tillåt att boundary är tom
//     if (boundary.type !== 'Polygon' && boundary.type !== 'MultiPolygon') {
//         throw new Error('Invalid boundary type. Must be Polygon or MultiPolygon');
//     }
//     if (!Array.isArray(boundary.coordinates) || boundary.coordinates.length === 0) {
//         throw new Error('Invalid boundary coordinates. Must be a non-empty array of coordinates');
//     }
// };

// // Hjälpfunktion för validering av position
// const validatePosition = (position) => {
//     if (!position) {
//         throw new Error('Position is required');
//     }
//     if (position.type !== 'Point') {
//         throw new Error('Invalid position type. Must be "Point"');
//     }
//     if (!Array.isArray(position.coordinates) || position.coordinates.length !== 2) {
//         throw new Error('Invalid position coordinates. Must be an array of two numbers');
//     }
// };

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

const getCityByQuery = async (query) => {
  const city = await cityData.getCityByQuery(query);
  if (!city) {
      throw new Error('City not found');
  }
  return city;
};

// // Lägg till en ny stad
// const addCity = async (city) => {
//     try {
//         // Kontrollera att namn anges och inte är tomt
//         if (!city.name || city.name.trim() === '') {
//             throw new Error('City name is required');
//         }

//         // Kontrollera att namnet är unikt
//         const existingCity = await cityData.getCityByName(city.name);
//         if (existingCity) {
//             throw new Error(`City with name '${city.name}' already exists`);
//         }   

//         // Validera position
//         validatePosition(city.position);

//         // Validera boundary med hjälp av hjälpfunktionen
//         validateBoundary(cityDataToUpdate.boundary);

//         // Lägg till staden
//         return await cityData.addCity(city);
//     } catch (error) {
//         console.error("Error adding city:", error.message);
//         throw error;
//     }};

// Uppdatera en stad
const updateCity = async (id, cityDataToUpdate) => {
    try {
        // Kontrollera att namn, om det anges, inte är tomt
        if (cityDataToUpdate.name && cityDataToUpdate.name.trim() === '') {
            throw new Error('City name cannot be empty');
        }

        // Kontrollera att namnet är unikt
        const existingCity = await cityData.getCityByName(city.name);
        if (existingCity) {
            throw new Error(`City with name '${city.name}' already exists`);
        }        

        // // Validera position
        // validatePosition(city.position);

        // // Validera boundary med hjälp av hjälpfunktionen
        // validateBoundary(cityDataToUpdate.boundary);

        // Uppdatera staden
        const updatedCity = await cityData.updateCity(id, cityDataToUpdate);
        if (!updatedCity) {
            throw new Error('City not found');
        }
        return updatedCity;
    } catch (error) {
        console.error("Error updating city:", error.message);
        throw error;
    }
};

// Ta bort en stad
const deleteCity = async (id) => {
    const deletedCity = await cityData.deleteCity(id);
    if (!deletedCity) {
        throw new Error('City not found');
    }
    console.log(`City '${deletedCity.name}' (ID: ${id}) has been removed`);
    return deletedCity;
};

// Exportera alla funktioner
module.exports = {
    getAllCities,
    getCityById,
    // addCity,
    updateCity,
    deleteCity,
    getCityByQuery
};
