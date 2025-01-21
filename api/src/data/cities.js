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

const updateCity = async (id, cityData) => {
  try {
      const cityUpdate = await City.findOneAndUpdate(
          { city_id: id }, // Anger vilket dokument som ska uppdateras
          { $set: cityData }, // Anger vad som ska uppdateras
          { new: true, runValidators: true } // Returnera det uppdaterade dokumentet och kör validering
      );
      if (!cityUpdate) throw new Error('City not found');
      return cityUpdate;
  } catch (error) {
      console.error(`Error updating city with ID ${id}:`, error.message);
      throw new Error(error.message);
  }
};

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
    deleteCity,
    updateCity
};
