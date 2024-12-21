/**
 * src/data/cities.js
 */

const City = require('../models/cityModel')

// Hämta alla städer
const getAllCities = async () => {
    try {
        const cities = await City.find();
        if (!cities || cities.length === 0) {
            throw new Error('No cities found');
        }
        return cities;
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        throw new Error(error.message);
    }
};

// Hämta en specifik stad baserat på ID
const getCityById = async (id) => {
    try {
        const city = await City.findOne({ city_id: id });
        if (!city) {
            throw new Error(`City with ID ${id} not found`);
        }
        return city;
    } catch (error) {
        console.error(`Error fetching city by ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// const getCityById = async (id) => {
//     const city = await City.findById(id)
//     return city
// };

// Hämta en specifik stad baserat på sökord
const getCityByQuery = async (query) => {
    try {
        const city = await City.findOne(query);
        if (!city) {
            throw new Error('City not found');
        }
        return city;
    } catch (error) {
        console.error("Error fetching city by query:", error.message);
        throw new Error(error.message);
    }
};

// const getCityByQuery = async (query) => {
//     const city = await City.findOne(query)
//     return city
// };

// Hämta en specifik stad baserat på namn, används ex för att verifiera att namn är unikt
const getCityByName = async (name) => {
    try {
        const city = await City.findOne({ name });
        return city; // Returnerar null om ingen stad hittas
    } catch (error) {
        console.error(`Error fetching city by name '${name}':`, error.message);
        throw new Error(error.message);
    }
};

// // Lägg till en ny stad
// const addCity = async (city) => {
//     try {
//         const newCity = new City(city);
//         return await newCity.save();
//     } catch (error) {
//         console.error("Error adding city:", error.message);
//         throw new Error(error.message);
//     }
// };
// const addCity = async (city) => {
//     const newCity = new City(city)
//     console.log('Added city', newCity)
//     return await newCity.save()
// };

// Uppdatera en stad
const updateCity = async (id, cityData) => {
    try {
        const updatedCity = await City.findOneAndUpdate(
            { city_id: id },
            { $set: cityData },
            { new: true, runValidators: true }
        );
        if (!updatedCity) {
            throw new Error(`City with ID ${id} not found`);
        }
        return updatedCity;
    } catch (error) {
        console.error(`Error updating city with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Ta bort en stad
const deleteCity = async (id) => {
    try {
        const deletedCity = await City.findOneAndDelete({ city_id: id });
        if (!deletedCity) {
            throw new Error(`City with ID ${id} not found`);
        }
        return deletedCity;
    } catch (error) {
        console.error(`Error deleting city with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};


module.exports = {
    getAllCities,
    getCityById,
    getCityByQuery,
    getCityByName,
    // addCity,
    updateCity,
    deleteCity,
};
